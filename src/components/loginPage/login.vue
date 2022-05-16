<template>
  <div class="login">
    <el-form ref="ruleFormRef" :model="formData" status-icon :rules="rules" label-width="120px" label-position="top">
      <el-form-item label="手机号码">
        <el-input v-model="formData.phone" :prefix-icon="Cellphone" placeholder="Please input phone" size="large" class="input-select"> </el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formData.password" :prefix-icon="Lock" type="password" size="large" placeholder="Please input password"> </el-input>
      </el-form-item>
    </el-form>
    <div class="button">
      <el-button color="red" auto-insert-space @click="submitLogin">登录</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { Cellphone, Lock } from "@element-plus/icons-vue";
import { userService } from "@/API/user";

const ruleFormRef = ref();
const formData = reactive({ phone: "", password: "" });
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
const submitLogin = () => {
  userService.postLogin(formData).then((res) => {
    console.log(res);
  });
};
</script>

<style lang="less" scoped>
.input-select {
  background-color: white;
}
</style>
