import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../action/Loading";
import { message } from "antd";





let Home = () => {
    let [loading, setLoading] = useState(true);
    let [student, SetStudent] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/read')
            .then(res => {
                SetStudent(res.data.user);
                setLoading()
            })
            .catch(err => console.log(err))

    }, [])


    let deleteStudent = (e, id) =>{
        e.preventDefault();
        let btnDelete = e.currentTarget;
        btnDelete.innerText = 'Deleting....';

        axios.delete('http://localhost:8000/api/delete/' + id)
        .then(res=>{
            if(res.data.status === 'success'){
                setTimeout(()=>{
                    message.success(res.data.message);
                    btnDelete.closest("tr").remove();
                },2000)
            }
        })
        .catch(err=>console.log(err))
    }
    if (loading) {
        return (
            <Loading />
        )
    }
    let data = '';
    data = student.map((data, i) => {
        return (
            <tr key={i}>
                <td>{data.student_number}</td>
                <td>
                    <img src={'http://localhost:8000/image/' + data.avatar} className="rounded-circle"
                      style={{ width:"120px", height:"100px" }}  alt="avatar" />
                </td>
                <td>{data.first_name}</td>
                <td>{data.last_name}</td>
                <td>{data.contact_number}</td>
                <td>
                    <Link to={'/edit/' + data.id} className="btn btn-success">Edit</Link>
                </td>
                <td>
                    <button type="button" onClick={(e)=>deleteStudent(e, data.id)} className="btn btn-danger">Delete</button>
                </td>
            </tr>
        )
    })
    return (
        <div className="container py-5 w-75">
            <h1 className="mt-2 fw-bold text-center">Crud Application in React and Laravel 10</h1>
            <div className="row">
                <div className="card">
                    <div className="card-header bg-white">
                        <Link to={'/add-student'} className="btn btn-primary mt-2 float-end">Add Student</Link>
                    </div>
                    <div className="card-body">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Student No.</th>
                                    <th>Avatar</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Contact No.</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;