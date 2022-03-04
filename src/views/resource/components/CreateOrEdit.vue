<template>
  <div>
    <el-form label-width="100px" size="small">
      <el-form-item label="资源名称: ">
        <el-input v-model="resource.name"></el-input>
      </el-form-item>
      <el-form-item label="资源路径: ">
        <el-input v-model="resource.url"></el-input>
      </el-form-item>
      <el-form-item label="资源分类: ">
        <el-select v-model="resource.categoryId" placeholder="请选择">
          <el-option
            v-for="item in resourceCategories"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述: ">
        <el-input type="textarea" v-model="resource.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="$emit('cancel')">取消</el-button>
        <el-button type="primary" @click="onSubmit">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { createOrUpdate, getResourceById } from '@/services/resource'
import { getResourceCategories } from '@/services/resource-category'

export default Vue.extend({
  name: 'CreateOrEditResource',
  props: {
    resourceId: {
      type: [String, Number]
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      resource: {
        name: '',
        categoryId: '',
        url: '',
        description: ''
      },
      resourceCategories: []
    }
  },

  created () {
    if (this.isEdit) {
      this.loadResource()
    }
    this.getResourceCategories()
  },

  methods: {
    async loadResource () {
      const { data } = await getResourceById(this.resourceId)
      this.resource = data.data
    },

    async getResourceCategories () {
      const { data } = await getResourceCategories()
      this.resourceCategories = data.data
    },

    async onSubmit () {
      await createOrUpdate(this.resource)
      this.$message.success('操作成功')
      this.$emit('success')
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
