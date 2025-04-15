#ifndef control_h
#define control_h
#include "../include/consts.h"
#include "Arduino.h"

class Control {
    public:
        Control();

        void setup();
        void calculate_pid_ang(int cmd_data[4], float ang_data[3]);
        void calculate_pid_angvel(float angvel_data[3]);
        void get_control_val(float ctl_data[3]);
        void remove_bias(bool is_armed);

    private:
        void calculate_pid(float ref_data[3], float cur_data[3], float err_data_i[3], float pre_data[3], float pre_filtered_dterm_data[3], float out_data[3], float Kp[3], float Ki[3], float Kd[3]);
        void limit_val(float &val, float min, float max);
        void low_pass_filter(float cutoff_freq,float pre_filtered_data[3],  float cur_data[3], float filtered_data[3]);

        //姿勢角のPIDゲイン  roll, pitch, yaw
        float Kp_ang[3] = { 1.5f,  1.5f,  1.0f};
        float Ki_ang[3] = { 0.0f,  0.0f,  0.0f};
        float Kd_ang[3] = { 0.0f,  0.0f,  0.0f};

        //角速度のPIDゲイン
        float Kp_angvel[3] = { 0.5f,  0.5f,  0.5f};
        float Ki_angvel[3] = { 0.0f,  0.0f,  0.0f};
        float Kd_angvel[3] = { 0.0f,  0.0f,  0.0f};

        //I項計算用のエラーデータ
        float err_ang_i[3]    = {0.0f, 0.0f, 0.0f};
        float err_angvel_i[3] = {0.0f, 0.0f, 0.0f};

        //D項計算用の前回値
        float pre_ang[3]    = {0.0f, 0.0f, 0.0f};
        float pre_angvel[3] = {0.0f, 0.0f, 0.0f};

        //ローパスフィルタ用D項の前回値
        float pre_filtered_ang_d[3]    = {0.0f, 0.0f, 0.0f};
        float pre_filtered_angvel_d[3] = {0.0f, 0.0f, 0.0f};
        
        float pre_filtered_control_data[3] = {0.0f, 0.0f, 0.0f};

        //計算結果
        //姿勢角データ（内部から参照）
        float ang_ref[3] = {0.0f, 0.0f, 0.0f};
        //角速度データ（control → main → motor）
        float angvel_ctl[3] = {0.0f, 0.0f, 0.0f};

        float bias_sum[3] = {0.0f, 0.0f, 0.0f};
        float bias_average[3] = {0.0f, 0.0f, 0.0f};
        int cnt = 0;
};

#endif  // #ifndef control_h