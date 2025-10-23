#include <string.h>
#include <SPI.h>
#include <WiFiNINA.h>

char ssid[] = "###";
char pass[] = "###";

int    HTTP_PORT   = 3000;
String HTTP_METHOD = "POST";
char   HOST_NAME[] = "192.168.0.127";
String PATH_NAME   = "/";

int status = WL_IDLE_STATUS;

WiFiClient client;

void sendPOSTRequest() {
  client.println(HTTP_METHOD + " " + PATH_NAME + " HTTP/1.1");
  client.println("Host: " + String(HOST_NAME));
  client.println("Connection: close");
  client.println();
}

void setup() {
  Serial.begin(9600);
   
  while (status != WL_CONNECTED) {
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(ssid);
    status = WiFi.begin(ssid, pass);     
    // wait 10 seconds for connection:
    delay(5000);
  }
  Serial.println("Connected.");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());

 // connect to web server on port 80:
  if (client.connect(HOST_NAME, HTTP_PORT)) {
    // if connected:
    Serial.println("Connected to server");
    // make a HTTP request:
    sendPOSTRequest(); 

    while (client.connected()) {
      if (client.available()) {
        // read an incoming byte from the server and print it to serial monitor:
        char c = client.read();
        Serial.print(c);
      }
    }

    // the server's disconnected, stop the client:
    client.stop();
    Serial.println();
    Serial.println("disconnected");
  } else {  // if not connected:
    Serial.println("connection failed");
  }
}

void loop() {
  // Have a timer for when a post req is sent.
  // Search for chair distance and direction always w ultrasonic sensor & servo.
  // Save last distance and direction in a variable.
  //
  // Rotate servo & track angle
  // Calculate distance with ultrasonic sensor.
  //
  // if ((current_sec - previous_sec) > POST_INTERVAL) {
  //  if (client.connect(HOST_NAME, HTTP_PORT)) {
  //    previous_sec = current_sec;
  //    sendPOSTRequest();
  //  }
  //  client.stop();
  // }
} 
