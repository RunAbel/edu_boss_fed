<template>
  <div class="header">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <span
        class="iconfont"
        @click="openOrClose"
        :class="
          !sidebar
            ? 'icon-a-cebianlanfenleizhedie'
            : 'icon-a-fenleizhediecebianlan'
        "
      ></span>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item >{{ $route.name }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          shape="square"
          :size="40"
          :src="userInfo.portrait || require('@/assets/default-avatar.png')"
        ></el-avatar>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>{{ userInfo.userName }}</el-dropdown-item>
        <el-dropdown-item divided @click.native="handleLogout"
          >退出</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getUserInfo } from '@/services/user'

export default Vue.extend({
  name: 'AppHeader',
  data () {
    return {
      userInfo: {}, // 当前登录用户信息
      sidebar: false
    }
  },
  created () {
    this.loadUserInfo()
  },
  methods: {
    openOrClose () {
      this.sidebar = !this.sidebar;
      (this as any).$bus.$emit('sidebar', this.sidebar)
    },
    async loadUserInfo () {
      const { data } = await getUserInfo()
      this.userInfo = data.content
    },

    handleLogout () {
      this.$confirm('确认退出吗？', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 确认执行这里
          // 清除登录状态
          this.$store.commit('setUser', null)

          // 跳转到登录页面
          this.$router.push({
            name: 'login'
          })

          this.$message({
            type: 'success',
            message: '退出成功!'
          })
        })
        .catch(() => {
          // 取消执行这里
          this.$message({
            type: 'info',
            message: '已取消退出'
          })
        })
    }
  }
})
</script>

<style src="@/assets/fonts/iconfont.css" scoped></style>
<style lang="scss" scoped>
.header {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 1px;
  .el-breadcrumb {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .el-breadcrumb__item:nth-child(2) {
    margin-left: 20px;
  }

  .iconfont {
    font-size: 2em;
    cursor: pointer;
  }
}
</style>
