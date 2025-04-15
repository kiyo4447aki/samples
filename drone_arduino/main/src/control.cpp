#include "../include/control.h"

Control::Control() {}

void Control::calculate_pid(float ref_data[3], float cur_data[3], float err_data_i[3], float pre_data[3], float pre_filtered_d[3], float out_data[3], float Kp[3], float Ki[3], float Kd[3]){
    //エラーデータ(差分、p項)
    float err_data_p[3];
    float data_d[3];

    for (int i=0; i<3; i++){
        err_data_p[i] = ref_data[i] - cur_data[i];
        err_data_i[i] += err_data_p[i];
        data_d[i] = (cur_data[i] - pre_data[i]) / ((float)SAMPLING_TIME_MS/1000.0f);
        limit_val(err_data_i[i], -1.0f*180, 1.0f*180);
        pre_data[i] = cur_data[i];
    }

    float filtered_data_d[3] = {0.0f, 0.0f, 0.0f};
    float cutoff_freq = 1.0f;
    low_pass_filter(cutoff_freq, pre_filtered_d, data_d, filtered_data_d);

    for (int i=0; i<3; i++){
        out_data[i] = Kp[i]*err_data_p[i] + Ki[i]*err_data_i[i] + Kd[i]*filtered_data_d[i];
    }

}

void Control::calculate_pid_ang(int cmd_data[4], float ang_data[3]){
    //送信機からの指令値格納(roll, pitch, yaw)
    float ref_data[3];
    float out_data[3] = {0.0f, 0.0f, 0.0f};
    ref_data[0] = (float) (cmd_data[3] - 127.0f) / 2.0f;
    ref_data[1] = (float) (cmd_data[2] - 127.0f) / 2.0f;

    /*
    //thrustが高いときヨー軸回転を無効化
    double yaw_input_threshold = 200;
    if (cmd_data[0] > yaw_input_threshold) ref_data[2] = 0;
    else ref_data[2] = (float) (cmd_data[1] - 127.0f) / 2.0f;
    */

    calculate_pid(ref_data, ang_data, err_ang_i, pre_ang, pre_filtered_ang_d, out_data, Kp_ang, Ki_ang, Kd_ang);
    
    for (int i=0; i<3; i++){
        limit_val(out_data[i], -1.0f*30, 1.0f*30);
        ang_ref[i] = out_data[i];
    }
}

void Control::calculate_pid_angvel(float angvel_data[3]){
    float out_data[3] = {0.0f, 0.0f, 0.0f};

    calculate_pid(ang_ref, angvel_data, err_angvel_i, pre_angvel, pre_filtered_angvel_d, out_data, Kp_angvel, Ki_angvel, Kd_angvel);

    float filtered_out_data[3] = {0.0f, 0.0f, 0.0f};
    double cutoff_freq = 10;
    low_pass_filter(cutoff_freq, pre_filtered_control_data, out_data, filtered_out_data);

    for (int i=0; i<3; i++){
        limit_val(out_data[i], -1.0f*50, 1.0f*50);
        angvel_ctl[i] = out_data[i];
    }
}

void Control::get_control_val(float ctl_data[3]){
    ctl_data[0] = angvel_ctl[0];
    ctl_data[1] = angvel_ctl[1];
    ctl_data[2] = angvel_ctl[2];
}


void Control::limit_val(float &val, float min, float max){
    if (val > max) { val = max; }
    if (val < min) { val = min; }
}

void Control::low_pass_filter(float cutoff_freq,float pre_filtered_data[3],  float cur_data[3], float filtered_data[3]){
    //float Tsamp = SAMPLING_TIME_MS / 1000.0f;
    //float tau   = 1.0f / (2.0f * M_PI * cutoff_freq);

    //前回データの割合
    //暫定値を使用
    float kpre = 0.4;

    for (int i=0; i<3; i++){
        filtered_data[i] = kpre*pre_filtered_data[i] + (1.0f - kpre)*cur_data[i];
        pre_filtered_data[i] = filtered_data[i];
    }
}

void Control::remove_bias(bool is_armed) {
    if (cnt > CTL_CNT_START_NUM && cnt <= CTL_CNT_START_NUM + CTL_CNT_TOTAL_NUM) {
        for (int i=0; i<3; i++) {
            bias_sum[i] += angvel_ctl[i];
        }
    } else if (cnt > CTL_CNT_START_NUM + CTL_CNT_TOTAL_NUM) {
        for (int i=0; i<3; i++) {
            bias_average[i] = bias_sum[i] / CTL_CNT_TOTAL_NUM;
            angvel_ctl[i] -= bias_average[i];
        }
    }
    if (is_armed) cnt++;
}