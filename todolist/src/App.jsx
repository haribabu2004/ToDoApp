import Home from "./Components/Home";
import Register from "./Components/Register";
import Login from "./Components/Login";
import {Routes,Route} from "react-router-dom";

import protectedRoute from "./protectedRoute";

function App(){
  return(
    <div>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route 
          path="/home" 
          element={
          // <protectedRoute>
            <Home/>
          // </protectedRoute>
        }/>
      </Routes>
    </div>
  )
}

export default App;