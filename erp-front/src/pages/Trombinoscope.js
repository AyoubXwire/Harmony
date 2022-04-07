import { useState, useEffect } from 'react'
import * as userApi from '../api/users'
import * as postApi from '../api/posts'
import { useCookies } from 'react-cookie'

function Trombinoscope() {

    const [cookies] = useCookies(['token'])
    const [posts, setPosts] = useState([])
    const [users, setUsers] = useState([])
    const [filters, setFilters] = useState({
        name: '',
        postId: undefined
    })

    useEffect(() => {
        getPosts()
    }, [])

    useEffect(() => {
        getUsers()
    }, [filters])

    async function getUsers() {
        const users = await userApi.getUsers(cookies.token, filters)
        setUsers(users)
    }

    async function getPosts() {
        const posts = await postApi.getPosts(cookies.token)
        setPosts(posts)
    }

    function _usersList() {
        if (users?.length > 0) {
            return users.map(_user => (
                <div key={_user.id} className="col-lg-6">
                    <div className='user-card bordered hover-shadow m-2'>
                        <img className='avatar' src={'https://ui-avatars.com/api/?background=A434AE66&color=A434AE&name=' + _user.firstName + '+' + _user.lastName} alt={_user.firstName + ' ' + _user.lastName} />
                        <div className='content'>
                            <h4>{_user.firstName + ' ' + _user.lastName}</h4>
                            <p>Post: {_user.post.name}</p>
                            <p>Email: <a href={'mailto:' + _user.email}>{_user.email}</a></p>
                            <p>Phone: <a href={'tel:' + _user.phone}>{_user.phone}</a></p>
                        </div>
                    </div>
                </div>
            ))
        }

        return null
    }

    function _postsList() {
        if (posts?.length > 0) {
            return posts.map(_post => (
                <option key={_post.id} value={_post.id}>{_post.name}</option>
            ))
        }

        return null
    }

    function postFilter(event) {
        let postId = event.target.value === 'All' ? undefined : event.target.value
        setFilters({ ...filters, postId: postId })
    }

    return (
        <div className='trombinoscope'>
            <div className="form-border mb-5">
                <form>
                    <div className='row'>
                        <h4 className='text-center pb-3'>Search</h4>
                        <div className='col-md-6'>
                            <label>by name:</label>
                            <input className='form-control' value={filters.name} onChange={event => setFilters({ ...filters, name: event.target.value })} type='text' name='name' placeholder='Name' />
                        </div>
                        <div className='col-md-6'>
                            <label>by post:</label>
                            <select className='form-control' onChange={postFilter} value={filters.post}>
                                <option key={0}>All</option>
                                {_postsList()}
                            </select>
                        </div>
                    </div>
                </form>
            </div>

            <div className='row'>
                {_usersList()}
            </div>
        </div>
    )
}

export default Trombinoscope