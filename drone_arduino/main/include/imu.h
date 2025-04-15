#ifndef imu_h
#define imu_h
#include "Arduino.h"
#include "Wire.h"
#include "MadgwickAHRS.h"
#include "Adafruit_BNO055.h"
#include "consts.h"

class Imu {
    public:
        Imu();

        void setup();
        void get_ang_data(float data[3]);
        void get_angvel_data(float data[3]);

        void print_all_data();
        void print_accel_data();
        void print_gyro_data();
        void print_mag_data();
        void print_ang_data();

    private:
        float xAccl = 0.00;
        float yAccl = 0.00;
        float zAccl = 0.00;
        float xGyro = 0.00;
        float yGyro = 0.00;
        float zGyro = 0.00;
        float xMag  = 0.00;
        float yMag  = 0.00;
        float zMag  = 0.00;
        float roll  = 0.00;
        float pitch = 0.00;
        float yaw   = 0.00;

        float xAcclBiasSum = 0.00;
        float yAcclBiasSum = 0.00;
        float zAcclBiasSum = 0.00;
        float xGyroBiasSum = 0.00;
        float yGyroBiasSum = 0.00;
        float zGyroBiasSum = 0.00;
        float yawBiasSum   = 0.00;

        float xAcclBiasAve = 0.00;
        float yAcclBiasAve = 0.00;
        float zAcclBiasAve = 0.00;
        float xGyroBiasAve = 0.00;
        float yGyroBiasAve = 0.00;
        float zGyroBiasAve = 0.00;
        float yawBiasAve   = 0.00;

        int cnt = 0;

        sensors_event_t accel_data;
        sensors_event_t gyro_data; 
        sensors_event_t mag_data;

        Madgwick madgwick;
        Adafruit_BNO055 bno055 = Adafruit_BNO055(55, 0x28, &Wire);
        float sample_frequency;

        void calculate_accel();
        void calculate_gyro();
        void calculate_mag();
        void calculate_ang();


};



#endif  // #ifndef imu_h