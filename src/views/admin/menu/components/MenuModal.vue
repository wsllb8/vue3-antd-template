<script setup>
import { ref, reactive } from 'vue'
import { createMenuApi, updateMenuApi } from '@/api/admin/menu'

const props = defineProps({
  treeData: {
    type: Array,
    default: () => []
  }
})

const formRef = ref(null)
const state = reactive({
  visible: false,
  title: {
    create: '新增菜单',
    update: '编辑菜单'
  },
  status: 'create',
})

const defaultFormData = () => {
  return {
    parentId: 0,
    path: '',
    name: '',
    component: '',
    redirect: '',
    meta: {
      title: '',
      icon: '',
      sort: 0,
      hidden: false,
      keeplive: true
    }
  }
}

const formData = ref(defaultFormData())

const formRules = {
  parentId: [
    { required: true, message: '请选择上级菜单', trigger: 'blur' },
  ],
  path: [
    { required: true, message: '请输入路径', trigger: 'blur' },
  
  ],
  name: [
    { required: true, message: '请输入名称', trigger: 'blur' },
  ],
  component: [
    { required: true, message: '请输入组件', trigger: 'blur' },
  ],
  meta: {
    title: { required: true, message: '请输入标题', trigger: 'blur' },
  }
}


const emit = defineEmits(['success'])

const open = (value) => {
  const { type, data } = value || {}
  if (type === 'update') {
    state.status = 'update'
    formData.value = JSON.parse(JSON.stringify(data))
  } else {
    state.status = 'create'
    formData.value = defaultFormData()
  }
  state.visible = true
}

const close = () => {
  state.visible = false
  formRef.value.resetFields()
}

const handleSubmit = async () => {
  await formRef.value.validate()
  let res
  if (state.status === 'create') {
    res = await createMenuApi(formData.value)
  } else {
    res = await updateMenuApi(formData.value)
  }
  emit('success')
  close()
}

defineExpose({
  open
})

</script>

<template>
  <a-modal v-model:open="state.visible" :title="state.title[state.status]" @ok="handleSubmit" width="600px">
    <a-form ref="formRef" :model="formData" :rules="formRules" :labelCol="{span:8,offset:0}">
      <a-row>
        <a-col :span="12">
          <a-form-item label="上级菜单" name="parentId">
            <a-select v-model:value="formData.parentId">
              <a-select-option :value="0">根菜单</a-select-option>
              <a-select-option v-for="item in props.treeData" :key="item.key" :value="item.key">{{ item.title }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="路径" name="path">
            <a-input v-model:value="formData.path" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item label="标题" :name="['meta', 'title']">
            <a-input v-model:value="formData.meta.title"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="名称" name="name">
            <a-input v-model:value="formData.name" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item label="组件" name="component">
            <a-input v-model:value="formData.component" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="排序" name="meta.sort">
            <a-input-number class="w-100%" v-model:value="formData.meta.sort"></a-input-number>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item label="是否显示" name="meta.hidden">
            <a-radio-group v-model:value="formData.meta.hidden" button-style="solid">
              <a-radio-button :value="false">显示</a-radio-button>
              <a-radio-button :value="true">隐藏</a-radio-button>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="图标" name="icon">
            <a-input v-model:value="formData.meta.icon" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>