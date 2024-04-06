const User = require('../models/user')
const Blog = require('../models/blog')

const blogsInDb = async () => {
    const users = await Note.find({})
    return users.map(u => u.toJSON())
  }

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialNotes,
  nonExistingId,
  blogsInDb,
  usersInDb,
}