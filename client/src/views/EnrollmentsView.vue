<template>
  <div>
    <v-row class="mb-4" align="center">
      <v-col>
        <h1 class="text-h6">
          <v-icon class="mr-2">mdi-clipboard-text</v-icon>
          Gerenciar Matrículas
        </h1>
      </v-col>
      <v-col class="text-right">
        <v-btn color="cyan-darken-3" @click="openCreateDialog" prepend-icon="mdi-plus">
          Nova Matrícula
        </v-btn>
      </v-col>
    </v-row>

    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          label="Buscar matrícula"
          variant="outlined"
          density="compact"
          hide-details
          clearable
        ></v-text-field>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="enrollmentStore.enrollments"
        :search="search"
        :loading="enrollmentStore.loading"
        items-per-page="10"
        class="elevation-1"
        hover
      >
        <template v-slot:item.student="{ item }">
          <div class="d-flex align-center py-2">
            <v-avatar color="cyan-darken-3" size="32" class="mr-3">
              <span class="text-white text-caption">{{ item.student?.name.charAt(0).toUpperCase() }}</span>
            </v-avatar>
            <div>
              <div class="font-weight-medium">{{ item.student?.name }}</div>
              <div class="text-caption text-grey">{{ item.student?.ra }}</div>
            </div>
          </div>
        </template>

        <template v-slot:item.class="{ item }">
          <div class="text-body-2">
            <div class="font-weight-medium">{{ item.class?.name }}</div>
            <div class="text-caption text-grey">
              <v-icon size="small" class="mr-1">mdi-book-open-variant</v-icon>
              {{ item.class?.course?.name }}
            </div>
          </div>
        </template>

        <template v-slot:item.enrolledAt="{ item }">
          <v-chip size="small" color="info" variant="tonal">
            {{ formatDateToBrazilian(item.enrolledAt) }}
          </v-chip>
        </template>

        <template v-slot:item.status="{ item }">
          <v-chip
            size="small"
            :color="item.status === 'ACTIVE' ? 'success' : 'error'"
            variant="tonal"
          >
            {{ item.status === 'ACTIVE' ? 'Ativa' : 'Cancelada' }}
          </v-chip>
        </template>

        <template v-slot:item.actions="{ item }">
          <div class="d-flex gap-1">
            <v-tooltip text="Cancelar" location="top" v-if="item.status === 'ACTIVE'">
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  icon="mdi-cancel"
                  size="small"
                  variant="tonal"
                  color="warning"
                  @click="openCancelDialog(item)"
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
            <v-icon size="64" color="grey-lighten-1">mdi-clipboard-text</v-icon>
            <p class="text-h6 text-grey mt-4">Nenhuma matrícula encontrada</p>
            <p class="text-body-2 text-grey-darken-1">Cadastre a primeira matrícula clicando no botão acima</p>
          </div>
        </template>

        <template v-slot:loading>
          <v-skeleton-loader type="table-row@5"></v-skeleton-loader>
        </template>
      </v-data-table>
    </v-card>

    <!-- Create Dialog -->
    <v-dialog v-model="dialog" max-width="700" persistent>
      <v-card class="rounded-lg" elevation="8">
        <v-card-title class="bg-gradient-to-r from-primary to-primary-darken-1 px-6 py-3">
          <div class="d-flex align-center">
            <v-avatar color="white" size="30" class="mr-4">
              <v-icon color="cyan-darken-3" size="28">mdi-clipboard-text</v-icon>
            </v-avatar>
            <div>
              <span class="text-h6 grey-darken-3 font-weight-bold">Nova Matrícula</span>
              <div class="text-caption grey-darken-3 opacity-90">Matricule um aluno em uma turma</div>
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
                  Informações da Matrícula
                </div>
                
                <v-select
                  v-model="form.studentId"
                  :items="students"
                  item-title="name"
                  item-value="id"
                  label="Aluno"
                  :rules="[rules.required]"
                  variant="outlined"
                  density="comfortable"
                  prepend-inner-icon="mdi-account"
                  color="cyan-darken-3"
                  :loading="loadingStudents"
                >
                  <template v-slot:item="{ props, item }">
                    <v-list-item v-bind="props" :subtitle="item.raw.ra"></v-list-item>
                  </template>
                </v-select>
              </v-col>

              <v-col cols="12">
                <v-select
                  v-model="form.classId"
                  :items="classes"
                  item-title="name"
                  item-value="id"
                  label="Turma"
                  :rules="[rules.required]"
                  variant="outlined"
                  density="comfortable"
                  prepend-inner-icon="mdi-google-classroom"
                  color="cyan-darken-3"
                  :loading="loadingClasses"
                >
                  <template v-slot:item="{ props, item }">
                    <v-list-item v-bind="props" :subtitle="item.raw.course?.name"></v-list-item>
                  </template>
                </v-select>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="pa-6">
          <v-spacer></v-spacer>
          <v-btn color="grey-darken-1" variant="outlined" @click="closeDialog" class="px-4">
            <v-icon start>mdi-close</v-icon>
            Cancelar
          </v-btn>
          <v-btn
            color="cyan-darken-3"
            variant="elevated"
            @click="handleSave"
            :loading="enrollmentStore.loading"
            class="px-4"
          >
            <v-icon start>mdi-check</v-icon>
            Matricular
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Cancel Confirmation Dialog -->
    <v-dialog v-model="cancelDialog" max-width="500">
      <v-card>
        <v-card-title class="bg-warning">
          <span class="text-h5 text-white">Cancelar Matrícula</span>
        </v-card-title>

        <v-card-text class="pt-6">
          <p>Tem certeza que deseja cancelar a matrícula de <strong>{{ enrollmentToCancel?.student?.name }}</strong> na turma <strong>{{ enrollmentToCancel?.class?.name }}</strong>?</p>
          <p class="text-caption text-warning mt-2">Esta ação não pode ser desfeita.</p>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" variant="text" @click="closeCancelDialog">
            Fechar
          </v-btn>
          <v-btn
            color="warning"
            variant="elevated"
            @click="handleCancel"
            :loading="enrollmentStore.loading"
          >
            Cancelar Matrícula
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
          <p>Tem certeza que deseja excluir a matrícula de <strong>{{ enrollmentToDelete?.student?.name }}</strong> na turma <strong>{{ enrollmentToDelete?.class?.name }}</strong>?</p>
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
            :loading="enrollmentStore.loading"
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
import { useEnrollmentStore } from '@/stores/enrollment'
import { useStudentStore } from '@/stores/student'
import { useClassStore } from '@/stores/class'
import type { Enrollment, Student, Class } from '@/types'

const enrollmentStore = useEnrollmentStore()
const studentStore = useStudentStore()
const classStore = useClassStore()

const search = ref('')
const dialog = ref(false)
const cancelDialog = ref(false)
const deleteDialog = ref(false)
const formRef = ref()
const enrollmentToCancel = ref<Enrollment | null>(null)
const enrollmentToDelete = ref<Enrollment | null>(null)
const students = ref<Student[]>([])
const classes = ref<Class[]>([])
const loadingStudents = ref(false)
const loadingClasses = ref(false)

const headers = [
  { title: 'Aluno', key: 'student', sortable: true },
  { title: 'Turma', key: 'class', sortable: true },
  { title: 'Data de Matrícula', key: 'enrolledAt', sortable: true },
  { title: 'Status', key: 'status', sortable: true },
  { title: 'Ações', key: 'actions', sortable: false, align: 'center' as const },
]

const form = reactive({
  studentId: '',
  classId: '',
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
  loadEnrollments()
  loadStudents()
  loadClasses()
})

const loadEnrollments = async () => {
  try {
    await enrollmentStore.fetchEnrollments()
  } catch (error: any) {
    showSnackbar(error.response?.data?.message || 'Erro ao carregar matrículas', 'error')
  }
}

const loadStudents = async () => {
  loadingStudents.value = true
  try {
    await studentStore.fetchStudents()
    students.value = studentStore.students
  } catch (error: any) {
    showSnackbar(error.response?.data?.message || 'Erro ao carregar alunos', 'error')
  } finally {
    loadingStudents.value = false
  }
}

const loadClasses = async () => {
  loadingClasses.value = true
  try {
    await classStore.fetchClasses()
    classes.value = classStore.classes
  } catch (error: any) {
    showSnackbar(error.response?.data?.message || 'Erro ao carregar turmas', 'error')
  } finally {
    loadingClasses.value = false
  }
}

const openCreateDialog = () => {
  resetForm()
  dialog.value = true
}

const openCancelDialog = (enrollment: Enrollment) => {
  enrollmentToCancel.value = enrollment
  cancelDialog.value = true
}

const openDeleteDialog = (enrollment: Enrollment) => {
  enrollmentToDelete.value = enrollment
  deleteDialog.value = true
}

const closeDialog = () => {
  dialog.value = false
  resetForm()
}

const closeCancelDialog = () => {
  cancelDialog.value = false
  enrollmentToCancel.value = null
}

const closeDeleteDialog = () => {
  deleteDialog.value = false
  enrollmentToDelete.value = null
}

const resetForm = () => {
  form.studentId = ''
  form.classId = ''
  formRef.value?.reset()
}

const handleSave = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  try {
    await enrollmentStore.createEnrollment({
      studentId: form.studentId,
      classId: form.classId,
    })
    showSnackbar('Matrícula cadastrada com sucesso!', 'success')
    closeDialog()
  } catch (error: any) {
    showSnackbar(error.response?.data?.message || 'Erro ao salvar matrícula', 'error')
  }
}

const handleCancel = async () => {
  if (!enrollmentToCancel.value) return

  try {
    await enrollmentStore.cancelEnrollment(enrollmentToCancel.value.id)
    showSnackbar('Matrícula cancelada com sucesso!', 'success')
    closeCancelDialog()
  } catch (error: any) {
    showSnackbar(error.response?.data?.message || 'Erro ao cancelar matrícula', 'error')
  }
}

const handleDelete = async () => {
  if (!enrollmentToDelete.value) return

  try {
    await enrollmentStore.deleteEnrollment(enrollmentToDelete.value.id)
    showSnackbar('Matrícula excluída com sucesso!', 'success')
    closeDeleteDialog()
  } catch (error: any) {
    showSnackbar(error.response?.data?.message || 'Erro ao excluir matrícula', 'error')
  }
}

const showSnackbar = (message: string, color: string) => {
  snackbar.message = message
  snackbar.color = color
  snackbar.show = true
}

// Função para formatar data ISO para DD/MM/YYYY
const formatDateToBrazilian = (dateString: string): string => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR')
}
</script>
