<script setup>
import { ref, reactive } from 'vue'
import { createRoleApi, updateRoleApi } from '@/api/admin/role'
import { checkNonZeroNumber } from '@/util/validate'

const formRef = ref(null)
const state = reactive({
  visible: false,
  title: {
    create: '创建角色',
    update: '更新角色'
  },
  status: 'create',
})

const formData = ref({
  id: 0,
  name: '',
  description: '',
  status: 0
})
const formRules = {
  id: [
    { required: true, message: '请输入角色ID', trigger: 'blur' },
    { validator: checkNonZeroNumber, trigger: 'blur'}
  ],
  name: [
    { required: true, message: '请输入角色名称', trigger: 'blur' },
  ]
}
const emit = defineEmits(['success'])

const open = (value) => {
  const { type, data } = value || {}
  if (type === 'update') {
    state.status = 'update'
    formData.value = JSON.parse(JSON.stringify(data))
  } else {
    state.status = 'create'
    formData.value = {
      id: 0,
      name: '',
      description: '',
      status: 0
    }
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
    res = await createRoleApi(formData.value)
  } else {
    res = await updateRoleApi(formData.value)
  }
  emit('success')
  close()
}

defineExpose({
  open
})

</script>

<template>
  <a-modal v-model:open="state.visible" :title="state.title[state.status]" @ok="handleSubmit">
    <a-form ref="formRef" :model="formData" :rules="formRules" :labelCol="{span:4,offset:0}">
      <a-form-item label="角色ID" name="id">
        <a-input-number :disabled="state.status === 'update'" class="w-88" v-model:value="formData.id" />
      </a-form-item>
      <a-form-item label="角色名称" name="name">
        <a-input class="w-88" v-model:value="formData.name" />
      </a-form-item>
      <a-form-item label="描述" name="description">
        <a-textarea class="w-88" v-model:value="formData.description" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>