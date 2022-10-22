<template>
  <el-skeleton :loading="loading" :rows="5" animated>
    <template #template>
      <el-row style="margin: 0 0 20px;">
        <el-col :span="8">
          <el-skeleton-item variant="image" style="width: 215px; height: 215px" />
        </el-col>
        <el-col :span="16">
          <el-row style="margin: 0 0 20px;">
            <el-skeleton-item variant="p" style="width: 50%" />
          </el-row>
          <el-row style="margin: 0 0 20px;">
            <el-skeleton-item variant="p" style="width: 30%" />
          </el-row>
          <el-row style="margin: 0 0 20px;">
            <el-skeleton-item variant="p" style="width: 30%" />
          </el-row>
          <el-row style="margin: 0 0 20px;">
            <el-skeleton-item variant="p" style="width: 20%" />
          </el-row>
          <el-row>
            <el-skeleton-item variant="p" style="width: 100%" />
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-skeleton-item variant="p" style="height: 500px;" />
      </el-row>
    </template>
    <slot></slot>
  </el-skeleton>
</template>
<script lang="ts" setup>
import { withDefaults } from 'vue'

interface Props {
  loading: boolean
}
const props = withDefaults(defineProps<Props>(), { loading: false })
</script>
