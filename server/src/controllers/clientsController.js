const clientModel = require('../models/client')
const { validateCuit, validatePhone, validateName } = require('../utils/validations')

exports.createClient = async (req, res, next) => {
	try {
		const { name, cuit, phone } = req.body

		if (!validateName(name)) return res.status(400).json({ error: 'Name is required and must be less than 100 characters' })

		if (cuit && !validateCuit(cuit)) {
			return res.status(400).json({ error: 'CUIT is invalid' })
		}

		if (cuit) {
			const existing = await clientModel.findByCuit(cuit)
			if (existing) return res.status(409).json({ error: 'Client with this CUIT already exists' })
		}

		if (phone && !validatePhone(phone)) {
			return res.status(400).json({ error: 'Phone is invalid' })
		}

		const client = await clientModel.createClient({ name, cuit, phone })
		res.status(201).json(client)
	} catch (err) {
		next(err)
	}
}

exports.getAllClients = async (req, res, next) => {
	try {
		const clients = await clientModel.findAll()
		res.json(clients)
	} catch (err) {
		next(err)
	}
}

