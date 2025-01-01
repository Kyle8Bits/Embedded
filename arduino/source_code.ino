#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

// Replace with your network credentials
const char *ssid = "<your wifi name>"; // Open Wi-Fi network (no password)
const char *password = "<your wifi password>";

// Device-specific URLs
const String led1URL = "http://<your_ip_address>:3000/devices/L1/status";
const String led2URL = "http://<your_ip_address>:3000/devices/L2/status";
const String fanURL = "http://<your_ip_address>:3000/devices/F1/status";
const String serverUrl = "http://<your_ip_address>:3000/devices/"; // URL để cập nhật trạng thái cảm biến

// Define GPIO pins
#define LED1_PIN 12
#define LED2_PIN 14
#define FAN_PIN 27
#define GAS_SENSOR_PIN 25        // Chân D0 (Digital)
#define GAS_SENSOR_ANALOG_PIN 34 // Chân A0 (Analog)
#define GAS_RELAY_PIN 26         // Chân điều khiển relay

// State variables
String led1State = "OFF";
String led2State = "OFF";
String fanState = "ON";
bool gasDetected = false;

// Function to check gas sensor
void checkGasSensor()
{
    int gasValue = analogRead(GAS_SENSOR_ANALOG_PIN);        // Read the gas sensor value
    Serial.println("Gas sensor value: " + String(gasValue)); // Print value for debugging

    if (gasValue > 400)
    { // Check if the value exceeds the threshold
        Serial.println("Gas detected! Sending update to server...");
        gasDetected = true;
        digitalWrite(GAS_RELAY_PIN, HIGH); // Bật relay
        updateDeviceStatus("S1", "ON");    // Update server with detection status
    }
    else
    {
        Serial.println("No gas detected.");
        gasDetected = false;
        digitalWrite(GAS_RELAY_PIN, LOW); // Tắt relay
        updateDeviceStatus("S1", "OFF");  // Update server when clear
    }
}

// Function to check device status and control pins
void checkStatusAndControl(const String &url, int pin, String &previousState)
{
    if (WiFi.status() == WL_CONNECTED && !gasDetected)
    { // Server điều khiển khi không phát hiện khí gas
        HTTPClient http;
        http.begin(url);

        int httpResponseCode = http.GET();

        if (httpResponseCode > 0)
        {
            String response = http.getString();
            Serial.println("Response:");
            Serial.println(response);

            // Parse JSON response
            DynamicJsonDocument doc(256);
            DeserializationError error = deserializeJson(doc, response);

            if (error)
            {
                Serial.print("JSON parse error: ");
                Serial.println(error.c_str());
            }
            else
            {
                // Extract status
                String status = doc["status"] | "OFF";   // Default to OFF
                String statusFan = doc["status"] | "ON"; // Default to ON
                Serial.print("Status from server: ");
                Serial.println(status);

                // Control pin based on status
                if (pin == FAN_PIN)
                {
                    if (statusFan == "ON" && previousState != "ON")
                    {
                        digitalWrite(pin, LOW); // Turn ON (active LOW for fan)
                        previousState = "ON";
                        Serial.println("Fan turned ON");
                    }
                    else if (statusFan == "OFF" && previousState != "OFF")
                    {
                        digitalWrite(pin, HIGH); // Turn OFF
                        previousState = "OFF";
                        Serial.println("Fan turned OFF");
                    }
                }
                else
                {
                    // Standard logic for other devices
                    if (status == "ON" && previousState != "ON")
                    {
                        digitalWrite(pin, HIGH); // Turn ON (active HIGH)
                        previousState = "ON";
                        Serial.print("Pin ");
                        Serial.print(pin);
                        Serial.println(" turned ON");
                    }
                    else if (status == "OFF" && previousState != "OFF")
                    {
                        digitalWrite(pin, LOW); // Turn OFF
                        previousState = "OFF";
                        Serial.print("Pin ");
                        Serial.print(pin);
                        Serial.println(" turned OFF");
                    }
                }
            }
        }
        else
        {
            Serial.print("Error on HTTP GET: ");
            Serial.println(httpResponseCode);
        }
        http.end(); // Close connection
    }
    else if (gasDetected)
    {
        Serial.println("Gas detected, overriding server commands.");
    }
}

// Function to update device status
void updateDeviceStatus(String id, String status)
{
    if (WiFi.status() == WL_CONNECTED)
    {
        HTTPClient http;

        // Create the full URL with the device ID
        String url = serverUrl + id;

        http.begin(url);                                    // Start connection to server
        http.addHeader("Content-Type", "application/json"); // Set content type to JSON

        // Create JSON payload
        String jsonPayload = "{\"status\":\"" + status + "\"}";

        // Send PUT request
        int httpResponseCode = http.PUT(jsonPayload);

        if (httpResponseCode > 0)
        {
            Serial.println("Response code: " + String(httpResponseCode));
            Serial.println("Response: " + http.getString());
        }
        else
        {
            Serial.println("Error on sending PUT request: " + String(httpResponseCode));
        }

        http.end(); // Close connection
    }
    else
    {
        Serial.println("WiFi not connected");
    }
}

void setup()
{
    Serial.begin(115200);

    // Initialize pins
    pinMode(LED1_PIN, OUTPUT);
    pinMode(LED2_PIN, OUTPUT);
    pinMode(FAN_PIN, OUTPUT);
    pinMode(GAS_RELAY_PIN, OUTPUT);
    pinMode(GAS_SENSOR_PIN, INPUT);

    // Khởi tạo trạng thái ban đầu cho relay
    digitalWrite(GAS_RELAY_PIN, LOW); // Tắt relay (active HIGH)

    // Connect to open Wi-Fi
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }
    Serial.println("\nWiFi connected.");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
}

void loop()
{
    // Kiểm tra cảm biến khí gas
    checkGasSensor();

    // Check status and control pins for each device nếu không có khí gas
    if (!gasDetected)
    {
        checkStatusAndControl(led1URL, LED1_PIN, led1State);
        checkStatusAndControl(led2URL, LED2_PIN, led2State);
        checkStatusAndControl(fanURL, FAN_PIN, fanState);
    }

    delay(3000); // Wait 5 seconds before checking again
}