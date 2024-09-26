import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate, useParams } from 'react-router-dom'

const CreateUser = () => {

    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        address: ""
    })

    const inputHandler = (e) => {
        setNewUser({...newUser, [e.target.name]: e.target.value})
    }

    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(() => {
        const getUser = async() => {
            await axios.get(`http://localhost:4001/api/user/${id}`)
            .then((response) => setNewUser(response.data))
            .catch((error) => console.log({message: error.message}))
        }
        getUser()
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.put(`http://localhost:4001/api/update/${id}`, newUser)
        .then((response) => {
            toast.success(response.data.message)
            navigate("/")
        })
        .catch((error) => toast.error(error.message))
    }

  return (
    <div className='create-container'>
        <Link to="/"><button type="button" class="btn btn-secondary">Back</button></Link>
        <form onSubmit={handleSubmit}>
            <h3>Update User</h3>
            <div className='input-group'>
                <label htmlFor='name'>Name</label>
                <input type="text" id="name" name="name" value={newUser.name} onChange={inputHandler} placeholder='Enter your Name' required />
            </div>
            <div className='input-group'>
                <label htmlFor='email'>Email</label>
                <input type="email" id="email" name="email" value={newUser.email} onChange={inputHandler} placeholder='Enter your Email' required />
            </div>
            <div className='input-group'>
                <label htmlFor='address'>Address</label>
                <input type="text" id="address" name="address" value={newUser.address} onChange={inputHandler} placeholder='Enter your Address' required />
            </div>
            <button type="submit" class="btn btn-primary">Update</button>
        </form>
    </div>
  )
}

export default CreateUser
