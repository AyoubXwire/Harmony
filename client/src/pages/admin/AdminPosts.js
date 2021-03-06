import { useState, useEffect } from 'react'
import * as postApi from '#api/posts'
import { useCookies } from 'react-cookie'

function AdminPosts() {

    const [cookies] = useCookies(['token'])
    const [posts, setPosts] = useState([])
    const [post, setPost] = useState({
        id: '',
        name: ''
    })

    useEffect(() => {
        getPosts()
    }, [])

    async function reset() {
        setPost({
            id: '',
            name: ''
        })

        await getPosts()
    }

    async function getPosts() {
        const posts = await postApi.getPosts(cookies.token)
        setPosts(posts)
    }

    async function savePost(event) {
        event.preventDefault()

        if (post?.id) {
            updatePost(post.id)
        } else {
            createPost()
        }
    }

    async function createPost() {
        await postApi.createPost(cookies.token, post)
        await reset()
    }

    async function deletePost(postId) {
        await postApi.deletePost(cookies.token, postId)
        await reset()
    }

    async function updatePost(postId) {
        await postApi.updatePost(cookies.token, postId, post)
        await reset()
    }

    function _table() {
        if (posts?.length > 0) {
            return posts.map(_post => (
                <tr key={_post.id}>
                    <th>{_post.id}</th>
                    <td>{_post.name}</td>
                    <td>{_post._count.users}</td>
                    <td className="actions">
                        <a href="#" onClick={() => setPost(_post)}>Update</a>
                        <a href="#" onClick={() => deletePost(_post.id)}>Delete</a>
                    </td>
                </tr>
            ))
        }
    }

    return (
        <div>
            <h1 className="text-center">Manage posts</h1>

            <div className="form-border my-5">
                <form onSubmit={savePost}>
                    <input className='form-control my-2' value={post.id} onChange={event => setPost({ ...post, id: event.target.value })} type='text' name='id' placeholder='post id' disabled />
                    <input className='form-control my-2' value={post.name} onChange={event => setPost({ ...post, name: event.target.value })} type='text' name='name' placeholder='post name' />

                    <div className="actions">
                        <input className='button secondary mt-3' type='reset' value='Reset' onClick={reset} />
                        <input className='button primary mt-3 ms-2' type='submit' value='Save' />
                    </div>
                </form>
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Post name</th>
                        <th>Users</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {_table()}
                </tbody>
            </table>
        </div>
    )
}

export default AdminPosts