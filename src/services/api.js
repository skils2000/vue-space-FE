import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001/api/',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const getApplications = async () => {
  const response = await api.get('applications/')
  return response.data
}

export const createApplication = async (app) => {
  const response = await api.post('applications/', app)
  return response.data
}

export const updateApplication = async (id, app) => {
  const response = await api.put(`applications/${id}/`, app)
  return response.data
}

export const deleteApplication = async (id) => {
  await api.delete(`applications/${id}/`)
}

export const getVirtualMachines = async () => {
  const response = await api.get('virtualmachines/')
  return response.data = response.data
}
