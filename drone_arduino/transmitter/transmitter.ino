#include "Arduino.h"
#include "InputCmd.h"

InputCmd imput;

void setup() {
    Serial.begin(115200);
    pinMode(LEFT_SW_PIN, INPUT_PULLUP);
    pinMode(RIGHT_SW_PIN, INPUT_PULLUP);
 }

void loop() {
    imput.sense_value();
    Serial.println(analogRead (34) );
    delay(1000);
}