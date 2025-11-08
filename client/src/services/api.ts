import axios from 'axios'

/**
 * Simple Axios instance and clientsService.
 * baseURL resolution: prefer VITE_API_HOST (build-time), then localStorage key 'apiHost', then localhost fallback.
 */
function getBaseURL() {
  // Vite exposes env vars starting with VITE_ via import.meta.env
  // Note: during development import.meta.env.VITE_API_HOST may be undefined
  // Use a runtime fallback to localStorage to make development easy across machines.
  // Example VITE_API_HOST: "http://192.168.1.50:4000"
  // Example localStorage: localStorage.setItem('apiHost', '192.168.1.50') => will use http://<host>:4000
  // Keep simple: if VITE_API_HOST present, use it verbatim; otherwise try localStorage
  // and build a http://<host>:4000 string.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const viteHost = (import.meta as any).env?.VITE_API_HOST
  if (viteHost) return viteHost

  const stored = typeof window !== 'undefined' ? localStorage.getItem('apiHost') : null
  if (stored) {
    // stored can be either with protocol or just IP. Accept both.
    if (stored.startsWith('http')) return stored
    return `http://${stored}:4000`
  }

  return 'http://localhost:4000'
}

const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 8000,
})

export const clientsService = {
  getAll: async () => {
    const res = await api.get('/api/clients')
    return res.data
  },
  getOne: async (id: number) => {
    const res = await api.get(`/api/clients/${id}`)
    return res.data
  },
  create: async (payload: { name: string; email?: string; phone?: string }) => {
    const res = await api.post('/api/clients', payload)
    return res.data
  },
  update: async (id: number, payload: { name?: string; email?: string; phone?: string }) => {
    const res = await api.put(`/api/clients/${id}`, payload)
    return res.data
  },
  remove: async (id: number) => {
    const res = await api.delete(`/api/clients/${id}`)
    return res.data
  },
}

export default api
