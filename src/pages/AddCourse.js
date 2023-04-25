import React, {useState} from 'react';
import Header from "../components/Header";
import ValidationUtils from "../utils/ValidationUtils";
import axios from "axios";
import {API} from "../config/APIConfig";

function AddCourse(props) {

    const [courseName, setCourseName] = useState("");
    const [courseNameError, setCourseNameError] = useState("");

    const [notification, setNotification] = useState("")

    const handleCourseSubmit = () => {
        if(ValidationUtils.isBlank(courseName)){
            setCourseNameError("Please enter course name")
            setNotification("")
        }
        if(!ValidationUtils.isBlank(courseName)){
            const course = {
                course: courseName
            }
            // Call API to post course
            axios.post(`${API}/api/course`, course).then(({data}) => {
                if(data){
                    setNotification("Course has been added successfully")
                    setCourseName("")
                }
            })
        }
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <Header/>
                <div className="col-xl-10 col-md-9 col-12 mt-5">
                    <div className="container">
                        {notification && <div className="d-flex"><div role="alert" className="d-flex align-items-center fade alert alert-success w-100 show"><i className="fa fa-close close-icon cursor-pointer" onClick={() => setNotification("")}></i><span className='ml-3'>{notification}</span></div></div>}
                        <form>
                            <div className="mb-3">
                                <label htmlFor="course-name" className="form-label">Course name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="course-name"
                                    value={courseName}
                                    onChange={(e) => {
                                        setCourseName(e.target.value)
                                        setCourseNameError("")
                                    }}/>
                                {courseNameError ? <div className="error-text"><i className='fa fa-times error-symbol' /><span>{courseNameError}</span></div> : <></>}
                            </div>
                            <span className="btn btn-primary" onClick={handleCourseSubmit}>Add course</span>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default AddCourse;