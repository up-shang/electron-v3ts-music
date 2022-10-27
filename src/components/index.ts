import { App } from 'vue'
import SvgIcon from './SvgIcon.vue'

const component = [
  SvgIcon
]
export default {
  install(app: App) {
    component.forEach(item => {
      app.component(item.name, item)
    })
  }
}