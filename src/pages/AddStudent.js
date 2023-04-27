import React, {useState} from 'react';
import Header from "../components/Header";
import ValidationUtils from "../utils/ValidationUtils";
import axios from "axios";
import {API} from "../config/APIConfig";

function AddStudent(props) {
    const [firstName, setFirstName] = useState("");
    const [familyName, setFamilyName] = useState("");
    const [dob, setDob] = useState("");
    const [email, setEmail] = useState("")

    const [firstNameError, setFirstNameError] = useState("")
    const [familyNameError, setFamilyNameError] = useState("")
    const [dobError, setDobError] = useState("")
    const [emailError, setEmailError] = useState("")

    const [notification, setNotification] = useState("")

    const handleSubmit = () => {
        const date = new Date(dob ? dob.replace(/-/g, '\/') : "")
        if(ValidationUtils.isBlank(firstName)){
            setFirstNameError("Please enter first name")
            setNotification("")
        }
        if(ValidationUtils.isBlank(familyName)){
            setFamilyNameError("Please enter first name")
            setNotification("")
        }
        if(ValidationUtils.isBlank(dob)){
            setDobError("Please enter date of birth")
            setNotification("")
        }
        if(ValidationUtils.isBlank(email) || ValidationUtils.validateEmail(email)){
            setEmailError("Please enter valid email address")
            setNotification("")
        }
        if(!ValidationUtils.isBlank(dob) && !ValidationUtils.isValidAge(date)){
            setDobError("You're not eligible")
            setNotification("")
        }
        if(!ValidationUtils.isBlank(dob) && ValidationUtils.checkFutureDate(date)){
            setDobError("You have entered a future date.")
            setNotification("")
        }

        if(!ValidationUtils.isBlank(firstName) && !ValidationUtils.isBlank(familyName) && !ValidationUtils.isBlank(email) && !ValidationUtils.validateEmail(email) && ValidationUtils.isValidAge(date) && !ValidationUtils.checkFutureDate(date)){
            const student = {
                firstName: firstName,
                familyName: familyName,
                dob: date.getTime(),
                email: email
            }
            // Call API to post student
            axios.post(`${API}/api/student`, student).then(({data}) => {
                if(data){
                    setNotification("Student has been added successfully")
                    setFirstName("")
                    setFamilyName("")
                    setDob("")
                    setEmail("")
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
                                <label htmlFor="first-name" className="form-label">First name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="first-name"
                                    value={firstName}
                                    onChange={(e) => {
                                        setFirstName(e.target.value)
                                        setFirstNameError("")
                                    }}/>
                                {firstNameError ? <div className="error-text"><i className='fa fa-times error-symbol' /><span>{firstNameError}</span></div> : <></>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="family-name" className="form-label">Family name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="family-name"
                                    value={familyName}
                                    onChange={(e) => {
                                        setFamilyName(e.target.value)
                                        setFamilyNameError("")
                                    }}/>
                                {familyNameError ? <div className="error-text"><i className='fa fa-times error-symbol' /><span>{familyNameError}</span></div> : <></>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="dob" className="form-label">Date of birth</label>
                                <input
                                    type="date"
                                    max={ValidationUtils.getToday()}
                                    className="form-control"
                                    id="dob"
                                    value={dob}
                                    onChange={(e) => {
                                        setDob(e.target.value)
                                        setDobError("")
                                    }}/>
                                {dobError ? <div className="error-text"><i className='fa fa-times error-symbol' /><span>{dobError}</span></div> : <></>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setEmailError("")
                                    }}/>
                                {emailError ? <div className="error-text"><i className='fa fa-times error-symbol' /><span>{emailError}</span></div> : <></>}
                            </div>
                            <span className="btn btn-primary" onClick={handleSubmit}>Add student</span>
                        </form>
                    </div>

                </div>
            </div>
        </div>

    );
}

export default AddStudent;