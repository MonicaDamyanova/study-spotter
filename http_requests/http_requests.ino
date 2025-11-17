#include <string.h>
#include <SPI.h>
#include <WiFiNINA.h>
#include <Servo.h>
#include <SoftwareSerial.h>
#include "DFRobot_mmWave_Radar.h"

char ssid[] = "MonicasiPhone";
char pass[] = "noahiscool";

int    HTTP_PORT   = 3000;
String HTTP_METHOD = "POST";
char   HOST_NAME[] = "172.20.10.14";
String PATH_NAME   = "/server";

int status = WL_IDLE_STATUS;

WiFiClient client;

Servo myservo;
DFRobot_mmWave_Radar sensor(&Serial1);

const int trigPin = 10;  
const int echoPin = 11;
const int servoPin = 9;
const int radarLEDPin = 13;
const int humanSensorLEDPin = 12;

const int POST_INTERVAL = 1000;

int angle = 0;
float duration, distance;
int step = 1;
int previousTime;
int currentTime;

void sendPOSTRequest(int presence, float distance, int angle) {
  String data = "{\"presence\":" + String(presence) +
    ",\"distance\":" + String(distance) +
    ",\"angle\":" + String(angle) + "}";

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
  //Serial.begin(9600);
  Serial.begin(115200);
  Serial1.begin(115200);
  Serial.println("hello");
  pinMode(radarLEDPin, OUTPUT);
  
  sensor.factoryReset();    //Restore to the factory settings 
  sensor.DetRangeCfg(0, 0.5);    //The detection range is as far as 9m
  sensor.OutputLatency(1, 1);

  myservo.attach(servoPin);
  pinMode(trigPin, OUTPUT);  
	pinMode(echoPin, INPUT);  
   
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
    sendPOSTRequest(0, 0.00, 0); 

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
  // Have a timer for when a post req is sent.
  // Search for chair distance and direction always w ultrasonic sensor & servo.
  // Save last distance and direction in a variable.
  //
  // Rotate servo & track angle
  // Calculate distance with ultrasonic sensor.
  //
  // use millis()
  //
  // if ((current_sec - previous_sec) > POST_INTERVAL) {
  //  if (client.connect(HOST_NAME, HTTP_PORT)) {
  //    previous_sec = current_sec;
  //    sendPOSTRequest();
  //  }
  //  client.stop();
  // }
  Serial.print("Angle: ");
  Serial.println(angle);
  myservo.write(angle);
  angle += step;
 
  if (angle >= 180 && step == 5) step = -5;
  if (angle <= 0 && step == -5) step = 5;

  digitalWrite(trigPin, LOW);  
	delayMicroseconds(2);  
	digitalWrite(trigPin, HIGH);  
	delayMicroseconds(10);  
	digitalWrite(trigPin, LOW);  

  duration = pulseIn(echoPin, HIGH);
  distance = (duration*.0343)/2;

  Serial.print("Distance: ");
  Serial.println(distance);

  int val = sensor.readPresenceDetection();
  digitalWrite(radarLEDPin, val);
  delay(80);
  
  Serial.print("Presence Detected: ");
  Serial.println(val);
  currentTime = millis();

  if ((currentTime - previousTime) > POST_INTERVAL) {
    if (client.connect(HOST_NAME, HTTP_PORT)) {
      previousTime= currentTime;
      sendPOSTRequest(val, distance, angle);
    }
    client.stop();
  }
	delay(20);
}
