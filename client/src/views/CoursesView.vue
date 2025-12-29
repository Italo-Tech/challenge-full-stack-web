<template>
  <div>
    <v-row class="mb-4" align="center">
      <v-col>
        <h1 class="text-h6">
          <v-icon class="mr-2">mdi-book-open-variant</v-icon>
          Gerenciar Cursos
        </h1>
      </v-col>
      <v-col class="text-right">
        <v-btn color="cyan-darken-3" @click="openCreateDialog" prepend-icon="mdi-plus">
          Cadastrar Curso
        </v-btn>
      </v-col>
    </v-row>

    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          label="Buscar curso"
          variant="outlined"
          density="compact"
          hide-details
          clearable
        ></v-text-field>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="courseStore.courses"
        :search="search"
        :loading="courseStore.loading"
        items-per-page="10"
        class="elevation-1"
        hover
      >
        <template v-slot:item.name="{ item }">
          <div class="d-flex align-center py-2">
            <span class="font-weight-medium">{{ item.name }}</span>
          </div>
        </template>

        <template v-slot:item.description="{ item }">
          <div class="text-body-2">
            {{ item.description || '-' }}
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
            <v-icon size="64" color="grey-lighten-1">mdi-book-off-outline</v-icon>
            <p class="text-h6 text-grey mt-4">Nenhum curso encontrado</p>
            <p class="text-body-2 text-grey-darken-1">Cadastre o primeiro curso clicando no botão acima</p>
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
          {{ isEditing ? 'mdi-book-edit' : 'mdi-book-plus' }}
          </v-icon>
        </v-avatar>
        <div>
          <span class="text-h6 grey-darken-3 font-weight-bold">
          {{ isEditing ? 'Editar Curso' : 'Novo Curso' }}
          </span>
          <div class="text-caption grey-darken-3 opacity-90">
          {{ isEditing ? 'Atualize as informações do curso' : 'Preencha os dados do novo curso' }}
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
                <v-icon size="small" class="mr-1">mdi-book-open-page-variant</v-icon>
                Informações do Curso
              </div>
              
              <v-text-field
                v-model="form.name"
                label="Nome do curso"
                :rules="[rules.required]"
                variant="outlined"
                density="comfortable"
                prepend-inner-icon="mdi-book-open-variant"
                color="cyan-darken-3"
                placeholder="Ex: Engenharia de Software"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-textarea
                v-model="form.description"
                label="Descrição"
                variant="outlined"
                density="comfortable"
                prepend-inner-icon="mdi-text"
                color="cyan-darken-3"
                placeholder="Descreva o curso (opcional)"
                rows="4"
                auto-grow
              ></v-textarea>
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
        :loading="courseStore.loading"
        class="px-4"
        >
        <v-icon start>{{ isEditing ? 'mdi-content-save' : 'mdi-check' }}</v-icon>
        {{ isEditing ? 'Atualizar' : 'Cadastrar' }}
        </v-btn>
      </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialog" max-width="500">
      <v-card>
        <v-card-title class="bg-error">
          <span class="text-h5 text-white">Confirmar Exclusão</span>
        </v-card-title>

        <v-card-text class="pt-6">
          <p>Tem certeza que deseja excluir o curso <strong>{{ courseToDelete?.name }}</strong>?</p>
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
            :loading="courseStore.loading"
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
import { useCourseStore } from '@/stores/course'
import type { Course } from '@/types'

const courseStore = useCourseStore()

const search = ref('')
const dialog = ref(false)
const deleteDialog = ref(false)
const isEditing = ref(false)
const formRef = ref()
const courseToDelete = ref<Course | null>(null)

const headers = [
  { title: 'Nome', key: 'name', sortable: true },
  { title: 'Descrição', key: 'description', sortable: true },
  { title: 'Ações', key: 'actions', sortable: false },
]

const form = reactive({
  id: '',
  name: '',
  description: '',
})

const snackbar = reactive({
  show: false,
  message: '',
  color: 'success',
})

const rules = {
  required: (v: string) => !!v || 'Campo obrigatório',
}

onMounted(() => {
  loadCourses()
})

const loadCourses = async () => {
  try {
    await courseStore.fetchCourses()
  } catch (error: any) {
    showSnackbar(error.response?.data?.message || 'Erro ao carregar cursos', 'error')
  }
}

const openCreateDialog = () => {
  isEditing.value = false
  resetForm()
  dialog.value = true
}

const openEditDialog = (course: Course) => {
  isEditing.value = true
  form.id = course.id
  form.name = course.name
  form.description = course.description || ''
  dialog.value = true
}

const openDeleteDialog = (course: Course) => {
  courseToDelete.value = course
  deleteDialog.value = true
}

const closeDialog = () => {
  dialog.value = false
  resetForm()
}

const closeDeleteDialog = () => {
  deleteDialog.value = false
  courseToDelete.value = null
}

const resetForm = () => {
  form.id = ''
  form.name = ''
  form.description = ''
  formRef.value?.reset()
}

const handleSave = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  try {
    if (isEditing.value) {
      await courseStore.updateCourse(form.id, {
        name: form.name,
        description: form.description || undefined,
      })
      showSnackbar('Curso atualizado com sucesso!', 'success')
    } else {
      await courseStore.createCourse({
        name: form.name,
        description: form.description || undefined,
      })
      showSnackbar('Curso cadastrado com sucesso!', 'success')
    }
    closeDialog()
  } catch (error: any) {
    showSnackbar(error.response?.data?.message || 'Erro ao salvar curso', 'error')
  }
}

const handleDelete = async () => {
  if (!courseToDelete.value) return

  try {
    await courseStore.deleteCourse(courseToDelete.value.id)
    showSnackbar('Curso excluído com sucesso!', 'success')
    closeDeleteDialog()
  } catch (error: any) {
    showSnackbar(error.response?.data?.message || 'Erro ao excluir curso', 'error')
  }
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('pt-BR')
}

const showSnackbar = (message: string, color: string) => {
  snackbar.message = message
  snackbar.color = color
  snackbar.show = true
}
</script>

