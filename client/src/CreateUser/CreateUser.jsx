import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"
import "./CreateUser.css"
import url from "../url.jsx"

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.post(`${url}/api/user`, newUser)
        .then((response) => {
            toast.success(response.data.message, {position: "top-center"})
            navigate("/")
        })
        .catch((error) => toast.error(error.message))
    }

  return (
    <div className='create-container'>
        <Link to="/"><button type="button" class="btn btn-secondary">Back</button></Link>
        <form onSubmit={handleSubmit}>
            <h3>Add New User</h3>
            <div className='input-group'>
                <label htmlFor='name'>Name</label>
                <input type="text" id="name" name="name" onChange={inputHandler} placeholder='Enter your Name' required />
            </div>
            <div className='input-group'>
                <label htmlFor='email'>Email</label>
                <input type="email" id="email" name="email" onChange={inputHandler} placeholder='Enter your Email' required />
            </div>
            <div className='input-group'>
                <label htmlFor='address'>Address</label>
                <input type="text" id="address" name="address" onChange={inputHandler} placeholder='Enter your Address' required />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default CreateUser
