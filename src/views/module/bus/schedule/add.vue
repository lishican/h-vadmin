<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{$route.meta.title}}</span>
      </div>
      <el-form :model="form" :rules="rules" ref="form" label-width="140px" label-position="right">
        <el-row>
          <el-col :span="18">
               <el-form-item label="出发地" prop="start_site">
              <el-input v-model="form.start_site" placeholder="请输入出发地"></el-input>
            </el-form-item>
            <el-form-item label="终点" prop="end_site">
              <el-input v-model="form.end_site" placeholder="请输入终点"></el-input>
            </el-form-item>
            <el-form-item label="上车点" prop="up_site">
              <el-input v-model="form.up_site" placeholder="请输入上车点"></el-input>
            </el-form-item>
            <el-form-item label="下车点" prop="down_site">
              <el-input v-model="form.down_site" placeholder="请输入下车点"></el-input>
            </el-form-item>
         
            <el-form-item label="结束日期">
              <el-date-picker v-model="formhelp.time" type="datetimerange" align="right" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['12:00:00', '14:00:00']">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="票价" >
              <el-input v-model="form.price" placeholder="请输入价格"></el-input>
            </el-form-item>
            <el-form-item label="司机名称" >
              <el-input v-model="form.driver" placeholder="请输入司机名称"></el-input>
            </el-form-item>
            <el-form-item label="检票员电话" >
              <el-input v-model="form.contact" placeholder="请输入检票员电话"></el-input>
            </el-form-item>
            <el-form-item label="备注" >
              <el-input v-model="form.remark" placeholder="请输入备注"></el-input>
            </el-form-item>
            <el-form-item label="票数" prop="ticket">
              <el-input v-model="form.ticket" placeholder="请输入票数"></el-input>
            </el-form-item>
                 <el-form-item label="类型" prop="category">
              <el-radio-group v-model="form.pay_type">
                <el-radio :label="item.value" v-for="(item,index) in formhelp.pay_type" :key='index'>{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="车牌号" prop="car_num">
              <el-input v-model="form.car_num" placeholder="请输入车牌号"></el-input>
            </el-form-item>
            <el-form-item label="是否双程">
              <el-switch v-model="form.is_both"></el-switch>
            </el-form-item>
            
            <el-form-item label="是否开始检票">
              <el-switch v-model="form.is_start_check"></el-switch>
            </el-form-item>
            
            <el-form-item label="返程编号">
              <el-input v-model="form.back_shcedule_name" placeholder="请输入返程编号"></el-input>
            </el-form-item>
        
           
            <el-form-item>
              <el-button type="primary" @click="onSubmit('form')">新增</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
var E = require("wangeditor");
import { uploadurl } from "../../config";
export default {
  data() {
    return {
      uploadurl: uploadurl,
      descjoin: "",
      isCanSubmit: true,
      formhelp: {
        time:[],
        pay_type: [
          {
            value: 1,
            label: "微信支付"
          },
          {
            value: 2,
            label: "现金支付"
          },
          {
            value: 3,
            label: "现金支付+支付"
          }
        ]
      },
      form: {
        up_site: "",
        down_site: "",
        start_site: "",
        end_site: "",
        start_time: "",
        end_time: "",
        price: "",
        midway: "",
        car_num: "",
        contact: "",
        driver: "",
        remark: "",
        is_both: false,
        back_shcedule_name: "",
        pay_type: 1,
        is_start_check: 1,
        remark: '',
        is_end: false,
        ticket: 60
      },
      rules: {
       
      }
    };
  },
  created() {},
  methods: {

    //首页登记显示图片上传==========================》
    onSubmit(formName) {
      if (!this.isCanSubmit) {
        return false;
      }
      this.isCanSubmit = false;
      console.log(this.form);

      this.form.end_time = this.formhelp.time[1]
      this.form.start_time = this.formhelp.time[0]


      // return false;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("addSchedule", this.form)
            .then(data => {
              if (data.code == 200) {
                this.$notify({
                  title: "成功",
                  message: "修改成功",
                  type: "success"
                });
                this.$router.back(1);
              } else {
                this.$notify({
                  title: "失败",
                  message: "参数错误",
                  type: "warning"
                });
                this.isCanSubmit = true;
              }
              console.log(data);
            })
            .catch(err => {
              this.$notify({
                title: "失败",
                message: "参数错误",
                type: "warning"
              });
              this.isCanSubmit = true;
            });
          console.log(this.form);
        } else {
          console.log("error submit!!");
          this.$message.error("参数错误");
          this.isCanSubmit = true;
          return false;
        }
      });
    },
    initEditor() {
      this.editor = new E(this.$refs["editor"]);
      this.editor.customConfig.uploadImgServer = this.uploadurl;
      this.editor.customConfig.onchangeTimeout = 50;
      this.editor.customConfig.onchange = html => {
        this.form.contents = html;
      };
      this.editor.create();
    }
  },
  mounted() {
  }
};
</script>
