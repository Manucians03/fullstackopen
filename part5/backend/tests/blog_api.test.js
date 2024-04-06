const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

const initialBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
]

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})


describe('get', () => {
  test('blogs get returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
})

  test('blogs get correctly', async () => {
      const response = await api.get('/api/blogs')
      const titles = response.body.map(blog => blog.title)
      expect(response.body).toHaveLength(initialBlogs.length)
      expect(titles).toContain("Go To Statement Considered Harmful")
      expect(titles).toContain("React patterns")
      response.body.forEach(blog => expect(blog.id).toBeDefined)
  })
})


describe('post', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
        title: "Manchester United",
        author: "Minh Nguyen",
        url: "www.manchesterunited.com",
        likes: 3,
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const titles = response.body.map(r => r.title)
  
    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(titles).toContain(
      "Manchester United"
    )
  })

  test('a blog without likes can be added', async () => {
    const newBlog = {
        title: "Haiphong",
        author: "Minh Nguyen",
        url: "www.haiphong.com",
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const titles = response.body.map(r => r.title)
  
    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(titles).toContain("Haiphong")
    response.body.forEach(blog => {
        if (blog.title === "Haiphong") {
            expect(blog.likes).toEqual(0)
        }
    })
  })

  test('a blog without titles or urls cannot be added', async () => {
    const noTitleBlog = {
        author: "Minh Nguyen",
        url: "www.haiphong.com",
        likes: 100
    }
  
    await api
      .post('/api/blogs')
      .send(noTitleBlog)
      .expect(400)
  
    const response1 = await api.get('/api/blogs')
  
    expect(response1.body).toHaveLength(initialBlogs.length)

    const noUrlBlog = {
        title: "Haiphong",
        author: "Minh Nguyen",
        likes: 100
    }
  
    await api
      .post('/api/blogs')
      .send(noTitleBlog)
      .expect(400)
  
    const response2 = await api.get('/api/blogs')
  
    expect(response2.body).toHaveLength(initialBlogs.length)
  })
})

describe('delete', () => {
  test('a blog can be deleted', async () => {
  
    await api
      .delete('/api/blogs/5a422b3a1b54a676234d17f9')
      .expect(204)
  
    const response = await api.get('/api/blogs')
  
    const titles = response.body.map(r => r.title)
  
    expect(response.body).toHaveLength(initialBlogs.length - 1)
    expect(titles).not.toContain(
      "Canonical string reduction"
    )
  })
})

describe('put', () => {
  test('a blog can be updated', async () => {
    const newBlog = {
        title: "Haiphong"
    }
  
    await api
      .put('/api/blogs/5a422b3a1b54a676234d17f9')
      .send(newBlog)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const titles = response.body.map(r => r.title)
  
    expect(response.body).toHaveLength(initialBlogs.length)
    expect(titles).not.toContain(
      "Canonical string reduction"
    )
    expect(titles).toContain("Haiphong")
    response.body.forEach(blog => {
        if (blog.title === "Haiphong") {
            expect(blog.likes).toEqual(12)
            expect(blog.author).toEqual("Edsger W. Dijkstra")
        }
    })
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})