<template>
  <div class="aside">
    <div id="icon">
      <a v-show="sidebar" href="https://www.abel.run/#/">
        <img src="@/assets/3.png" class="small mylogo" alt=""
      /></a>
      <a v-show="!sidebar" href="https://www.abel.run/#/">
        <img src="@/assets/1.png" class="big mylogo" alt=""
      /></a>
    </div>
    <el-menu
      default-active="4"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      :collapse="sidebar"
      class="el-menu-vertical-demo"
      :style="sidebar ? 'padding-top: 60px;' : 'padding-top: 120px;'"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item index="/role">
          <i class="el-icon-setting"></i>
          <span slot="title">角色管理</span>
        </el-menu-item>
        <el-menu-item index="/menu">
          <i class="el-icon-setting"></i>
          <span slot="title">菜单管理</span>
        </el-menu-item>
        <el-menu-item index="/resource">
          <i class="el-icon-setting"></i>
          <span slot="title">资源管理</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="/course">
        <i class="el-icon-menu"></i>
        <span slot="title">课程管理</span>
      </el-menu-item>
      <el-menu-item index="/user">
        <i class="el-icon-document"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>广告管理</span>
        </template>
        <el-menu-item index="/advert">
          <i class="el-icon-setting"></i>
          <span slot="title">广告列表</span>
        </el-menu-item>
        <el-menu-item index="/advert-space">
          <i class="el-icon-setting"></i>
          <span slot="title">广告位列表</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AppAside',
  data () {
    return {
      isCollapse: false,
      sidebar: false
    }
  },
  created () {
    ;(this as any).$bus.$on('sidebar', (sidebar: any) => {
      // console.log(sidebar)
      this.sidebar = sidebar
    })
  },
  methods: {
    handleOpen (key: string, keyPath: string): void {
      console.log(key, keyPath)
    },

    handleClose (key: string, keyPath: string): void {
      console.log(key, keyPath)
    }
  },
  beforeDestroy () {
    ;(this as any).$bus.$off('sidebar', () => {
      // console.log('兄弟傳值被消除')
    }) // 当这个组件销毁的时候bus也跟着一起销毁
  }
})
</script>

<style lang="scss" scoped>
.aside {
  height: 100%;
  .el-menu {
    width: auto;
    // min-height: 100vh;
    height: 100%;
    box-sizing: border-box;
  }
  #icon {
    position: absolute;
    z-index: 999;
    .small {
      margin: auto;
      padding: 4px;
      width: 56px;
      height: 56px;
    }
    .big {
      margin: auto;
      padding: 4px;
      width: 192px;
    }
    .mylogo {
      cursor: pointer;
    }
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }
}
</style>
