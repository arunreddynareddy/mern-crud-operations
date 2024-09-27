import React, { useEffect, useState } from 'react'
import axios from "axios"
import {Link} from "react-router-dom"
import "./GetUser.css"
import toast from 'react-hot-toast'
import url from "../url.jsx"

const GetUser = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        const getUsers = async () => {
            await axios.get(`${url}/api/allUsers`)
            .then((response) => setUsers(response.data))
            .catch((error) => console.log({Errormessage: error.message}))
        }
        getUsers();
    }, [])

    const deleteHandler = async (id) => {
        await axios.delete(`${url}/api/delete/${id}`)
        .then((response) => {
            setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id))
            toast.success(response.data.message, {position: "top-center"})
        })
        .catch((error) => toast.error(error.message))
    }



  return (
    <div className='user-table'>
      <Link to="/create"><button type="button" class="btn btn-primary">Add User</button></Link>
      {
        users.length === 0 ? (
            <div className='no-data-found'>
                <h3>No Data Found</h3>
                <p>Please Add New User</p>
            </div>
        ) : (
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, index) => {
                            return (
                                <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.address}</td>
                                    <td className='active-button'>
                                        <Link to={`/update/${user._id}`}>
                                            <button type="button" class="btn btn-warning">
                                                <i class="fa-solid fa-pen-to-square"></i>
                                            </button>
                                        </Link>
                                        <button onClick={() => deleteHandler(user._id)} type="button" class="btn btn-danger">
                                            <i class="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        )
      }
    </div>
  )
}

export default GetUser
