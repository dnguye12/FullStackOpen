const dummy = () => {
    return 1;
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return blogs.reduce(reducer, 0);
}

const favoriteBlog = (blogs) => {
    if(blogs.length === 0) {
        return null;
    }

    let fav = blogs[0];

    for(let i = 1; i < blogs.length; i++) {
        if(blogs[i].likes > fav.likes) {
            fav = blogs[i];
        }
    }

    return {
        title: fav.title,
        author: fav.author,
        likes: fav.likes
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}