import React from 'react';

function Header(props) {
    return (
        <nav className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark sidenav-ht col-xl-2 col-md-3 col-12">
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <span className="fs-4">Student Result Management System</span>
            </a>
            <hr/>
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <a href="/home" className="nav-link text-white">
                        Home
                    </a>
                </li>
                <li>
                    <a href="/add-student" className="nav-link text-white">
                        Add New Students
                    </a>
                </li>
                <li>
                    <a href="/students" className="nav-link text-white">
                        Students List
                    </a>
                </li>
                <li>
                    <a href="/add-course" className="nav-link text-white">
                        Add New Courses
                    </a>
                </li>
                <li>
                    <a href="/courses" className="nav-link text-white">
                        Courses List
                    </a>
                </li>
                <li>
                    <a href="/add-result" className="nav-link text-white">
                        Add New Results
                    </a>
                </li>
                <li>
                    <a href="/results" className="nav-link text-white">
                        Results List
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default Header;