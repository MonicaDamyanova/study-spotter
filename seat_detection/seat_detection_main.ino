#include "seat_detection.h"


void setup() {
    Serial.begin(9600);
    initSeatSensor();
    
}

void loop() {
    Serial.println(isSeatOccupied());
    
    if(isSeatOccupied()){
        Serial.println("Seat Taken");
    }else{
        Serial.println("Seat Open");
    }
    delay(500);
}