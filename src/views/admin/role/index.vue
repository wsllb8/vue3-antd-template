<script setup>
import { ref, onMounted, createVNode } from 'vue'
import { Modal } from 'ant-design-vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { getRoleListApi, deleteRoleApi } from '@/api/admin/role'

import RoleModal from './components/RoleModal.vue'

const RoleModalRef = ref(null)

const columns  = ref([
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '角色名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '描述',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
  },
])
const listData = ref([])

const getListData = () => {
  getRoleListApi().then(res => {
    listData.value = res.data.list
  })
}

const handleCreateRole = () => {
  RoleModalRef.value.open()
}

const handleUpdateRole = (value) => {
  RoleModalRef.value.open({type: 'update', data: value})
}

const handleDeleteRole = (value) => {
  Modal.confirm({
    title: '你确定删除这个角色吗?',
    icon: createVNode(ExclamationCircleOutlined),
    content: value.name,
    okType: 'danger',
    onOk() {
      deleteRoleApi({id: value.id}).then(res => {
        getListData()
      })
    },
    onCancel() {
      console.log('Cancel');
    },
  })
}

onMounted(() => {
  getListData()
})
</script>

<template>
  <div>
    <div>
      <a-button type="primary" @click="handleCreateRole">新增角色</a-button>
    </div>
    <a-table :columns="columns" :dataSource="listData">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <div>
            <a-button type="primary" size="small" @click="handleUpdateRole(record)">编辑</a-button>
            <a-button type="primary" danger size="small" @click="handleDeleteRole(record)">删除</a-button>
          </div>
        </template>
      </template>
    </a-table>
    <RoleModal ref="RoleModalRef" @success="getListData" />
  </div>
</template>