<template>
  <div>
    <v-row class="mb-4" align="center">
      <v-col>
        <h1 class="text-h6">
          <v-icon class="mr-2">mdi-google-classroom</v-icon>
          Gerenciar Turmas
        </h1>
      </v-col>
      <v-col class="text-right">
        <v-btn color="cyan-darken-3" @click="openCreateDialog" prepend-icon="mdi-plus">
          Cadastrar Turma
        </v-btn>
      </v-col>
    </v-row>

    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          label="Buscar turma"
          variant="outlined"
          density="compact"
          hide-details
          clearable
        ></v-text-field>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="classStore.classes"
        :search="search"
        :loading="classStore.loading"
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

        <template v-slot:item.course="{ item }">
          <div class="text-body-2">
            <v-icon size="small" class="mr-1" color="grey">mdi-book-open-variant</v-icon>
            {{ item.course?.name || '-' }}
          </div>
        </template>

        <template v-slot:item.enrollments="{ item }">
          <v-chip size="small" color="primary" variant="tonal">
            <v-icon start size="small">mdi-account-group</v-icon>
            {{ item.enrollments?.length || 0 }}
          </v-chip>
        </template>

        <template v-slot:item.startDate="{ item }">
          <v-chip size="small" color="success" variant="tonal">
            {{ formatDateToBrazilian(item.startDate) }}
          </v-chip>
        </template>

        <template v-slot:item.endDate="{ item }">
          <v-chip size="small" color="error" variant="tonal">
            {{ formatDateToBrazilian(item.endDate) }}
          </v-chip>
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
            <v-icon size="64" color="grey-lighten-1">mdi-google-classroom</v-icon>
            <p class="text-h6 text-grey mt-4">Nenhuma turma encontrada</p>
            <p class="text-body-2 text-grey-darken-1">Cadastre a primeira turma clicando no botão acima</p>
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
          {{ isEditing ? 'mdi-google-classroom' : 'mdi-google-classroom' }}
          </v-icon>
        </v-avatar>
        <div>
          <span class="text-h6 grey-darken-3 font-weight-bold">
          {{ isEditing ? 'Editar Turma' : 'Nova Turma' }}
          </span>
          <div class="text-caption grey-darken-3 opacity-90">
          {{ isEditing ? 'Atualize as informações da turma' : 'Preencha os dados da nova turma' }}
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
                <v-icon size="small" class="mr-1">mdi-information</v-icon>
                Informações da Turma
              </div>
              
              <v-text-field
                v-model="form.name"
                label="Nome da turma"
                :rules="[rules.required]"
                variant="outlined"
                density="comfortable"
                prepend-inner-icon="mdi-google-classroom"
                color="cyan-darken-3"
                placeholder="Ex: Turma A - 2026"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-select
                v-model="form.courseId"
                :items="courses"
                item-title="name"
                item-value="id"
                label="Curso"
                :rules="[rules.required]"
                variant="outlined"
                density="comfortable"
                prepend-inner-icon="mdi-book-open-variant"
                color="cyan-darken-3"
                :disabled="isEditing"
                :loading="loadingCourses"
              ></v-select>
            </v-col>

            <v-col cols="12">
              <v-divider class="my-2"></v-divider>
              <div class="text-subtitle-2 text-medium-emphasis mt-4">
                <v-icon size="small" class="mr-1">mdi-calendar-range</v-icon>
                Período
              </div>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.startDate"
                label="Data de início"
                type="date"
                :rules="[rules.required]"
                variant="outlined"
                density="comfortable"
                prepend-inner-icon="mdi-calendar-start"
                color="cyan-darken-3"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.endDate"
                label="Data de término"
                type="date"
                :rules="[rules.required, rules.endDateAfterStart]"
                variant="outlined"
                density="comfortable"
                prepend-inner-icon="mdi-calendar-end"
                color="cyan-darken-3"
              ></v-text-field>
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
        :loading="classStore.loading"
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
          <p>Tem certeza que deseja excluir a turma <strong>{{ classToDelete?.name }}</strong>?</p>
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
            :loading="classStore.loading"
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
import { useClassStore } from '@/stores/class'
import { useCourseStore } from '@/stores/course'
import type { Class, Course } from '@/types'

const classStore = useClassStore()
const courseStore = useCourseStore()

const search = ref('')
const dialog = ref(false)
const deleteDialog = ref(false)
const isEditing = ref(false)
const formRef = ref()
const classToDelete = ref<Class | null>(null)
const courses = ref<Course[]>([])
const loadingCourses = ref(false)

const headers = [
  { title: 'Nome', key: 'name', sortable: true },
  { title: 'Curso', key: 'course', sortable: true },
  { title: 'Alunos', key: 'enrollments', sortable: true, align: 'center' as const },
  { title: 'Data de Início', key: 'startDate', sortable: true },
  { title: 'Data de Término', key: 'endDate', sortable: true },
  { title: 'Ações', key: 'actions', sortable: false, align: 'center' as const },
]

const form = reactive({
  id: '',
  name: '',
  courseId: '',
  startDate: '',
  endDate: '',
})

const snackbar = reactive({
  show: false,
  message: '',
  color: 'success',
})

const rules = {
  required: (v: string) => !!v || 'Campo obrigatório',
  endDateAfterStart: (v: string) => {
    if (!form.startDate || !v) return true
    return new Date(v) > new Date(form.startDate) || 'Data de término deve ser posterior à data de início'
  },
}

onMounted(() => {
  loadClasses()
  loadCourses()
})

const loadClasses = async () => {
  try {
    await classStore.fetchClasses()
  } catch (error: any) {
    showSnackbar(error.response?.data?.message || 'Erro ao carregar turmas', 'error')
  }
}

const loadCourses = async () => {
  loadingCourses.value = true
  try {
    await courseStore.fetchCourses()
    courses.value = courseStore.courses
  } catch (error: any) {
    showSnackbar(error.response?.data?.message || 'Erro ao carregar cursos', 'error')
  } finally {
    loadingCourses.value = false
  }
}

const openCreateDialog = () => {
  isEditing.value = false
  resetForm()
  dialog.value = true
}

const openEditDialog = (classItem: Class) => {
  isEditing.value = true
  form.id = classItem.id
  form.name = classItem.name
  form.courseId = classItem.courseId
  // As datas já vem no formato YYYY-MM-DD do backend
  form.startDate = classItem.startDate
  form.endDate = classItem.endDate
  dialog.value = true
}

const openDeleteDialog = (classItem: Class) => {
  classToDelete.value = classItem
  deleteDialog.value = true
}

const closeDialog = () => {
  dialog.value = false
  resetForm()
}

const closeDeleteDialog = () => {
  deleteDialog.value = false
  classToDelete.value = null
}

const resetForm = () => {
  form.id = ''
  form.name = ''
  form.courseId = ''
  form.startDate = ''
  form.endDate = ''
  formRef.value?.reset()
}

const handleSave = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  try {
    if (isEditing.value) {
      await classStore.updateClass(form.id, {
        name: form.name,
        // Enviar as datas no formato YYYY-MM-DD (sem conversão para ISO)
        startDate: form.startDate,
        endDate: form.endDate,
      })
      showSnackbar('Turma atualizada com sucesso!', 'success')
    } else {
      await classStore.createClass({
        name: form.name,
        courseId: form.courseId,
        startDate: form.startDate,
        endDate: form.endDate,
      })
      showSnackbar('Turma cadastrada com sucesso!', 'success')
    }
    closeDialog()
  } catch (error: any) {
    showSnackbar(error.response?.data?.message || 'Erro ao salvar turma', 'error')
  }
}

const handleDelete = async () => {
  if (!classToDelete.value) return

  try {
    await classStore.deleteClass(classToDelete.value.id)
    showSnackbar('Turma excluída com sucesso!', 'success')
    closeDeleteDialog()
  } catch (error: any) {
    showSnackbar(error.response?.data?.message || 'Erro ao excluir turma', 'error')
  }
}

const showSnackbar = (message: string, color: string) => {
  snackbar.message = message
  snackbar.color = color
  snackbar.show = true
}

const formatDateToBrazilian = (dateString: string): string => {
  if (!dateString) return ''
  const [year, month, day] = dateString.split('-')
  return `${day}/${month}/${year}`
}
</script>
