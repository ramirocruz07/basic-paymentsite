import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { SendMoney } from "./pages/SendMoney";
import { Dashboard } from "./pages/Dashboard";
function App() {

  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup></Signup>}></Route>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/send" element={<SendMoney />} />
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
