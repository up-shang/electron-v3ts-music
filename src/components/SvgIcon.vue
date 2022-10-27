<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconClassName" :fill="color" />
  </svg>
</template>
<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps({
  iconName: {
    type: String,
    required: true
  },
  className: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: '#ddd'
  },
  fontSize: {
    type: Number,
    default: 16
  }
});
const iconClassName = computed(() => {
  return `#icon-${props.iconName}`;
})
const svgClass = computed(() => {
  if (props.className) {
    return `svg-icon icon-${props.className}`;
  }
  return 'svg-icon';
});
</script>
<script lang="ts">
export default {
  name: 'SvgIcon'
}
</script>
<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  font-size: v-bind(fontSize+'px');
}
</style>