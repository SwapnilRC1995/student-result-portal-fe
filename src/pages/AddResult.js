import React, {useEffect, useState} from 'react';
import Header from "../components/Header";
import ValidationUtils from "../utils/ValidationUtils";
import axios from "axios";
import {API} from "../config/APIConfig";

function AddResult(props) {
    const [students, setStudents] = useState([])
    const [courses, setCourses] = useState([])

    const [notification, setNotification] = useState("");

    const [student, setStudent] = useState("");
    const [course, setCourse] = useState("")
    const [score, setScore] = useState("")

    const [studentError, setStudentError] = useState("")
    const [courseError, setCourseError] = useState("")
    const [scoreError, setScoreError] = useState("")

    const handleResultSubmit = () => {
        if(!course){
            setCourseError("Please select a course")
        }
        if(!student){
            setStudentError("Please select a student")
        }
        if(ValidationUtils.isBlank(score)){
            setScoreError("Please select a score")
        }
        if(course && student && !ValidationUtils.isBlank(score)){
            const result = {
                course_id: course,
                student_id: student,
                score: score
            }
            console.log(result)
            axios.post(`${API}/api/result`, result).then(({data}) => {
                if(data){
                    setNotification("Result has been posted successfully")
                    setCourse("")
                    setStudent("")
                    setScore("")
                }
            })

        }
    }

    useEffect(() => {
        axios.get(`${API}/api/student`).then(({data}) => {
            setStudents(data)
        })
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
                            {students.length > 0 && courses.length > 0 ?
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="course-name" className="form-label">Course name</label>
                                    <select
                                        className="form-select"
                                        value={course}
                                        onChange={(e) => {
                                            e.preventDefault();
                                            setCourse(e.target.value)
                                            setCourseError("")
                                        }}>
                                        <option value="" className='option-disabled'>Select</option>
                                        {courses.map((course, index) => {
                                            return (
                                                <option value={course['_id']} key={index}>{course.course}</option>
                                            )
                                        })}
                                    </select>
                                    {courseError ? <div className="error-text"><i className='fa fa-times error-symbol' /><span>{courseError}</span></div> : <></>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="student-name" className="form-label">Student name</label>
                                    <select
                                        className="form-select"
                                        value={student}
                                        onChange={(e) => {
                                            e.preventDefault();
                                            setStudent(e.target.value)
                                            setStudentError("")
                                        }}>
                                        <option value="" className='option-disabled'>Select</option>
                                        {students.map((student, index) => {
                                            return(
                                                <option value={student['_id']} key={index}>{student.firstName} {student.familyName}</option>
                                            )
                                        })}
                                    </select>
                                    {studentError ? <div className="error-text"><i className='fa fa-times error-symbol' /><span>{studentError}</span></div> : <></>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="score" className="form-label">Score</label>
                                    <select
                                        className="form-select"
                                        value={score}
                                        onChange={(e) => {
                                            e.preventDefault();
                                            setScore(e.target.value)
                                            setScoreError("")
                                        }}>
                                        <option value="" className='option-disabled'>Select</option>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="C">C</option>
                                        <option value="D">D</option>
                                        <option value="E">E</option>
                                        <option value="F">F</option>
                                    </select>
                                    {scoreError ? <div className="error-text"><i className='fa fa-times error-symbol' /><span>{scoreError}</span></div> : <></>}
                                </div>
                                <span className="btn btn-primary" onClick={handleResultSubmit}>Add result</span>
                            </form>
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

export default AddResult;