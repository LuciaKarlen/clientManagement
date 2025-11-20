// Validaciones reutilizables para el backend
// exporta funciones que retornan true/false

function normalizeDigits(value) {
  if (value == null) return ''
  return String(value).replace(/\D+/g, '')
}

function validateCuit(cuit) {
  const digits = normalizeDigits(cuit)
  // Validamos que tenga exactamente 11 dígitos (regla básica)
  if (!digits) return false
  if (!/^\d{11}$/.test(digits)) return false

  return true
}

function validatePhone(phone) {
  if (!phone && phone !== 0) return false
  const digits = normalizeDigits(phone)
  // Aceptar números razonables: mínimo 6 y máximo 15 dígitos
  if (digits.length < 10 || digits.length > 15) return false
  return true
}

function validateName(name) {
  if (name == null) return false
  const s = String(name).trim()
  if (s.length === 0) return false
  if (s.length > 100) return false
  return true
}

module.exports = {
  validateCuit,
  validatePhone,
  validateName,
}
