#include <SoftwareSerial.h>

#include "DFRobot_mmWave_Radar.h"

//SoftwareSerial mySerial(3, 2);
DFRobot_mmWave_Radar sensor(&Serial1);

int ledPin = 13;

void setup()
{
  Serial.begin(115200);
  Serial1.begin(115200);
  Serial.println("hello");
  pinMode(ledPin, OUTPUT);
  
  sensor.factoryReset();    //Restore to the factory settings 
  sensor.DetRangeCfg(0, 0.5);    //The detection range is as far as 9m
  sensor.OutputLatency(1, 1);
}

void loop()
{
  int val = sensor.readPresenceDetection();
  digitalWrite(ledPin, val);
  Serial.println(val);
  delay(100);
}
