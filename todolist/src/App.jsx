import Home from "./Components/Home";
import Register from "./Components/Register";
import Login from "./Components/Login";
import {Routes,Route} from "react-router-dom";

import protectedRoute from "./protectedRoute";

function App(){
  return(
    <div>
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route 
          path="/" 
          element={
          // <protectedRoute>
            <Login/>
          // </protectedRoute>
        }/>
      </Routes>
    </div>
  )
}

export default App;