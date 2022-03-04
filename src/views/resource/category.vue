<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-button @click="handleAdd">添加</el-button>
    </div>
    <el-table :data="resourceCategories" border style="width: 100%" stripe>
      <el-table-column prop="id" label="编号" width="180" align="center">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180" align="center">
      </el-table-column>
      <el-table-column label="创建时间" :formatter="dateFormat" align="center">
      </el-table-column>
      <el-table-column prop="sort" label="排序" width="180" align="center">
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="isEdit ? '修改资源分类' : '添加资源分类'"
      :visible.sync="centerDialogVisible"
      width="30%"
    >
      <el-form label-width="100px" size="small">
        <el-form-item label="资源名称: ">
          <el-input v-model="category.name"></el-input>
        </el-form-item>
        <el-form-item label="资源路径: ">
          <el-input v-model="category.sort"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  getResourceCategories,
  createOrUpdate,
  deleteResourceCategory
} from '@/services/resource-category'
import moment from 'moment'

export default Vue.extend({
  name: '',
  data () {
    return {
      resourceCategories: [],
      centerDialogVisible: false,
      isEdit: false,
      category: {}
    }
  },
  created () {
    this.getResourceCategories()
  },
  methods: {
    async getResourceCategories () {
      const { data } = await getResourceCategories()
      this.resourceCategories = data.data
    },
    dateFormat (item: any) {
      if (item && item.updatedTime) {
        return moment(item.updatedTime).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    handleAdd () {
      this.category = {}
      this.isEdit = false
      this.centerDialogVisible = true
    },
    async handleEdit (row: any) {
      console.log(row)
      this.isEdit = true
      this.category = row
      this.centerDialogVisible = true
    },
    async onSubmit () {
      const { data } = await createOrUpdate(this.category)
      if (data) {
        this.$message.success('修改成功')
        this.getResourceCategories()
        this.centerDialogVisible = false
      }
    },
    async handleDelete (item: any) {
      try {
        await this.$confirm(`确认删除分类：${item.name}？`, '删除提示')
        await deleteResourceCategory(item.id)
        this.$message.success('删除成功')
        this.getResourceCategories()
        this.centerDialogVisible = false
      } catch (err) {
        if (err) {
          this.$message.error('删除失败，请重试')
        } else {
          this.$message.info('取消删除')
        }
      }
    }
  }
})
</script>

<style lang="scss" scoped></style>
