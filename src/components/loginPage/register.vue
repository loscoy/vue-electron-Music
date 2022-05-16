<template>
  <div class="register">
    <el-form ref="FormRef" :model="formData" status-icon :rules="rules" label-width="120px" class="demo-ruleForm" label-position="top">
      <el-form-item label="手机号码">
        <el-input v-model="formData.phone" :prefix-icon="Cellphone" placeholder="Please input phone" size="large"></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="formData.nickname" :prefix-icon="User" placeholder="Please input password" size="large"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formData.password" :prefix-icon="Lock" type="password" placeholder="Please input password" size="large"></el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <el-input v-model="formData.captcha" :prefix-icon="Key" placeholder="Please input password" size="large"></el-input>
      </el-form-item>
    </el-form>
    <div class="button">
      <el-button color="red" auto-insert-space>注册</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { Cellphone, Key, Lock, User } from "@element-plus/icons-vue";

const ruleFormRef = ref();
const formData = reactive({ phone: "", password: "", nickname: "", captcha: "" });
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Please input the password"));
  } else {
    if (formData.password !== "") {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("password", () => null);
    }
    callback();
  }
};
const validatePhone = (rule: any, value: any, callback: any) => {
  const reg = /^1\d{10}$/;
  if (!reg.test(value)) {
    callback(new Error("Please input the correct phone"));
  } else {
    callback();
  }
};
const rules = reactive({
  password: [{ validator: validatePass, trigger: "blur" }],
  phone: [{ validator: validatePhone, trigger: "blur" }],
});
const submitForm = (formEl: any | undefined) => {
  if (!formEl) return;
  formEl.validate((valid: any) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
const resetForm = (formEl: any | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style lang="less" scoped>
.register {
  .button {
    width: 100%;
    :v-deep(.button) {
      width: 100%;
    }
  }
}
</style>
