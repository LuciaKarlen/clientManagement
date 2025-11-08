import React, { useEffect, useState } from 'react'
import { clientsService } from '../services/api'
import { Client } from '../types/Client'

export default function ClientsList() {
  const [clients, setClients] = useState<Client[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    clientsService.getAll()
      .then(data => {
        setClients(data)
        setError(null)
      })
      .catch((err) => {
        console.error(err)
        setError('No se pudieron cargar los clientes')
        setClients([])
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Cargando clientes...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>
  if (!clients || clients.length === 0) return <p>No hay clientes.</p>

  return (
    <section>
      <h2>Clientes</h2>
      <ul>
        {clients.map(c => (
          <li key={c.id}>{c.name}{c.email ? ` - ${c.email}` : ''}{c.phone ? ` - ${c.phone}` : ''}</li>
        ))}
      </ul>
    </section>
  )
}
