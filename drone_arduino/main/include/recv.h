#ifndef recv_h
#define recv_h
#include "consts.h"
#include "Arduino.h"
#include "BluetoothSerial.h"
#include "arm.h"
#include "motor.h"

class Receiver {
    public:
        Receiver();
        
        void setup();
        void update_data();
        void get_command(int data[4]);
        void set_arm_status(Arm &arm);
        void check_emergency(Arm &arm, Motor &motor);

        

    private:
        bool is_left_button_pressed();
        bool is_right_button_pressed();

        int disconnect_count = 0;
        bool first_byte_check = true;
        bool checksum_match = true;
        uint8_t recv_data[RECEIVE_DATA_SIZE];
        uint8_t pre_left_sw_data  = 0x00;
        uint8_t pre_right_sw_data = 0x00;

        void notify_bluetooth_setup_finished();
        uint8_t calculate_checksum();

};


#endif     // #ifndef Receiver_h