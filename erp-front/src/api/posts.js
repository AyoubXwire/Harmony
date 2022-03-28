import axios from 'axios'
import * as urls from './index'

export async function getPosts(token) {
    const posts = await axios.get(urls.GET_ALL_POSTS, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })

    return posts.data
}

export async function createPost(token, post) {
    await axios.post(urls.CREATE_POST, {
        name: post.name
    }, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}

export async function deletePost(token, postId) {
    await axios.delete(urls.DELETE_POST + postId, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}

export async function updatePost(token, postId, post) {
    await axios.put(urls.UPDATE_POST + postId, {
        name: post.name
    }, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}