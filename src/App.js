import './App.css';
import { BrowserRouter,Routes, Route } from "react-router-dom";
import AdminLogin from './Pages/AdminLogin/AdminLogin';
import Dashboard from './Pages/Dashboard/Dashboard/Dashboard';
import AddStudent from './Pages/Dashboard/AddStudent/AddStudent';
import AddFood from './Pages/AddFood/AddFood';
import AllStudents from './Pages/AllStudents/AllStudents';
import AllFoods from './Pages/AllFoods/AllFoods';
import EditFood from './Pages/EditFood/EditFood';
import EditStudent from './Pages/EditStudent/EditStudent';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import Serving from './Pages/Serving/Serving';
function App() {
  return (
    <div className="">
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AdminLogin/>} />
        <Route path="/" element={<AdminLogin/>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
        <Route path="/addStudent" element={<PrivateRoute><AddStudent/></PrivateRoute>} />
        <Route path="/addFoods" element={<PrivateRoute><AddFood/></PrivateRoute>} />
        <Route path="/allStudents" element={<PrivateRoute><AllStudents/></PrivateRoute>} />
        <Route path="/allFoods" element={<PrivateRoute><AllFoods/></PrivateRoute>} />
        <Route path="/foods/:foodId" element={<PrivateRoute><EditFood/></PrivateRoute>} />
        <Route path="/students/:studentId" element={<PrivateRoute><EditStudent/></PrivateRoute>} />
        <Route path="/serving" element={<PrivateRoute><Serving></Serving></PrivateRoute>} />



      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;