const int fsrPin = A1;

const int seatThreshold = 650;

void initSeatSensor(){
    pinMode(fsrPin, INPUT);
}

bool isSeatOccupied(){
    int seatValue = analogRead(fsrPin);

    return(seatValue > seatThreshold);
}