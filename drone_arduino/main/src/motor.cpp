#include "../include/motor.h"

Motor::Motor() {}

void Motor::setup(){
    pinMode(MOTOR_PWM1,OUTPUT);
    pinMode(MOTOR_PWM2,OUTPUT);
    pinMode(MOTOR_PWM3,OUTPUT);
    pinMode(MOTOR_PWM4,OUTPUT);

    ledcSetup(0, 12800, 8);
    ledcAttachPin(MOTOR_PWM1, 0);
    ledcSetup(1, 12800, 8);
    ledcAttachPin(MOTOR_PWM2, 1);
    ledcSetup(2, 12800, 8);
    ledcAttachPin(MOTOR_PWM3, 2);
    ledcSetup(3, 12800, 8);
    ledcAttachPin(MOTOR_PWM4, 3);
    for (int i = 0; i < 4; i++) {
        ledcWrite(i, 0);
    }
}

void Motor::limit_command(int &cmd, int min, int max){
    if (cmd > max) {
        cmd = max;
    }
    if (cmd < min) {
        cmd = min;
    }
}

void Motor::calculate_motor_control(float ctl_data[3], int motor_data[4])  {
    //モーター出力のトリム調整
    double offset_motor[4] = {0.0f, 0.0f, 0.0f, 0.0f};

    motor_data[0] = + ctl_data[0] - ctl_data[1] - ctl_data[2] + offset_motor[0];
    motor_data[1] = + ctl_data[0] + ctl_data[1] + ctl_data[2] + offset_motor[1];
    motor_data[2] = - ctl_data[0] + ctl_data[1] - ctl_data[2] + offset_motor[2];
    motor_data[3] = - ctl_data[0] - ctl_data[1] + ctl_data[2] + offset_motor[3];
}

int Motor::calculate_thrust(double thrust_scale, int cmd_data[4]){
    //スラストカーブのしきい値
    double th = 40;
    if (cmd_data[0] < th) {
        cmd_data[0] *= 3;
    } else {
        cmd_data[0] = ((LIMIT_MOTOR - 3*th) / (LIMIT_MOTOR - th)) * (cmd_data[0] - th) + 3*th;
    }
    int cmd_thrust = cmd_data[0] * thrust_scale;
    limit_command(cmd_thrust, 0, LIMIT_MOTOR * thrust_scale);
}

void Motor::control(int cmd_data[4], float ctl_data[3], Arm &arm){
    if (arm.get_arm_status() == false){
        stop_motor();
        return;
    }

    //モーター出力用の制御値(0-255)
    int motor_data[4] = {0, 0, 0, 0};
    //送信機データから計算した推力の各モータ制御値
    int cmd_thrust = 0;
    //推力の制御値割合
    double thrust_scale = 0.65;
    
    //推力制御値計算
    cmd_thrust = calculate_thrust(thrust_scale, cmd_data);
    //コントロール制御値計算
    calculate_motor_control(ctl_data, motor_data);

    //制御値をmax:255に丸め込み
    for (int i = 0; i < 4; i++){
        //コントロール成分
        double ctl_limit = LIMIT_MOTOR * (1.0f - thrust_scale);
        limit_command(motor_data[i], 0, ctl_limit);
        //推力成分を加算
        motor_data[i] += cmd_thrust;
        limit_command(motor_data[i], 0, LIMIT_MOTOR);
    }

    for (int i=0; i<4; i++){
        ledcWrite(i, motor_data[i]);
    }

}

void Motor::stop_motor(){
    for (int i=0; i<4; i++) {
        ledcWrite(i, 0);
    }
}
