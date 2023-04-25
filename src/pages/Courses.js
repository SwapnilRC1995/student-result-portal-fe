import React, {useEffect, useState} from 'react';
import Header from "../components/Header";
import axios from "axios";
import {API} from "../config/APIConfig";

function Courses(props) {
    const [courses, setCourses] = useState([])
    const [notification, setNotification] = useState("");

    const deleteCourse = (course) => {
        // Call API to delete course and update the state
        const data = {
            id: course['_id']
        }
        axios.delete(`${API}/api/course`, {data: data}).then((result) => {
            setCourses(courses.filter((course) => course['_id'] !== data.id))
            setNotification("Course has been successfully deleted")
        })
    }

    useEffect(() => {
        // Call API to getAllCourses and update State
        axios.get(`${API}/api/course`).then(({data}) => {
            setCourses(data);
        })
    }, [])

    return (
        <div className="container-fluid">
            <div className="row">
                <Header/>
                <div className="col-xl-10 col-md-9 col-12 mt-5">
                    <div className="container">
                        {notification && <div className="d-flex"><div role="alert" className="d-flex align-items-center fade alert alert-success w-100 show"><i className="fa fa-close close-icon cursor-pointer" onClick={() => setNotification("")}></i><span className='ml-3'>{notification}</span></div></div>}
                        { courses ?
                            <table className="table table-striped">
                                <thead className="">
                                <tr>
                                    <th>Course Name</th>
                                    <th>Delete</th>
                                </tr>
                                </thead>
                                <tbody>
                                {courses.map((course, index) => {
                                    return(
                                        <tr key={index}>
                                            <td>{course.course}</td>
                                            <td><i className="fa fa-times cursor-pointer" onClick={() => deleteCourse(course)}></i></td>
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

export default Courses;