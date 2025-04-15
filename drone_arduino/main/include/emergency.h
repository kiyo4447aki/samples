#ifndef Emergency_h
#define Emergency_h
#include "Arduino.h"
#include "consts.h"
#include "arm.h"
#include "motor.h"

class Emergency {
    public:
        Emergency();

        void setup();
        void check_emergency(Arm &arm, Motor &motor);

    private:
};

#endif  // #ifndef Emergency_h