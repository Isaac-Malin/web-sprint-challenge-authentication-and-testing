const db = require('../../data/dbConfig')

const getById = async (id) => {
  const user = await db('users').where('id', id).first()
  return user
}

const add = async (user) => {
  const [id] = await db('users')
    .insert(user)
  return getById(id)
}

const findBy = async (filter) => {
  const user = await db('users').where(filter).first()
  return user
}


module.exports = {
  add,
  findBy
}