<template>
  <div>
    <v-row class="mb-4" align="center">
      <v-col>
        <h1 class="text-h6">
          <v-icon class="mr-2">mdi-account-group</v-icon>
          Gerenciar Alunos
        </h1>
      </v-col>
      <v-col class="text-right">
        <v-btn color="cyan-darken-3" @click="openCreateDialog" prepend-icon="mdi-plus">
          Cadastrar Aluno
        </v-btn>
      </v-col>
    </v-row>

    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          label="Buscar aluno"
          variant="outlined"
          density="compact"
          hide-details
          clearable
        ></v-text-field>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="studentStore.students"
        :search="search"
        :loading="studentStore.loading"
        items-per-page="10"
        class="elevation-1"
        hover
      >
        <template v-slot:item.name="{ item }">
          <div class="d-flex align-center py-2">
            <v-avatar color="cyan-darken-3" size="32" class="mr-3">
              <span class="text-white text-caption">{{ item.name.charAt(0).toUpperCase() }}</span>
            </v-avatar>
            <span class="font-weight-medium">{{ item.name }}</span>
          </div>
        </template>

        <template v-slot:item.email="{ item }">
          <div class="text-body-2">
            <v-icon size="small" class="mr-1" color="grey">mdi-email-outline</v-icon>
            {{ item.email }}
          </div>
        </template>

        <template v-slot:item.ra="{ item }">
          <v-chip size="small" color="cyan-darken-3" variant="tonal">
            {{ item.ra }}
          </v-chip>
        </template>

        <template v-slot:item.cpf="{ item }">
          <span class="text-body-2 font-mono">{{ formatCPF(item.cpf) }}</span>
        </template>

        <template v-slot:item.createdAt="{ item }">
          <div class="text-body-2">
            <v-icon size="small" class="mr-1" color="grey">mdi-calendar</v-icon>
            {{ formatDate(item.createdAt) }}
          </div>
        </template>

        <template v-slot:item.actions="{ item }">
          <div class="d-flex gap-1">
            <v-tooltip text="Editar" location="top">
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  icon="mdi-pencil"
                  size="small"
                  variant="tonal"
                  color="cyan-darken-3"
                  @click="openEditDialog(item)"
                  class="mr-2"
                ></v-btn>
              </template>
            </v-tooltip>
            <v-tooltip text="Excluir" location="top">
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  icon="mdi-delete"
                  size="small"
                  variant="tonal"
                  color="error"
                  @click="openDeleteDialog(item)"
                ></v-btn>
              </template>
            </v-tooltip>
          </div>
        </template>

        <template v-slot:no-data>
          <div class="text-center py-8">
            <v-icon size="64" color="grey-lighten-1">mdi-account-off-outline</v-icon>
            <p class="text-h6 text-grey mt-4">Nenhum aluno encontrado</p>
            <p class="text-body-2 text-grey-darken-1">Cadastre o primeiro aluno clicando no botão acima</p>
          </div>
        </template>

        <template v-slot:loading>
          <v-skeleton-loader type="table-row@5"></v-skeleton-loader>
        </template>
      </v-data-table>
    </v-card>

    <!-- Create/Edit Dialog -->
    <v-dialog v-model="dialog" max-width="700" persistent>
      <v-card class="rounded-lg" elevation="8">
      <v-card-title class="bg-gradient-to-r from-primary to-primary-darken-1 px-6 py-3">
        <div class="d-flex align-center">
        <v-avatar color="white" size="30" class="mr-4">
          <v-icon color="cyan-darken-3" size="28">
          {{ isEditing ? 'mdi-account-edit' : 'mdi-account-plus' }}
          </v-icon>
        </v-avatar>
        <div>
          <span class="text-h6 grey-darken-3 font-weight-bold">
          {{ isEditing ? 'Editar Aluno' : 'Novo Aluno' }}
          </span>
          <div class="text-caption grey-darken-3 opacity-90">
          {{ isEditing ? 'Atualize as informações do aluno' : 'Preencha os dados do novo aluno' }}
          </div>
        </div>
        </div>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text class="px-6">
        <v-form ref="formRef" @submit.prevent="handleSave">
          <v-row>
            <v-col cols="12">
              <div class="text-subtitle-2 text-medium-emphasis mb-4">
                <v-icon size="small" class="mr-1">mdi-account-circle</v-icon>
                Informações Pessoais
              </div>
              
              <v-text-field
                v-model="form.name"
                label="Nome completo"
                :rules="[rules.required]"
                variant="outlined"
                density="comfortable"
                prepend-inner-icon="mdi-account"
                color="cyan-darken-3"
                placeholder="Ex: João Silva"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="form.email"
                label="E-mail"
                type="email"
                :rules="[rules.required, rules.email]"
                variant="outlined"
                density="comfortable"
                prepend-inner-icon="mdi-email"
                color="cyan-darken-3"
                placeholder="Ex: joao.silva@email.com"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-divider class="my-2"></v-divider>
              <div class="text-subtitle-2 text-medium-emphasis mt-4">
                <v-icon size="small" class="mr-1">mdi-card-account-details</v-icon>
                Documentos
              </div>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.ra"
                label="RA (Registro Acadêmico)"
                :rules="[rules.required, rules.ra]"
                variant="outlined"
                density="comfortable"
                prepend-inner-icon="mdi-identifier"
                color="cyan-darken-3"
                :disabled="isEditing"
                persistent-hint
                maxlength="9"
                placeholder="Ex: 123456"
                hint="Máximo 9 caracteres"
              >
              </v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.cpf"
                label="CPF"
                :rules="[rules.required, rules.cpf]"
                variant="outlined"
                density="comfortable"
                prepend-inner-icon="mdi-card-account-details"
                color="cyan-darken-3"
                :disabled="isEditing"
                persistent-hint
                maxlength="14"
                placeholder="000.000.000-00"
                hint="Formato: 000.000.000-00"
                @input="formatCPFInput"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="pa-6">
        <v-spacer></v-spacer>
        <v-btn
        color="grey-darken-1"
        variant="outlined"
        @click="closeDialog"
        class="px-4"
        >
        <v-icon start>mdi-close</v-icon>
        Cancelar
        </v-btn>
        <v-btn
        color="cyan-darken-3"
        variant="elevated"
        @click="handleSave"
        :loading="studentStore.loading"
        class="px-4"
        >
        <v-icon start>{{ isEditing ? 'mdi-content-save' : 'mdi-check' }}</v-icon>
        {{ isEditing ? 'Atualizar' : 'Cadastrar' }}
        </v-btn>
      </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="deleteDialog" max-width="500">
      <v-card>
        <v-card-title class="bg-error">
          <span class="text-h5 text-white">Confirmar Exclusão</span>
        </v-card-title>

        <v-card-text class="pt-6">
          <p>Tem certeza que deseja excluir o aluno <strong>{{ studentToDelete?.name }}</strong>?</p>
          <p class="text-caption text-error mt-2">Esta ação não pode ser desfeita.</p>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" variant="text" @click="closeDeleteDialog">
            Cancelar
          </v-btn>
          <v-btn
            color="error"
            variant="elevated"
            @click="handleDelete"
            :loading="studentStore.loading"
          >
            Excluir
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbar for notifications -->
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="3000">
      {{ snackbar.message }}
      <template v-slot:actions>
        <v-btn variant="text" @click="snackbar.show = false">Fechar</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useStudentStore } from '@/stores/student'
import type { Student } from '@/types'

const studentStore = useStudentStore()

const search = ref('')
const dialog = ref(false)
const deleteDialog = ref(false)
const isEditing = ref(false)
const formRef = ref()
const studentToDelete = ref<Student | null>(null)

const headers = [
  { title: 'Nome', key: 'name', sortable: true },
  { title: 'Email', key: 'email', sortable: true },
  { title: 'RA', key: 'ra', sortable: true },
  { title: 'CPF', key: 'cpf', sortable: true },
  { title: 'Data de Cadastro', key: 'createdAt', sortable: true },
  { title: 'Ações', key: 'actions', sortable: false, align: 'center' as const },
]

const form = reactive({
  id: '',
  name: '',
  email: '',
  ra: '',
  cpf: '',
})

const snackbar = reactive({
  show: false,
  message: '',
  color: 'success',
})

const rules = {
  required: (v: string) => !!v || 'Campo obrigatório',
  email: (v: string) => /.+@.+\..+/.test(v) || 'Email inválido',
  cpf: (v: string) => {
    const numbers = v.replace(/\D/g, '')
    return numbers.length === 11 || 'CPF deve ter 11 dígitos'
  },
  ra: (v: string) => v.length <= 9 || 'RA deve ter no máximo 9 caracteres',
}

onMounted(() => {
  loadStudents()
})

const loadStudents = async () => {
  try {
    await studentStore.fetchStudents()
  } catch (error: any) {
    showSnackbar(error.response?.data?.message || 'Erro ao carregar alunos', 'error')
  }
}

const openCreateDialog = () => {
  isEditing.value = false
  resetForm()
  dialog.value = true
}

const openEditDialog = (student: Student) => {
  isEditing.value = true
  form.id = student.id
  form.name = student.name
  form.email = student.email
  form.ra = student.ra
  form.cpf = formatCPF(student.cpf)
  dialog.value = true
}

const openDeleteDialog = (student: Student) => {
  studentToDelete.value = student
  deleteDialog.value = true
}

const closeDialog = () => {
  dialog.value = false
  resetForm()
}

const closeDeleteDialog = () => {
  deleteDialog.value = false
  studentToDelete.value = null
}

const resetForm = () => {
  form.id = ''
  form.name = ''
  form.email = ''
  form.ra = ''
  form.cpf = ''
  formRef.value?.reset()
}

const handleSave = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  try {
    if (isEditing.value) {
      await studentStore.updateStudent(form.id, {
        name: form.name,
        email: form.email,
      })
      showSnackbar('Aluno atualizado com sucesso!', 'success')
    } else {
      const cpfNumbers = form.cpf.replace(/\D/g, '')
      await studentStore.createStudent({
        name: form.name,
        email: form.email,
        ra: form.ra,
        cpf: cpfNumbers,
      })
      showSnackbar('Aluno cadastrado com sucesso!', 'success')
    }
    closeDialog()
  } catch (error: any) {
    showSnackbar(error.response?.data?.message || 'Erro ao salvar aluno', 'error')
  }
}

const handleDelete = async () => {
  if (!studentToDelete.value) return

  try {
    await studentStore.deleteStudent(studentToDelete.value.id)
    showSnackbar('Aluno excluído com sucesso!', 'success')
    closeDeleteDialog()
  } catch (error: any) {
    showSnackbar(error.response?.data?.message || 'Erro ao excluir aluno', 'error')
  }
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('pt-BR')
}

const formatCPF = (cpf: string) => {
  const numbers = cpf.replace(/\D/g, '')
  return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

const formatCPFInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  let value = input.value.replace(/\D/g, '')
  
  if (value.length > 11) {
    value = value.slice(0, 11)
  }
  
  if (value.length > 9) {
    form.cpf = value.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4')
  } else if (value.length > 6) {
    form.cpf = value.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3')
  } else if (value.length > 3) {
    form.cpf = value.replace(/(\d{3})(\d{0,3})/, '$1.$2')
  } else {
    form.cpf = value
  }
}

const showSnackbar = (message: string, color: string) => {
  snackbar.message = message
  snackbar.color = color
  snackbar.show = true
}
</script>
