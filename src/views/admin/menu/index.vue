<script setup>
import { ref, onMounted, createVNode } from 'vue'
import { Modal } from 'ant-design-vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { getMenuListApi, deleteMenuApi } from '@/api/admin/menu'

import MenuModal from './components/MenuModal.vue'

const MenuModalRef = ref(null)

const treeData = ref([])
const selectKey = ref([])
const menuMap = {}

const getListData = () => {
  getMenuListApi().then(res => {
    console.log(res)
    const listData = res.data.list
    const temp = {}
    listData.forEach(item => {
      // 把所有的菜单放到一个对象中
      menuMap[item.id] = item

      if (temp[item.parentId]) {
        temp[item.parentId].push({
          title: item.meta.title,
          key: item.id,
        })
      } else {
        temp[item.parentId] = [{
          title: item.meta.title,
          key: item.id,
        }]
      }
    })
    const result = temp[0]
    result.forEach(item => {
      item.children = temp[item.key] || []
    })
    treeData.value = result
  })
}

const handleCreateMenu = () => {
  MenuModalRef.value.open()
}

const handleUpdateMenu = (value) => {
  MenuModalRef.value.open({type: 'update', data: menuMap[value]})
}

const handleDeleteMenu = (value) => {
  Modal.confirm({
    title: '你确定删除这个菜单吗?',
    icon: createVNode(ExclamationCircleOutlined),
    content: value.title,
    okType: 'danger',
    onOk() {
      deleteMenuApi({ id: value.key }).then(res => {
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
      <a-button type="primary" @click="handleCreateMenu">新增菜单</a-button>
    </div>
    <div class="flex">
      <div class="flex-1">
        <a-tree :treeData="treeData" v-model:selectedKeys="selectKey" class="">
          <template #title="{title, key}">
            <div class="flex justify-between w-52">
              <div>{{ title }}</div>
              <div>
                <a-button type="link" size="small" @click.stop="handleUpdateMenu(key)">编辑</a-button>
                <a-button type="link" danger size="small" @click.stop="handleDeleteMenu({ title,key })">删除</a-button>
              </div>
            </div>
          </template>
        </a-tree>
      </div>
      <div class="flex-1">
        <a-descriptions v-if="selectKey.length > 0" title="菜单详情" :column="2" bordered>
          <a-descriptions-item label="上级菜单">{{ menuMap[selectKey[0]].parentId === 0 ? '根菜单' : menuMap[menuMap[selectKey[0]].parentId].meta.title }}</a-descriptions-item>
          <a-descriptions-item label="标题">{{ menuMap[selectKey[0]].meta.title }}</a-descriptions-item>
          <a-descriptions-item label="名称">{{ menuMap[selectKey[0]].name }}</a-descriptions-item>
          <a-descriptions-item label="路径">{{ menuMap[selectKey[0]].path }}</a-descriptions-item>
          <a-descriptions-item label="组件">{{ menuMap[selectKey[0]].component }}</a-descriptions-item>
          <a-descriptions-item label="排序">{{ menuMap[selectKey[0]].meta.sort }}</a-descriptions-item>
        </a-descriptions>
      </div>
    </div>
    
    <MenuModal ref="MenuModalRef" :treeData="treeData" @success="getListData" />
  </div>
</template>