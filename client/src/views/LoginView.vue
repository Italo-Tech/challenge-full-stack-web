<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-card-title class="text-center bg-primary pa-6">
            <h2 class="text-white">Edtech</h2>
            <p class="text-white text-subtitle-2">Sistema Acadêmico</p>
          </v-card-title>

          <v-card-text class="pa-6">
            <v-form @submit.prevent="handleLogin">
              <v-text-field
                v-model="form.email"
                label="Email"
                prepend-inner-icon="mdi-email"
                type="email"
                variant="outlined"
                :rules="[rules.required, rules.email]"
                :error-messages="errorMessage"
              ></v-text-field>

              <v-text-field
                v-model="form.password"
                label="Senha"
                prepend-inner-icon="mdi-lock"
                :type="showPassword ? 'text' : 'password'"
                :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append-inner="showPassword = !showPassword"
                variant="outlined"
                :rules="[rules.required]"
                :error-messages="errorMessage"
              ></v-text-field>

              <v-btn
                type="submit"
                color="primary"
                size="large"
                block
                :loading="loading"
                class="mt-4"
              >
                Entrar
              </v-btn>
            </v-form>

            <v-alert v-if="errorMessage" type="error" class="mt-4" closable>
              {{ errorMessage }}
            </v-alert>

            <v-divider class="my-6"></v-divider>

            <v-card-text class="text-center text-caption">
              Credenciais padrão:<br />
              Email: admin@edtech.com<br />
              Senha: 123456
            </v-card-text>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  email: '',
  password: '',
})

const showPassword = ref(false)
const loading = ref(false)
const errorMessage = ref('')

const rules = {
  required: (value: string) => !!value || 'Campo obrigatório',
  email: (value: string) => /.+@.+\..+/.test(value) || 'Email inválido',
}

const handleLogin = async () => {
  errorMessage.value = ''
  loading.value = true

  try {
    await authStore.login(form.email, form.password)
    router.push('/students')
  } catch (error: any) {
    errorMessage.value = error.response?.data?.message || 'Erro ao fazer login'
  } finally {
    loading.value = false
  }
}
</script>
