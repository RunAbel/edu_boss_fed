<template>
  <div class="home">
    <el-card class="box-card">
      <el-collapse accordion>
        <el-collapse-item>
          <template slot="title">
            项目背景<i class="header-icon el-icon-info"></i>
          </template>
          <div>
            ₰ 基于 拉钩教育后台管理系统 模拟实现的后台管理系统
          </div>
        </el-collapse-item>
        <el-collapse-item title="功能点">
          <el-collapse accordion>
            <el-collapse-item title="核心功能"></el-collapse-item>
            <el-collapse-item title="辅助功能"></el-collapse-item>
            <el-collapse-item title="性能&安全"></el-collapse-item>
            <el-collapse-item title="进步优化"></el-collapse-item>
          </el-collapse>
        </el-collapse-item>
        <el-collapse-item title="架构图">
          <el-collapse accordion>
            <el-collapse-item title="模块层次图"></el-collapse-item>
            <el-collapse-item title="核心流程图"></el-collapse-item>
            <el-collapse-item title="技术点"></el-collapse-item>
            <el-collapse-item title="遗留的问题"></el-collapse-item>
            <el-collapse-item title="改进方向"></el-collapse-item>
            <el-collapse-item title="监控&告警"></el-collapse-item>
            <el-collapse-item title="高可用"></el-collapse-item
          ></el-collapse>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'HomeIndex'
})
</script>

<style lang="scss" scoped>
.el-collapse {
  padding: 40px 50px 0 50px;
}
</style>
