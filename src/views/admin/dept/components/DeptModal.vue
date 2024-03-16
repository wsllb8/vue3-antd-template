<script setup>
import { ref, reactive } from 'vue'
import { createDeptApi, updateDeptApi } from '@/api/admin/dept'
import { checkNonZeroNumber } from '@/util/validate'

const formRef = ref(null)
const state = reactive({
  visible: false,
  title: {
    create: '创建部门',
    update: '更新部门'
  },
  status: 'create',
})

const defaultFormData = () => {
  return {
    name: '',
    description: '',
    status: 0,
    sort: 0,
    leader: '',
    phone: '',
    email: '',
    remark: ''
  }
}

const formData = ref(defaultFormData())
const formRules = {
  id: [
    { required: true, message: '请输入部门ID', trigger: 'blur' },
    { validator: checkNonZeroNumber, trigger: 'blur'}
  ],
  name: [
    { required: true, message: '请输入部门名称', trigger: 'blur' },
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
    res = await createDeptApi(formData.value)
  } else {
    res = await updateDeptApi(formData.value)
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
      <a-form-item label="名称" name="name">
        <a-input v-model:value="formData.name" />
      </a-form-item>
      <a-form-item label="描述" name="description">
        <a-textarea v-model:value="formData.description" />
      </a-form-item>
      <a-form-item label="状态">
        <a-radio-group v-model:value="formData.status">
          <a-radio :value="0">启用</a-radio>
          <a-radio :value="1">禁用</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="负责人" name="leader">
        <a-input v-model:value="formData.leader" />
      </a-form-item>
      <a-form-item label="联系电话" name="phone">
        <a-input v-model:value="formData.phone" />
      </a-form-item>
      <a-form-item label="邮箱" name="email">
        <a-input v-model:value="formData.email" />
      </a-form-item>
      <a-form-item label="排序" name="sort">
        <a-input-number class="w-100%" v-model:value="formData.sort" />
      </a-form-item>
      <a-form-item label="备注" name="remark">
        <a-textarea v-model:value="formData.remark" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>