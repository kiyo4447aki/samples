#include "../include/consts.h"
#include "../include/emergency.h"
Emergency::Emergency() {};

void Emergency::setup() {
    pinMode(EMERGENCY_BUTTON, INPUT_PULLUP);
}

void Emergency::check_emergency(Arm &arm, Motor &motor) {
    if (digitalRead(EMERGENCY_BUTTON) == LOW) {
        arm.set_arm_status(false);
        motor.stop_motor();
    }
}