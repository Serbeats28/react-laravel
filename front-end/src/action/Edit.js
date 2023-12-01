import React, {useEffect, useState} from "react";
import { Link, useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import {message} from "antd";

import Loading from "./Loading";


let Edit = () =>{
   
    let [loading, setLoading] = useState(true)
    let [student, setStudent] = useState({
        student_id:'',
        student_number:'',
        email: "",
        first_name: "",
        last_name: "",
        contact_number: "",
        avatar: ""
    })
    let [avatar, setAvatar] = useState({
        student_avatar:''
    })
   
    let {id} = useParams();
    useEffect(()=>{
        axios.get('http://localhost:8000/api/retrieve/' + id)
        .then(res=>{
           if(res.data.status === 'success'){
            setStudent({
                ...student,
                student_id: res.data.student.id,
                student_number: res.data.student.student_number,
                email: res.data.student.email,
                first_name: res.data.student.first_name,
                last_name: res.data.student.last_name,
                contact_number: res.data.student.contact_number,
             })
             setAvatar({
                ...avatar,
                student_avatar: res.data.student.avatar
             })
             setLoading(false)
            
           }
        })
        .catch(err=>console.log(err));
    },[]);
    let navigate = useNavigate();
    if(loading){
        return(
            <Loading />
        )
    }
    
    let handleInput = (eve)=>{
        eve.preventDefault();
        let object = {...student, [eve.target.name]: eve.target.value}
        setStudent(object)
    }
    let handleSubmit = (e)=>{
        e.preventDefault();
        let formData = new FormData();
        formData.append('id', student.student_id)
        formData.append('student_number',student.student_number)
        formData.append('email',student.email)
        formData.append('first_name',student.first_name)
        formData.append('last_name',student.last_name)
        formData.append('contact_number',student.contact_number)
        formData.append('avatar',student.avatar)
       
        axios.post('http://localhost:8000/api/update', formData)
        .then(res=>{
            if(res.data.status === 'success'){
                setTimeout(()=>{
                    message.success(res.data.message);
                    navigate('/')
                },1000)
            }
        })
        .catch(err=>console.log(err))

        
    }
    

    return(
        <div className="container w-50">
        <div className="row">
            <h2 className="fw-bold text-center mt-1">Update Student</h2>
            <div className="card">
                <div className="card-header bg-white">
                    <Link to={'/'} className="float-end btn btn-danger mt-2">Back</Link>
                </div>
                <form onSubmit={handleSubmit}>
                <div className="card-body">
                    <input type="hidden" name="student_id" id="student_id"
                   onChange={handleInput} value={student.id} />
                    <div className="mt-2">
                        <label htmlFor="student_number">Student No.</label>
                        <input type="text" className="form-control" name="student_number" id="student_number" 
                   onChange={handleInput} value={student.student_number} />
                    </div>

                    <div className="mt-2">
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control" name="email" id="email" 
                     onChange={handleInput} value={student.email} />
                    </div>

                    <div className="mt-2">
                        <label htmlFor="first_name">First Name</label>
                        <input type="text" className="form-control" name="first_name" id="first_name"
                   onChange={handleInput} value={student.first_name}  />
                    </div>

                    <div className="mt-2">
                        <label htmlFor="last_name">Last Name</label>
                        <input type="text" className="form-control" name="last_name" id="last_name"
                      onChange={handleInput} value={student.last_name}  />
                    </div>

                    <div className="mt-2">
                        <label htmlFor="contact_number">Contact No.</label>
                        <input type="text" className="form-control" name="contact_number" id="contact_number"
                      onChange={handleInput} value={student.contact_number} />
                    </div>

                    <div className="mt-2">
                        <label htmlFor="avatar">Avatar</label>
                        <input type="file" className="form-control" name="avatar" id="avatar"
                        onChange={e=>setStudent({...student, avatar: e.target.files[0]})} />
                    </div>

                    <div className="mt-3">
                        <img src={'http://localhost:8000/image/' + avatar.student_avatar} alt="avatar"
                        style={{ width:"100px", height:"100px" }} />
                    </div>

                    <div className="mt-2">
                        <button type="submit" className="btn btn-primary float-end mb-2">Update Student</button>
                    </div>
                </div>
                </form>
            </div>
        </div>
    </div>
    )
}

export default Edit;