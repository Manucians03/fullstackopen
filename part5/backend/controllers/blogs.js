const blogRouter = require('express').Router()
const { request } = require('express')
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1})
  response.json(blogs)
})

blogRouter.post('/', middleware.tokenExtractor, middleware.tokenValidator, async (request, response) => {
  const body = request.body
  const user = await User.findById(request.decodedToken.id)
  const blog = new Blog({...body, user: user._id})
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(204).end()
})

blogRouter.delete('/:id', middleware.tokenExtractor, middleware.tokenValidator, async (request, response) => {
  const user = await User.findById(request.decodedToken.id)
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    response.status(400).end()
  } 
  else if (user._id.toString() === blog.user._id.toString()) {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  }
}) 

blogRouter.put('/:id', async (request, response) => {
  const body = request.body
  await Blog.findByIdAndUpdate(request.params.id, body, { new: true, runValidators: true, context: 'query' })
  response.status(204).end()
})

module.exports = blogRouter