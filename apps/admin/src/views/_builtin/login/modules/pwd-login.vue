<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { loginModuleRecord } from '@/constants/app';
import { useAuthStore } from '@/store/modules/auth';
import { useRouterPush } from '@/hooks/common/router';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';
import { fetchCaptchaImage, fetchTenantList } from '@/service/api';

defineOptions({
  name: 'PwdLogin'
});

const authStore = useAuthStore();
const { toggleLoginModule } = useRouterPush();
const { formRef, validate } = useNaiveForm();

interface FormModel {
  userName: string;
  password: string;
  code: string;
  uuid: string;
  tenantId: string;
}

const model: FormModel = reactive({
  userName: 'admin',
  password: 'admin123',
  code: '',
  uuid: '',
  tenantId: '000000'
});

// Captcha state
const captchaEnabled = ref(false);
const captchaImg = ref('');

// Tenant state
const tenantEnabled = ref(false);
const tenantList = ref<Api.Auth.TenantInfo[]>([]);
const tenantOptions = computed(() =>
  tenantList.value.map((t: Api.Auth.TenantInfo) => ({
    label: t.companyName,
    value: t.tenantId
  }))
);

const rules = computed<Record<keyof FormModel, App.Global.FormRule[]>>(() => {
  const { formRules } = useFormRules();

  return {
    userName: formRules.userName,
    password: formRules.pwd,
    code: captchaEnabled.value
      ? [{ required: true, message: $t('page.login.codeLogin.imageCodePlaceholder'), trigger: 'blur' }]
      : [],
    uuid: [],
    tenantId: []
  };
});

/** Load captcha image */
async function loadCaptcha() {
  const { data, error } = await fetchCaptchaImage();
  if (!error && data) {
    captchaEnabled.value = data.captchaEnabled;
    if (data.captchaEnabled) {
      model.uuid = data.uuid;
      captchaImg.value = `data:image/png;base64,${data.img}`;
    }
  }
}

/** Load tenant list */
async function loadTenantList() {
  const { data, error } = await fetchTenantList();
  if (!error && data) {
    tenantEnabled.value = data.tenantEnabled;
    if (data.tenantEnabled && data.voList) {
      tenantList.value = data.voList;
      // Set default tenant if available
      if (data.voList.length > 0 && !model.tenantId) {
        model.tenantId = data.voList[0].tenantId;
      }
    }
  }
}

async function handleSubmit() {
  await validate();
  await authStore.login(
    model.userName,
    model.password,
    captchaEnabled.value ? model.code : undefined,
    captchaEnabled.value ? model.uuid : undefined,
    tenantEnabled.value ? model.tenantId : undefined
  );
  // Refresh captcha after login attempt (in case of failure)
  if (captchaEnabled.value) {
    await loadCaptcha();
    model.code = '';
  }
}

type AccountKey = 'super' | 'admin' | 'user';

interface Account {
  key: AccountKey;
  label: string;
  userName: string;
  password: string;
}

const accounts = computed<Account[]>(() => [
  {
    key: 'admin',
    label: $t('page.login.pwdLogin.admin'),
    userName: 'admin',
    password: 'admin123'
  }
]);

async function handleAccountLogin(account: Account) {
  model.userName = account.userName;
  model.password = account.password;
  await handleSubmit();
}

onMounted(async () => {
  await Promise.all([loadTenantList(), loadCaptcha()]);
});
</script>

<template>
  <NForm ref="formRef" :model="model" :rules="rules" size="large" :show-label="false" @keyup.enter="handleSubmit">
    <!-- Tenant selector -->
    <NFormItem v-if="tenantEnabled" path="tenantId">
      <NSelect
        v-model:value="model.tenantId"
        :options="tenantOptions"
        placeholder="请选择租户"
      />
    </NFormItem>
    <NFormItem path="userName">
      <NInput v-model:value="model.userName" :placeholder="$t('page.login.common.userNamePlaceholder')" />
    </NFormItem>
    <NFormItem path="password">
      <NInput
        v-model:value="model.password"
        type="password"
        show-password-on="click"
        :placeholder="$t('page.login.common.passwordPlaceholder')"
      />
    </NFormItem>
    <!-- Captcha input -->
    <NFormItem v-if="captchaEnabled" path="code">
      <div class="w-full flex gap-16px">
        <NInput
          v-model:value="model.code"
          class="flex-1"
          :placeholder="$t('page.login.codeLogin.imageCodePlaceholder')"
        />
        <div class="h-40px w-120px cursor-pointer overflow-hidden rounded" @click="loadCaptcha">
          <img v-if="captchaImg" :src="captchaImg" alt="captcha" class="h-full w-full object-cover" />
          <div v-else class="h-full w-full flex-center bg-gray-200 text-gray-500">加载中...</div>
        </div>
      </div>
    </NFormItem>
    <NSpace vertical :size="24">
      <div class="flex-y-center justify-between">
        <NCheckbox>{{ $t('page.login.pwdLogin.rememberMe') }}</NCheckbox>
        <NButton quaternary @click="toggleLoginModule('reset-pwd')">
          {{ $t('page.login.pwdLogin.forgetPassword') }}
        </NButton>
      </div>
      <NButton type="primary" size="large" round block :loading="authStore.loginLoading" @click="handleSubmit">
        {{ $t('common.confirm') }}
      </NButton>
      <div class="flex-y-center justify-between gap-12px">
        <NButton class="flex-1" block @click="toggleLoginModule('code-login')">
          {{ $t(loginModuleRecord['code-login']) }}
        </NButton>
        <NButton class="flex-1" block @click="toggleLoginModule('register')">
          {{ $t(loginModuleRecord.register) }}
        </NButton>
      </div>
      <NDivider class="text-14px text-#666 !m-0">{{ $t('page.login.pwdLogin.otherAccountLogin') }}</NDivider>
      <div class="flex-center gap-12px">
        <NButton v-for="item in accounts" :key="item.key" type="primary" @click="handleAccountLogin(item)">
          {{ item.label }}
        </NButton>
      </div>
    </NSpace>
  </NForm>
</template>

<style scoped></style>
