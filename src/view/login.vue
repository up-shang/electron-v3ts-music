<template>
  <div>
    <img style="width: 64px;height: 64px;" src="../assets/netease-music.png" />
  </div>
  <h2>登录网易云音乐账号</h2>
  <el-image :src="qrImg"></el-image>
  <h3>打开网易云音乐APP扫码登录</h3>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { loginCheck, loginQrKey, loginQr, loginStatus } from '../api/user'
import { useUserStore } from '../store'

const userStore = useUserStore()
// const props = withDefaults(defineProps<Prop>(), { visible: false })

let qrImg = ref<string>('')
let qrInfo = ref<string>('')
/**
 * 扫码检测登录状态
 */
async function checkStatus(key: any) {
  const params = {
    key
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
  let timer: any
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
      localStorage.setItem('cookie', statusRes.cookie)
      await userStore.getUserAccountInfo({ cookie: statusRes.cookie })
    }
  }, 3000)
}
defineExpose({ login })
</script>

<style lang="scss" scoped>

</style>
