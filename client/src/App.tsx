import React from 'react'
import ClientsList from './components/ClientsList'
import CreateClientForm from './components/CreateClientForm'

export default function App() {
  return (
    <div className="container">
      <h1>Client Management</h1>
      <ClientsList />
      <CreateClientForm />
    </div>
  )
}
