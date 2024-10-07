import { ref } from 'vue'
import {
  createApplication,
  deleteApplication,
  getApplications,
  updateApplication
} from '@/services/api'

export function useApplications() {
  const apps = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchApps = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await getApplications()

      apps.value = response
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  const addApp = async (newApp) => {
    loading.value = true
    error.value = null

    try {
      const response = await createApplication(newApp)
      apps.value.push(response)
      console.log(response, apps.value)
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  const updateApp = async (appId, updatedApp) => {
    loading.value = true
    error.value = null

    try {
      const response = await updateApplication(appId, updatedApp)
      const index = apps.value.findIndex((app) => app.id === appId)
      if (index !== -1) {
        apps.value[index] = response
      }
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  const deleteApp = async (appId) => {
    loading.value = true
    error.value = null

    try {
      await deleteApplication(appId)
      apps.value = apps.value.filter((app) => app.id !== appId)
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  return {
    apps,
    loading,
    error,
    fetchApps,
    addApp,
    updateApp,
    deleteApp
  }
}
