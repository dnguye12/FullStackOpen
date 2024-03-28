const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((acc, blog) => acc + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    const blogsLikes = blogs.map(blogs => blogs.likes)
    const largestIndex = blogsLikes.indexOf(Math.max(...blogsLikes))
    const largestinfo = blogs[largestIndex]

    return {
        title: largestinfo.title,
        author: largestinfo.author,
        likes: largestinfo.likes,
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}