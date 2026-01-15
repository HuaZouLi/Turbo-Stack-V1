<script setup lang="ts">
/**
 * ${entityCn}表单组件
 *
 * @author ${author}
 * @since ${date}
 */
import { ref, computed, watch } from 'vue';
import type { FormInst, FormRules } from 'naive-ui';
import { add${Entity}, update${Entity}, type ${Entity}Vo, type ${Entity}Dto } from '@/service/api/${module}';

interface Props {
  show: boolean;
  data: ${Entity}Vo | null;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  'update:show': [value: boolean];
  success: [];
}>();

// 表单引用
const formRef = ref<FormInst | null>(null);

// 是否编辑模式
const isEdit = computed(() => !!props.data?.${entityId});

// 弹窗标题
const title = computed(() => (isEdit.value ? '编辑${entityCn}' : '新增${entityCn}'));

// 表单数据
const formData = ref<${Entity}Dto>({
  // TODO: 初始化表单字段
});

// 表单验证规则
const rules: FormRules = {
  // TODO: 添加验证规则
  // name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
};

// 加载中
const loading = ref(false);

// 监听数据变化，初始化表单
watch(
  () => props.data,
  (val) => {
    if (val) {
      formData.value = { ...val };
    } else {
      formData.value = {
        // TODO: 重置表单字段
      };
    }
  },
  { immediate: true }
);

// 关闭弹窗
function handleClose() {
  emit('update:show', false);
}

// 提交表单
async function handleSubmit() {
  try {
    await formRef.value?.validate();
  } catch {
    return;
  }

  loading.value = true;
  try {
    if (isEdit.value) {
      await update${Entity}(formData.value);
      window.$message?.success('修改成功');
    } else {
      await add${Entity}(formData.value);
      window.$message?.success('新增成功');
    }
    emit('success');
    handleClose();
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <n-modal
    :show="show"
    :title="title"
    preset="card"
    style="width: 600px"
    @update:show="handleClose"
  >
    <n-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-placement="left"
      label-width="100"
    >
      <!-- TODO: 添加表单字段 -->
      <!-- <n-form-item label="名称" path="name">
        <n-input v-model:value="formData.name" placeholder="请输入名称" />
      </n-form-item> -->
      
      <!-- <n-form-item label="状态" path="status">
        <n-select v-model:value="formData.status" :options="statusOptions" placeholder="请选择状态" />
      </n-form-item> -->
      
      <!-- <n-form-item label="备注" path="remark">
        <n-input v-model:value="formData.remark" type="textarea" placeholder="请输入备注" />
      </n-form-item> -->
    </n-form>

    <template #footer>
      <n-space justify="end">
        <n-button @click="handleClose">取消</n-button>
        <n-button type="primary" :loading="loading" @click="handleSubmit">确定</n-button>
      </n-space>
    </template>
  </n-modal>
</template>
