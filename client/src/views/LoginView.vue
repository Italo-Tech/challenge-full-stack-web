<template>
  <div class="login-wrapper">
    <v-container class="fill-height pa-0" fluid>
      <v-row align="center" justify="center" class="ma-0">
        <v-col cols="12" sm="8" md="5" lg="4">
          <v-card class="elevation-8 rounded-xl pa-8">
            <v-card-text>
            <!-- Header -->
            <div class="mb-8">
              <h1 class="text-h4 font-weight-bold mb-2">Login</h1>
              
            </div>

            <v-form @submit.prevent="handleLogin">
              <div class="mb-4">
                <label class="text-body-2 text-grey-darken-2 mb-2 d-block">Email</label>
                <v-text-field
                  v-model="form.email"
                  placeholder="fulano@exemplo.com"
                  type="email"
                  variant="outlined"
                  density="comfortable"
                  hide-details="auto"
                  :rules="[rules.required, rules.email]"
                  class="custom-input"
                ></v-text-field>
              </div>

              <div class="mb-9">
                <label class="text-body-2 text-grey-darken-2 mb-2 d-block">Senha</label>
                <v-text-field
                  v-model="form.password"
                  placeholder="Entre com sua senha"
                  :type="showPassword ? 'text' : 'password'"
                  :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append-inner="showPassword = !showPassword"
                  variant="outlined"
                  density="comfortable"
                  hide-details="auto"
                  :rules="[rules.required]"
                  class="custom-input"
                ></v-text-field>
              </div>

              <!-- Error Alert -->
              <v-alert v-if="errorMessage" type="error" variant="tonal" class="mb-4" closable>
                {{ errorMessage }}
              </v-alert>

              <!-- Login Button -->
              <v-btn
                type="submit"
                color="cyan-darken-2"
                size="large"
                block
                :loading="loading"
                class="text-uppercase letter-spacing-1 mb-6"
                elevation="0"
              >
                Login
              </v-btn>

              <!-- Divider -->
              <div class="d-flex align-center my-6">
                <v-divider></v-divider>
                  <span class="text-grey text-body-2 mx-4 text-no-wrap">Entre com</span>
                <v-divider></v-divider>
              </div>

              <div class="d-flex">
                <v-btn
                  variant="outlined"
                  size="large"
                  class="flex-1-1 text-none mr-4"
                  @click="handleSocialLogin('google')"
                >
                  <v-icon start color="red">mdi-google</v-icon>
                  Google
                </v-btn>
                <v-btn
                  variant="outlined"
                  size="large"
                  class="flex-1-1 text-none"
                  @click="handleSocialLogin('facebook')"
                >
                  <v-icon start color="blue">mdi-facebook</v-icon>
                  Facebook
                </v-btn>
              </div>
            </v-form>

            <v-divider class="my-6"></v-divider>
            <div class="text-center text-caption text-grey">
              <div class="font-weight-medium mb-1">Credenciais de desenvolvimento:</div>
              <div>Email: admin@edtech.com</div>
              <div>Senha: 123456</div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  </div>
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

const handleSocialLogin = (provider: string) => {
  // Implementação futura de login social
  console.log(`Login com ${provider} - Em desenvolvimento`)
}
</script>

<style scoped>
.login-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-image: url('/login-background.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.login-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.1);
  pointer-events: none;
}
</style>
