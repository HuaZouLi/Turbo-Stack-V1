<script setup lang="ts">
/**
 * ${entityCn}列表页面
 *
 * @author ${author}
 * @since ${date}
 */
import { ref, reactive, onMounted } from 'vue';
import { NButton, NSpace, NPopconfirm, NTag } from 'naive-ui';
import type { DataTableColumns } from 'naive-ui';
import { useDict } from '@/hooks/business/dict';
import {
  fetch${Entity}List,
  delete${Entity},
  type ${Entity}Vo,
  type ${Entity}QueryParams
} from '@/service/api/${module}';
import ${Entity}Form from './components/${Entity}Form.vue';

// 字典
// const { options: statusOptions, getLabel: getStatusLabel, getType: getStatusType } = useDict('sys_normal_disable');

// 状态
const loading = ref(false);
const data = ref<${Entity}Vo[]>([]);
const total = ref(0);
const showForm = ref(false);
const formData = ref<${Entity}Vo | null>(null);

// 查询参数
const queryParams = reactive<${Entity}QueryParams>({
  pageNum: 1,
  pageSize: 10,
  // TODO: 添加查询字段
});

// 表格列定义
const columns: DataTableColumns<${Entity}Vo> = [
  { type: 'selection' },
  { title: '${entityCn}ID', key: '${entityId}', width: 100 },
  // TODO: 添加其他列
  // { title: '名称', key: 'name' },
  // {
  //   title: '状态',
  //   key: 'status',
  //   render: (row) => h(NTag, { type: getStatusType(row.status) }, () => getStatusLabel(row.status))
  // },
  { title: '创建时间', key: 'createTime', width: 180 },
  {
    title: '操作',
    key: 'actions',
    width: 150,
    render: (row) =>
      h(NSpace, null, () => [
        h(
          NButton,
          { size: 'small', onClick: () => handleEdit(row) },
          () => '编辑'
        ),
        h(
          NPopconfirm,
          { onPositiveClick: () => handleDelete(row.${entityId}) },
          {
            trigger: () => h(NButton, { size: 'small', type: 'error' }, () => '删除'),
            default: () => '确认删除？'
          }
        )
      ])
  }
];

// 加载数据
async function loadData() {
  loading.value = true;
  try {
    const res = await fetch${Entity}List(queryParams);
    data.value = res.rows || [];
    total.value = res.total || 0;
  } finally {
    loading.value = false;
  }
}

// 搜索
function handleSearch() {
  queryParams.pageNum = 1;
  loadData();
}

// 重置
function handleReset() {
  Object.assign(queryParams, {
    pageNum: 1,
    pageSize: 10,
    // TODO: 重置查询字段
  });
  loadData();
}

// 新增
function handleAdd() {
  formData.value = null;
  showForm.value = true;
}

// 编辑
function handleEdit(row: ${Entity}Vo) {
  formData.value = { ...row };
  showForm.value = true;
}

// 删除
async function handleDelete(id: ${IdType}) {
  await delete${Entity}(id);
  window.$message?.success('删除成功');
  loadData();
}

// 表单提交成功
function handleFormSuccess() {
  showForm.value = false;
  loadData();
}

// 分页变化
function handlePageChange(page: number) {
  queryParams.pageNum = page;
  loadData();
}

function handlePageSizeChange(pageSize: number) {
  queryParams.pageSize = pageSize;
  queryParams.pageNum = 1;
  loadData();
}

onMounted(() => {
  loadData();
});
</script>

<template>
  <div class="p-4">
    <!-- 搜索区域 -->
    <n-card class="mb-4">
      <n-form inline :model="queryParams" label-placement="left">
        <!-- TODO: 添加搜索字段 -->
        <!-- <n-form-item label="名称">
          <n-input v-model:value="queryParams.name" placeholder="请输入名称" />
        </n-form-item> -->
        <n-form-item>
          <n-space>
            <n-button type="primary" @click="handleSearch">搜索</n-button>
            <n-button @click="handleReset">重置</n-button>
          </n-space>
        </n-form-item>
      </n-form>
    </n-card>

    <!-- 操作按钮 -->
    <n-card class="mb-4">
      <n-space>
        <n-button type="primary" @click="handleAdd">新增</n-button>
      </n-space>
    </n-card>

    <!-- 数据表格 -->
    <n-card>
      <n-data-table
        :columns="columns"
        :data="data"
        :loading="loading"
        :pagination="{
          page: queryParams.pageNum,
          pageSize: queryParams.pageSize,
          itemCount: total,
          showSizePicker: true,
          pageSizes: [10, 20, 50, 100],
          onChange: handlePageChange,
          onUpdatePageSize: handlePageSizeChange
        }"
      />
    </n-card>

    <!-- 表单弹窗 -->
    <${Entity}Form
      v-model:show="showForm"
      :data="formData"
      @success="handleFormSuccess"
    />
  </div>
</template>
