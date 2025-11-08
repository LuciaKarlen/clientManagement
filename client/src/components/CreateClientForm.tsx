import React, { useState } from 'react'
import { clientsService } from '../services/api'

type Props = {
  onCreated?: () => void
}

export default function CreateClientForm({ onCreated }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!name) return alert('El nombre es requerido')
    setLoading(true)
    try {
      await clientsService.create({ name, email, phone })
      setName('')
      setEmail('')
      setPhone('')
      if (onCreated) onCreated()
      else window.location.reload()
    } catch (err) {
      console.error(err)
      alert('Error al crear cliente')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section>
      <h2>Agregar cliente</h2>
      <form onSubmit={submit}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Nombre" required />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Teléfono" />
        <button type="submit" disabled={loading}>{loading ? 'Guardando...' : 'Crear'}</button>
      </form>
    </section>
  )
}
