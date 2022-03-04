/**
 * 资源相关请求模块
 */

import request from '@/utils/request'

// 保存或更新资源
export const createOrUpdate = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/resource/saveOrUpdate',
    data
  })
}

// 通过ID值获取资源信息
export const getResourceById = (id: string | number) => {
  return request({
    method: 'GET',
    url: `/boss/resource/${id}`
  })
}

// 通过ID值删除资源
export const deleteResource = (id: string | number) => {
  return request({
    method: 'DELETE',
    url: `/boss/resource/${id}`
  })
}

export const getResourcePages = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/resource/getResourcePages',
    data
  })
}

export const getAllResources = () => {
  return request({
    method: 'GET',
    url: '/boss/resource/getAll'
  })
}

export const allocateRoleResources = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/resource/allocateRoleResources',
    data
  })
}

export const getRoleResources = (roleId: string | number) => {
  return request({
    method: 'GET',
    url: '/boss/resource/getRoleResources',
    params: {
      roleId
    }
  })
}
