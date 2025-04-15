#include "../include/imu.h"

Imu::Imu(){}

void Imu::setup(){
    sample_frequency = (float)1/ ((float) SAMPLING_TIME_MS/1000);
    madgwick.begin(sample_frequency);

    if (!bno055.begin()){
    Serial.print("Ooops, no BNO055 detected ... Check your wiring or I2C ADDR!");
    while (1);
    }
}

void Imu::get_ang_data(float data[3]){
    calculate_ang();
    data[0] = roll;
    data[1] = pitch;
    data[2] = yaw;
}

void Imu::get_angvel_data(float data[3]){
    calculate_gyro();
    data[0] = xGyro;
    data[1] = yGyro;
    data[2] = zGyro;
}

void Imu::calculate_accel(){
    bno055.getEvent(&accel_data, Adafruit_BNO055::VECTOR_ACCELEROMETER);
    xAccl = accel_data.acceleration.x;
    yAccl = accel_data.acceleration.y;
    zAccl = accel_data.acceleration.z;
    /*
    if (cnt > IMU_CNT_START_NUM && cnt <= IMU_CNT_START_NUM + IMU_CNT_TOTAL_NUM) {
        xAcclBiasSum += xAccl;
        yAcclBiasSum += yAccl;
        zAcclBiasSum += zAccl;
    } else if (cnt > IMU_CNT_START_NUM + IMU_CNT_TOTAL_NUM) {
        xAcclBiasAve = xAcclBiasSum / IMU_CNT_TOTAL_NUM;
        yAcclBiasAve = yAcclBiasSum / IMU_CNT_TOTAL_NUM;
        zAcclBiasAve = zAcclBiasSum / IMU_CNT_TOTAL_NUM;

        xAccl -= xAcclBiasAve;  
        yAccl -= yAcclBiasAve;  
        zAccl -= zAcclBiasAve - 9.8;  
    }
    */
}

void Imu::calculate_gyro(){
    bno055.getEvent(&gyro_data, Adafruit_BNO055::VECTOR_GYROSCOPE);
    xGyro = gyro_data.gyro.x;
    yGyro = gyro_data.gyro.y;
    zGyro = gyro_data.gyro.z;

    /*
    if (cnt > IMU_CNT_START_NUM && cnt <= IMU_CNT_START_NUM + IMU_CNT_TOTAL_NUM) {
        xGyroBiasSum += xGyro;
        yGyroBiasSum += yGyro;
        zGyroBiasSum += zGyro;
    } else if (cnt > IMU_CNT_START_NUM + IMU_CNT_TOTAL_NUM) {
        xGyroBiasAve = xGyroBiasSum / IMU_CNT_TOTAL_NUM;
        yGyroBiasAve = yGyroBiasSum / IMU_CNT_TOTAL_NUM;
        zGyroBiasAve = zGyroBiasSum / IMU_CNT_TOTAL_NUM;

        xGyro -= xGyroBiasAve;  
        yGyro -= yGyroBiasAve;  
        zGyro -= zGyroBiasAve;  
    }
    */
}

void Imu::calculate_mag(){
    bno055.getEvent(&mag_data, Adafruit_BNO055::VECTOR_MAGNETOMETER);
    xMag = mag_data.magnetic.x;
    yMag = mag_data.magnetic.y;
    zMag = mag_data.magnetic.z;
}

void Imu::calculate_ang(){
    calculate_accel();
    calculate_gyro();
    calculate_mag();
    madgwick.update(xGyro,yGyro,zGyro,xAccl,yAccl,zAccl,xMag,yMag,zMag);

    roll = madgwick.getRoll();
    pitch = madgwick.getPitch();
    yaw = madgwick.getYaw() - 180.0f;
    cnt++;
}

void Imu::print_accel_data() {
    calculate_accel();
    Serial.print(xAccl);
    Serial.print(" ");
    Serial.print(yAccl);
    Serial.print(" ");
    Serial.println(zAccl);
}

void Imu::print_gyro_data() {
    calculate_gyro();
    Serial.print(xGyro);
    Serial.print(" ");
    Serial.print(yGyro);
    Serial.print(" ");
    Serial.println(zGyro);
}

void Imu::print_mag_data() {
    calculate_mag();
    Serial.print(xMag);
    Serial.print(" ");
    Serial.print(yMag);
    Serial.print(" ");
    Serial.println(zMag);
}

void Imu::print_ang_data() {
    calculate_ang();
    Serial.print("roll: ");
    Serial.print(roll);
    Serial.print(", pitch: ");
    Serial.print(pitch);
    Serial.print(", yaw: ");
    Serial.println(yaw);
}

void Imu::print_all_data(){
    print_accel_data();
    print_gyro_data();
    print_mag_data();
    print_ang_data();
}