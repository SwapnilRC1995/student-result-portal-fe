import React, {useEffect, useState} from 'react';
import Header from "../components/Header";
import axios from "axios";
import {API} from "../config/APIConfig";

function Results(props) {
    const [results, setResults] = useState([])

    useEffect(() => {
        axios.get(`${API}/api/result`).then(({data}) => {
            setResults(data)
        })
    },[])
    return (
        <div className="container-fluid">
            <div className="row">
                <Header/>
                <div className="col-xl-10 col-md-9 col-12 mt-5">
                    <div className="container">
                        <table className="table table-striped">
                            <thead className="">
                            <tr>
                                <th>Course</th>
                                <th>Student</th>
                                <th>Score</th>
                            </tr>
                            </thead>
                            <tbody>
                            {results.map((result, index) => {
                                return(
                                    <tr key={index}>
                                        <td>{result.course}</td>
                                        <td>{result.student}</td>
                                        <td>{result.score}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Results;