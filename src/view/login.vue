<template>
  <div class="login-wrapper">
    <div>
      <img style="width: 64px;height: 64px;" src="../assets/netease-music.png" />
    </div>
    <h2>登录网易云音乐账号</h2>
    <el-image :src="qrImg"></el-image>
    <h3>打开网易云音乐APP扫码登录</h3>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { loginCheck, loginQrKey, loginQr, loginStatus } from '../api/user'
import { useUserStore } from '../store'
import emiter from '../utils/bus'

const userStore = useUserStore()
// const props = withDefaults(defineProps<Prop>(), { visible: false })

let qrImg = ref<string>('')
let qrInfo = ref<string>('')
let timer: any
/**
 * 扫码检测登录状态
 */
async function checkStatus(key: any) {
  const params = {
    key,
    timestamp: Date.now() // 防止缓存扫码登录状态
  }
  const res = await loginCheck(params)
  return res
}
/**
 * 登录失效后的错误信息
 * @param cookie 
 */
async function getLoginStatus(cookie = '') {
  const res = await loginStatus({ cookie })
}
/**
 * 扫码登录
 */
async function login() {
  const cookie = localStorage.getItem('cookie')
  const resKey = await loginQrKey({ timestamp: Date.now() })
  const key = resKey.data.unikey
  const resQr = await loginQr({
    key,
    qrimg: true,
    timestamp: Date.now()
  })
  qrImg.value = resQr.data.qrimg
  // 轮训判断扫码登录状态，失效or成功
  timer = setInterval(async () => {
    const statusRes = await checkStatus(key)
    if (statusRes.code === 800) {
      alert('二维码已过期,请重新获取')
      clearInterval(timer)
    }
    if (statusRes.code === 803) {
      // 这一步会返回cookie
      clearInterval(timer)
      alert('授权登录成功')
      // todo，授权成功后关闭弹层
      localStorage.setItem('cookie', statusRes.cookie)
      await userStore.getUserAccountInfo({ cookie: statusRes.cookie })
      emiter.emit('closeLogin', false)
    }
  }, 3000)
}
function clearTimer() {
  clearInterval(timer)
}
defineExpose({ login, clearTimer })
</script>

<style lang="scss" scoped>
.login-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
