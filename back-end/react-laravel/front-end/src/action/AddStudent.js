import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import axios from "axios";




let AddStudent = () => {

  let [values, setValues] = useState({
    email: '',
    first_name: '',
    last_name: '',
    contact_number: '',
    Avatar: '',
  });


  let handleInput = (event) => {
    event.preventDefault();
    let object = { ...values, [event.target.name]: event.target.value }
    setValues(object);
  }

  let navigate = useNavigate();
  let handleSubmit = (e) => {
    e.preventDefault();
    let email = values.email;
    let first_name = values.first_name;
    let last_name = values.last_name;
    let contact_number = values.contact_number;
    let avatar = values.avatar;

    if (email === '' || first_name === '' || last_name === '' || contact_number === '' || avatar === '') {
      setTimeout(() => {
        message.error('All Fields are Required')
      }, 2000)
    } else {
      let formData = new FormData();
      formData.append("email", email)
      formData.append("first_name", first_name);
      formData.append("last_name", last_name);
      formData.append("contact_number", contact_number);
      formData.append("avatar", avatar);

      axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
        axios.post('http://localhost:8000/api/create', formData)
          .then(res => {
            if (res.data.status === 'success') {
              setTimeout(() => {
                message.success(res.data.message)
                navigate('/')
              }, 100)
            } else {
              setTimeout(() => {
                message.error(res.data.message);
              }, 100)
            }
          })
          .catch(err => console.log(err))
      })


    }

  }

  return (
    <div className="py-5">
      <div className="container mt-4 w-50">
        <div className="row">
          <div className="card">
            <div className="card-header bg-white">
              <h4 className="fw-bold pt-1">Add Student
                <Link to={'/'} className="btn btn-danger float-end">Back</Link>
              </h4>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="card-body">
                <div className="mt-2">
                  <label htmlFor="email">Student Email</label>
                  <input type="text" className="form-control" name="email" id="email"
                    onChange={handleInput} placeholder="Student Email" />
                </div>
                <div className="mt-2">
                  <label htmlFor="first_name">First Name</label>
                  <input type="text" className="form-control" name="first_name" id="first_name"
                    onChange={handleInput} placeholder="First name" />
                </div>

                <div className="mt-2">
                  <label htmlFor="last_name">Last Name</label>
                  <input type="text" className="form-control" name="last_name" id="last_name"
                    onChange={handleInput} placeholder="Last name" />
                </div>

                <div className="mt-2">
                  <label htmlFor="contact_number">Contact Number</label>
                  <input type="text" className="form-control" name="contact_number" id="contact_number"
                    onChange={handleInput} placeholder="Contact Number" />
                </div>


                <div className="mt-2">
                  <label htmlFor="avatar">Avatar</label>
                  <input type="file" className="form-control" name="avatar" id="avatar"
                    onChange={e => setValues({ ...values, avatar: e.target.files[0] })} />
                </div>
                <br />
                <button type="submit" className="btn btn-primary float-end mb-2">Add Student</button>
                <br />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddStudent;