const totalLikes = (list) => list.reduce((acc, e) => acc + e.likes, 0)

const mostLikes = (list) => {
    if (list.length === 0) {
        return undefined
    }
    let max = list[0]
    list.forEach((blog) => {
        if (blog.likes > max.likes) {
            max = blog
        }
    })
    return { title: max.title, author: max.author, likes: max.likes }
}

module.exports = { totalLikes, mostLikes }