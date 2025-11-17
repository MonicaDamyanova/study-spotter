#include "seat_detection.h"

#include <string.h>
#include <SPI.h>
#include <WiFiNINA.h>

int previousTime;
int currentTime;

const int POST_INTERVAL = 1000;

char ssid[] = "MonicasiPhone";
char pass[] = "noahiscool";

int    HTTP_PORT   = 3000;
String HTTP_METHOD = "POST";
char   HOST_NAME[] = "172.20.10.14";
String PATH_NAME   = "/server";

int status = WL_IDLE_STATUS;

WiFiClient client;

void sendPOSTRequest(bool seatOccupied) {
  String data = "{\"seatOccupied\":" + String(seatOccupied) + "}";

  client.print(String("POST ") + PATH_NAME + " HTTP/1.1\r\n");
  client.print(String("Host: ") + HOST_NAME + "\r\n");
  client.print("Content-Type: application/json\r\n");
  client.print("Content-Length: " + String(data.length()) + "\r\n");
  client.print("Connection: close\r\n");
  client.print("\r\n");
  client.print(data);
  client.print("\r\n");
}

void setup() {
  Serial.begin(115200);
  initSeatSensor();
  
  while (status != WL_CONNECTED) {
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(ssid);
    status = WiFi.begin(ssid, pass);     
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
    sendPOSTRequest(0); 

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
  
  previousTime = millis();
}

void loop() {
  Serial.println(isSeatOccupied());
  
  bool seatOccupied = isSeatOccupied();

  if(seatOccupied){
      Serial.println("Seat Taken");
  } else {
      Serial.println("Seat Open");
  }

  delay(480);

  currentTime = millis();

  if ((currentTime - previousTime) > POST_INTERVAL) {
    if (client.connect(HOST_NAME, HTTP_PORT)) {
      previousTime= currentTime;
      sendPOSTRequest(seatOccupied);
    }
    client.stop();
  }
	delay(20);
}
