#include <Servo.h>

Servo myservo;  // create servo object to control a servo
// twelve servo objects can be created on most boards

int angle = 0;
const int trigPin = 10;  
const int echoPin = 11;
float duration, distance;
int step = 1;

void setup() {
  myservo.attach(9);
  pinMode(trigPin, OUTPUT);  
	pinMode(echoPin, INPUT);  
	Serial.begin(9600);
}

void loop() {
  myservo.write(angle);
  angle += step;

  if (angle >= 180 && step == 1) step = -1;
  if (angle <= 0 && step == -1) step = 1;

  digitalWrite(trigPin, LOW);  
	delayMicroseconds(2);  
	digitalWrite(trigPin, HIGH);  
	delayMicroseconds(10);  
	digitalWrite(trigPin, LOW);  

  duration = pulseIn(echoPin, HIGH);
  distance = (duration*.0343)/2;
  Serial.print("Distance: ");  
	Serial.println(distance);
  Serial.print("Angle: ");
  Serial.println(angle);
  Serial.println("==================");
	delay(20);
}
