const prisma = require('../prismaClient')

async function createClient({ name, cuit, phone }) {
    // model: only perform DB operation
    return prisma.client.create({ data: { name, cuit, phone } })
}

async function findByCuit(cuit) {
    if (!cuit) return null
    return prisma.client.findUnique({ where: { cuit } })
}

async function findAll() {
    return prisma.client.findMany()
}

module.exports = {
    createClient,
    findByCuit,
    findAll,
}