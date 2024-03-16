<script setup>
import { ref, onMounted } from 'vue'
import { getUserListApi } from '@/api/admin/user'
import UserModal from './components/UserModal.vue'

const UserModalRef = ref(null)

const columns  = ref([
  {
    title: '头像',
    dataIndex: 'avatar',
    key: 'avatar',
  },
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '昵称',
    dataIndex: 'nickName',
    key: 'nickName',
  },
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: '角色',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: '部门',
    dataIndex: 'dept',
    key: 'dept',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
  },
])
const listData = ref([])

const getListData = () => {
  getUserListApi().then(res => {
    listData.value = res.data.list
  })
}

const handleCreateUser = () => {
  UserModalRef.value.open()
}

const handleUpdateUser = (record) => {
  UserModalRef.value.open({ type: 'update', data: record })
}

onMounted(() => {
  getListData()
})
</script>

<template>
  <div>
    <div>
      <a-button type="primary" @click="handleCreateUser">创建用户</a-button>
    </div>
    <a-table :columns="columns" :dataSource="listData">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'avatar'">
          <a-avatar :src="record.avatar"></a-avatar>
        </template>
        <template v-if="column.key === 'role'">
          <div>{{ record.role?.name }}</div>
        </template>
        <template v-if="column.key === 'dept'">
          <div>{{ record.dept?.name }}</div>
        </template>
        <template v-if="column.key === 'status'">
          <div>{{ record.status === 0 ? '正常' : '封禁' }}</div>
        </template>
        <template v-if="column.key === 'action'">
          <div>
            <a-button type="primary" size="small" @click="handleUpdateUser(record)">编辑</a-button>
          </div>
        </template>
      </template>
    </a-table>
    <UserModal ref="UserModalRef" @success="getListData" />
  </div>
</template>