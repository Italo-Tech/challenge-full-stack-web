<template>
  <v-app>
    <v-app-bar v-if="authStore.isAuthenticated" color="primary" elevation="2">
      <v-app-bar-title>
        <v-icon class="mr-2">mdi-school</v-icon>
        Edtech - Sistema Acadêmico
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <v-chip class="mr-4" v-if="authStore.user">
        <v-icon start>mdi-account</v-icon>
        {{ authStore.user.name }}
      </v-chip>

      <v-btn icon @click="handleLogout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-if="authStore.isAuthenticated" permanent width="260">
      <v-list density="compact" nav>
        <v-list-item 
          to="/students" 
          prepend-icon="mdi-account-group" 
          title="Alunos"
          value="students"
        ></v-list-item>
        <v-list-item 
          to="/courses" 
          prepend-icon="mdi-book-open-variant" 
          title="Cursos"
          value="courses"
        ></v-list-item>
        <v-list-item 
          to="/classes" 
          prepend-icon="mdi-google-classroom" 
          title="Turmas"
          value="classes"
        ></v-list-item>
        <v-list-item 
          to="/enrollments" 
          prepend-icon="mdi-clipboard-text" 
          title="Matrículas"
          value="enrollments"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>
