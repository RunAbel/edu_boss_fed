<template>
  <div class="resource-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item prop="name" label=" 资源名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item prop="url" label="资源路径">
            <el-input v-model="form.url"></el-input>
          </el-form-item>
          <el-form-item prop="categoryId" label="资源分类">
            <el-select
              v-model="form.categoryId"
              placeholder="请选择资源分类"
              clearable
            >
              <el-option
                :label="item.name"
                :value="item.id"
                v-for="item in resourceCategories"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" :disabled="isLoading"
              >查询搜索</el-button
            >
            <el-button @click="onReset" :disabled="isLoading">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-button @click="handleAdd">添加</el-button>
      <el-button @click="resourceCategory">资源分类</el-button>
      <el-table
        :data="resources"
        style="width: 100%; margin-bottom: 20px;"
        v-loading="isLoading"
        align="center"
        border
      >
        <el-table-column type="index" label="编号" width="100">
        </el-table-column>
        <el-table-column prop="name" label="资源名称" width="180">
        </el-table-column>
        <el-table-column prop="url" width="180" label="资源路径">
        </el-table-column>
        <el-table-column prop="description" width="180" label="描述">
        </el-table-column>
        <el-table-column width="180" :formatter="dateFormat" label="添加时间">
        </el-table-column>
        <el-table-column width="180" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!--
        total 总记录数
        page-size 每页大小
        分页组件会自动根据 total 和 page-size 计算出一共分多少页
       -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :disabled="isLoading"
        :current-page.sync="form.current"
        :page-sizes="[5, 10, 20]"
        :page-size="form.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        align="center"
      >
      </el-pagination>
    </el-card>
    <el-dialog
      :title="isEdit ? '编辑资源' : '添加资源'"
      :visible.sync="dialogVisible"
      width="500px"
    >
      <create-or-edit
        v-if="dialogVisible"
        :resource-id="resourceId"
        :is-edit="isEdit"
        @success="onSuccess"
        @cancel="dialogVisible = false"
      />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getResourcePages, deleteResource } from '@/services/resource'
import { getResourceCategories } from '@/services/resource-category'
import { Form } from 'element-ui'
import CreateOrEdit from './CreateOrEdit.vue'
import moment from 'moment'

export default Vue.extend({
  name: 'ResourceList',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    CreateOrEdit
  },
  data () {
    return {
      resources: [], // 资源列表
      form: {
        name: '',
        url: '',
        current: 1, // 默认查询第1页数据
        size: 5, // 每页大小
        categoryId: null // 资源分类
      },
      totalCount: 0,
      resourceCategories: [], // 资源分类列表
      isLoading: true, // 加载状态
      dialogVisible: false, // 控制添加/编辑资源的对话框显示和隐藏
      resourceId: null, // 编辑角色的 ID
      isEdit: false
    }
  },

  created () {
    this.loadResources()
    this.loadResourceCategories()
  },

  methods: {
    dateFormat (item: any) {
      if (item && item.updatedTime) {
        return moment(item.updatedTime).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    handleAdd () {
      this.isEdit = false
      this.dialogVisible = true
    },

    handleEdit (resource: any) {
      this.dialogVisible = true
      this.resourceId = resource.id
      this.isEdit = true
    },

    onSuccess () {
      this.dialogVisible = false // 关闭对话框
      this.loadResources() // 重新加载数据列表
    },

    async loadResourceCategories () {
      const { data } = await getResourceCategories()
      this.resourceCategories = data.data
    },

    async loadResources () {
      this.isLoading = true // 展示加载中状态
      const { data } = await getResourcePages(this.form)
      this.resources = data.data.records
      this.totalCount = data.data.total
      this.isLoading = false // 关闭加载中状态
    },

    onSubmit () {
      this.form.current = 1 // 筛选查询从第 1 页开始
      this.loadResources()
    },

    async handleDelete (item: any) {
      try {
        await this.$confirm(`确认删除资源：${item.name}？`, '删除提示')
        await deleteResource(item.id)
        this.$message.success('删除成功')
        this.loadResources()
      } catch (err) {
        if (err) {
          this.$message.error('删除失败，请重试')
        } else {
          this.$message.info('取消删除')
        }
      }
    },

    handleSizeChange (val: number) {
      this.form.size = val
      this.form.current = 1 // 每页大小改变重新查询第1页数据
      this.loadResources()
    },

    handleCurrentChange (val: number) {
      // 请求获取对应页码的数据
      this.form.current = val // 修改要查询的页码
      this.loadResources()
    },

    onReset () {
      ;(this.$refs.form as Form).resetFields()
      this.form.current = 1 // 重置回到第1页
      this.loadResources()
    },

    // 资源分类
    resourceCategory () {
      this.$router.push({
        name: 'resource-category'
      })
    }
  }
})
</script>

<style lang="scss">
.el-card__body {
  > .el-button:nth-child(1) {
    margin: 20px 10px 20px 40px;
  }
  padding: 0px 0px 20px 0px;
  .el-table__header,
  .el-table__footer,
  .el-table__body {
    width: 100% !important;
    padding: 0px;
    .cell {
      text-align: center;
    }
  }
}
.el-dialog__body {
  width: 350px;
}
</style>
