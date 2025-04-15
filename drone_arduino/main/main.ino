#include <MadgwickAHRS.h>
#include "./include/imu.h"
#include "./include/motor.h"
#include "./include/emergency.h"
#include "./include/pid.h"
#include "./include/recv.h"
#include "./include/control.h"
#include <time.h>

Imu imu_bno055;
PID pid;
Motor motor;
Arm arm;
Emergency emergency;
Control control;
Receiver receiver;

void setup() {
    Serial.begin(115200);

    imu_bno055.setup();
    receiver.setup();
    motor.setup();
    emergency.setup();

    delay(300);
}

void loop(){
	int cmd_data[4];
	float ang_data[3];
  float angvel_data[3];
	float ctl_data[3];

	emergency.check_emergency(arm, motor);

	receiver.update_data();
	receiver.get_command(cmd_data);
	receiver.set_arm_status(arm);
	receiver.check_emergency(arm, motor);

	imu_bno055.get_ang_data(ang_data);
  imu_bno055.get_angvel_data(angvel_data);

  control.calculate_pid_ang(cmd_data, ang_data);
  control.calculate_pid_angvel(angvel_data);
  //control.remove_bias(arm.get_arm_status());
  control.get_control_val(ctl_data);

	motor.control(cmd_data, ctl_data, arm);
  /*
  unsigned long time = millis();
  Serial.print("time: ");
  Serial.println(time);
  */
  imu_bno055.print_ang_data();
  delay(10);
}