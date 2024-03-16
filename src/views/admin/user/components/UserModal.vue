<script setup>
import { ref, reactive, onMounted } from 'vue'
import { createUserApi, updateUserApi } from '@/api/admin/user'
import { getRoleListApi } from '@/api/admin/role'
import { getDeptListApi } from '@/api/admin/dept'

const props = defineProps({
  treeData: {
    type: Array,
    default: () => []
  }
})

const roleList = ref([])
const deptList = ref([])
const getRoleList = () => {
  getRoleListApi().then(res => {
    roleList.value = res.data.list
  })
}
const getDeptList = () => {
  getDeptListApi().then(res => {
    deptList.value = res.data.list
  })
}

const formRef = ref(null)
const state = reactive({
  visible: false,
  title: {
    create: '新增用户',
    update: '更新用户'
  },
  status: 'create',
})

const defaultFormData = () => {
  return {
    status: 0,
    username: '',
    password: '',
    nickName: '',
    email: '',
    phone: '',
    roleId: undefined,
    deptId: undefined
  }
}

const formData = ref(defaultFormData())

const formRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
  roleId: [
    { required: true, message: '请选择角色', trigger: 'blur' },
  ],
  nickName: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
  ],
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
    res = await createUserApi(formData.value)
  } else {
    res = await updateUserApi(formData.value)
  }
  emit('success')
  close()
}

onMounted(() => {
  getRoleList()
  getDeptList()
})

defineExpose({
  open
})

</script>

<template>
  <a-modal v-model:open="state.visible" :title="state.title[state.status]" @ok="handleSubmit" width="600px">
    <a-form ref="formRef" :model="formData" :rules="formRules" :labelCol="{span:8,offset:0}">
      <a-row>
        <a-col :span="12">
          <a-form-item label="用户名" name="username">
            <a-input v-model:value="formData.username"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-if="state.status === 'create'" label="密码" name="password">
            <a-input v-model:value="formData.password" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item label="角色" name="roleId">
            <a-select v-model:value="formData.roleId">
              <a-select-option v-for="item in roleList" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="昵称" name="nickName">
            <a-input v-model:value="formData.nickName" />
          </a-form-item>
        </a-col>
      </a-row>
      
      <a-row>
        <a-col :span="12">
          <a-form-item label="手机号" name="phone">
            <a-input v-model:value="formData.phone" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="邮箱" name="email">
            <a-input v-model:value="formData.email"></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item label="状态" name="status">
            <a-radio-group v-model:value="formData.status" button-style="solid">
              <a-radio-button :value="0">正常</a-radio-button>
              <a-radio-button :value="1">封禁</a-radio-button>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="部门" name="deptId">
            <a-select v-model:value="formData.deptId">
              <a-select-option v-for="item in deptList" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>