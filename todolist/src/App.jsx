import Home from "./Components/Home";
import Register from "./Components/Register";
import Login from "./Components/Login";
import {Routes,Route} from "react-router-dom";
import ProtectedRoute from "./protectedRoute";

function App(){
  return(
    <div>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/home" element={
          <ProtectedRoute>
          <Home/>
          </ProtectedRoute>
        }/>
      </Routes>
    </div>
  )
}

export default App;