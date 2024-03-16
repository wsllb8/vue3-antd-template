<script setup>
import { ref, onMounted, createVNode } from 'vue'
import { Modal } from 'ant-design-vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { getDeptListApi, deleteDeptApi } from '@/api/admin/dept'

import DeptModal from './components/DeptModal.vue'

const DeptModalRef = ref(null)

const columns  = ref([
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '部门名称',
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
  getDeptListApi().then(res => {
    listData.value = res.data.list
  })
}

const handleCreateDept = () => {
  DeptModalRef.value.open()
}

const handleUpdateDept = (value) => {
  DeptModalRef.value.open({type: 'update', data: value})
}

const handleDeleteDept = (value) => {
  Modal.confirm({
    title: '你确定删除这个部门吗?',
    icon: createVNode(ExclamationCircleOutlined),
    content: value.name,
    okType: 'danger',
    onOk() {
      deleteDeptApi({id: value.id}).then(res => {
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
      <a-button type="primary" @click="handleCreateDept">新增部门</a-button>
    </div>
    <a-table :columns="columns" :dataSource="listData">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <div>
            <a-button type="primary" size="small" @click="handleUpdateDept(record)">编辑</a-button>
            <a-button type="primary" danger size="small" @click="handleDeleteDept(record)">删除</a-button>
          </div>
        </template>
      </template>
    </a-table>
    <DeptModal ref="DeptModalRef" @success="getListData" />
  </div>
</template>