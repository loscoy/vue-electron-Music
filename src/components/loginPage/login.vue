<template>
  <div class="login">
    <el-form ref="ruleFormRef" :model="formData" status-icon :rules="rules" label-width="120px" label-position="top">
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="formData.phone" :prefix-icon="Cellphone" placeholder="Please input phone" size="large" class="input-select"> </el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formData.password" :prefix-icon="Lock" type="password" size="large" placeholder="Please input password"> </el-input>
      </el-form-item>
    </el-form>
    <div class="button">
      <el-button color="red" auto-insert-space @click="submitLogin" style="width: 100%; margin-top: 20px">登录</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { Cellphone, Lock } from "@element-plus/icons-vue";
import { userService } from "@/API/user";
import { useUserStore } from "@/store/modules/user";
import { storeToRefs } from "pinia";
import { ElMessage } from "element-plus";
import "element-plus/dist/index.css";

const ruleFormRef = ref();
const formData = reactive({ phone: "", password: "" });
const userStore = useUserStore();
const { status } = storeToRefs(userStore);

const validatePass = (rule: any, value: any, callback: any) => {
  // 密码包含 数字,英文,字符中的两种以上，长度6-20
  const reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,20}$/;
  if (value === "") {
    callback(new Error("请输入密码"));
  } else if (value.length < 8 || value.length > 18) {
    callback(new Error("密码长度为八到十八位"));
  } else if (!reg.test(value)) {
    callback(new Error("密码格式不正确"));
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
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("请输入正确的手机号"));
  }
};
const rules = reactive({
  password: [{ validator: validatePass, trigger: "blur" }],
  phone: [{ validator: validatePhone, trigger: "blur" }],
});
const submitLogin = () => {
  userService.postLogin(formData).then((res) => {
    status.value = true;
    ElMessage.success("登录成功");
    window.location.reload();
  });
};
</script>

<style lang="less" scoped>
.input-select {
  background-color: white;
}
</style>
