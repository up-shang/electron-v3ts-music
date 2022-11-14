
<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
import { ref, withDefaults, onMounted, watch } from 'vue'
import BScroll from 'better-scroll'
import emiter from '../../utils/bus'

let wrapper = ref()
let scroll = ref()

const DIRECTION_H = ref<string>('horizontal')
const DIRECTION_V = ref<string>('vertical')
interface Props {
  probeType?: number,
  click?: boolean,
  listenScroll?: boolean,
  data: any,
  pullup?: boolean,
  beforeScroll?: boolean,
  refreshDelay?: number,
  direction?: string
}
const props = withDefaults(defineProps<Props>(), {
  probeType: 1,
  click: false,
  listenScroll: false,
  data: [],
  pullup: false,
  beforeScroll: false,
  refreshDelay: 20,
  direction: 'vertical'
})
onMounted(() => {
  setTimeout(() => {
    _initScroll()
  }, 20)
})

function _initScroll() {
  if (!wrapper.value) {
    return
  }
  scroll.value = new BScroll(wrapper.value, {
    probeType: props.probeType,
    click: props.click,
    eventPassthrough: props.direction === DIRECTION_V.value ? DIRECTION_H.value : DIRECTION_V.value
  })

  if (props.listenScroll) {
    scroll.value.on('scroll', (pos: any) => {
      emiter.emit('scroll', pos)
    })
  }
  if (props.pullup) {
    scroll.value.on('scrollEnd', () => {
      if (scroll.value.y <= (scroll.value.maxScrollY + 50)) {
        emiter.emit('scrollToEnd')
      }
    })
  }

  if (props.beforeScroll) {
    scroll.value.on('beforeScrollStart', () => {
      emiter.emit('beforeScroll')
    })
  }
}
function disable() {
  scroll.value && scroll.value.disable()
}
function enable() {
  scroll.value && scroll.value.enable()
}
function refresh() {
  scroll.value && scroll.value.refresh()
}
function scrollTo() {
  scroll.value && scroll.value.scrollTo.apply(scroll.value, arguments)
}
function scrollToElement() {
  scroll.value && scroll.value.scrollToElement.apply(scroll.value, arguments)
}

watch(props.data, () => {
  setTimeout(() => {
    refresh()
  }, props.refreshDelay)
})
defineExpose({ scrollToElement })
</script>