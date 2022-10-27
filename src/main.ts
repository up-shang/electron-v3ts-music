import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import piniaStore from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import globalCom from './components'

/**
 * If you enables use of Node.js API in the Renderer-process
 * ```
 * npm i -D vite-plugin-electron-renderer
 * ```
 * @see - https://github.com/electron-vite/vite-plugin-electron/tree/main/packages/electron-renderer#electron-renderervite-serve
 */

createApp(App)
  .use(router)
  .use(piniaStore)
  .use(ElementPlus)
  .use(globalCom)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
