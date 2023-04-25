import {Navigate, Route, Routes} from "react-router";
import Home from "./pages/Home";
import AddStudent from "./pages/AddStudent";
import Students from "./pages/Students";
import AddCourse from "./pages/AddCourse";
import Courses from "./pages/Courses";
import AddResult from "./pages/AddResult";
import Results from "./pages/Results";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate replace to="/home"/> }/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/add-student" element={<AddStudent/>}/>
            <Route path="/students" element={<Students/>}/>
            <Route path="/add-course" element={<AddCourse/>}/>
            <Route path="/courses" element={<Courses/>}/>
            <Route path="/add-result" element={<AddResult/>}/>
            <Route path="/results" element={<Results/>}/>

        </Routes>

    );
}

export default App;
