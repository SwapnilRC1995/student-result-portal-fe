import React, {useEffect, useState} from 'react';
import Header from "../components/Header";
import {API} from "../config/APIConfig";
import axios from "axios";
import ValidationUtils from "../utils/ValidationUtils";

function Students(props) {

    const [students, setStudents] = useState([]);
    const [notification, setNotification] = useState("")
    const deleteStudent = (student) => {
        // Call API to delete student and update state
        const data = {
            id: student['_id']
        }
        axios.delete(`${API}/api/student`, {data: data}).then((result) => {
            setStudents(students.filter((student) => student['_id'] !== data.id))
            setNotification("Student has been successfully deleted")
        })
    }

    useEffect(() => {
        axios.get(`${API}/api/student`).then(({data}) => {
            setStudents(data)
        })
    }, [])
    return (
        <div className="container-fluid">
            <div className="row">
                <Header/>
                <div className="col-xl-10 col-md-9 col-12 mt-5">
                    <div className="container">
                        {notification && <div className="d-flex"><div role="alert" className="d-flex align-items-center fade alert alert-success w-100 show"><i className="fa fa-close close-icon cursor-pointer" onClick={() => setNotification("")}></i><span className='ml-3'>{notification}</span></div></div>}
                        {students ?
                            <table className="table table-striped">
                                <thead className="">
                                <tr>
                                    <th>Name and Family name</th>
                                    <th>DOB</th>
                                    <th>Email</th>
                                    <th>Delete</th>
                                </tr>
                                </thead>
                                <tbody>
                                {students.map((student, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{student.firstName} {student.familyName}</td>
                                            <td>{ValidationUtils.getPrintableDate(student.dob)}</td>
                                            <td>{student.email}</td>
                                            <td><i className="fa fa-times" onClick={() => deleteStudent(student)}></i></td>
                                        </tr>
                                    )
                                })}

                                </tbody>
                            </table>
                            :
                            <div className="d-flex align-items-center">
                                <strong>Loading...</strong>
                                <div className="spinner-border ms-auto" role="status" aria-hidden="true"></div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Students;