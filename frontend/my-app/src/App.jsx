import { useState } from 'react'
import './App.css'
import Nav from "./assets/Components/Props/Nav.jsx";
import NavTop from "./assets/Components/Props/NavTop.jsx";
import Dashboard from "./assets/Components/Pages/Dashboard.jsx";
import Transactions from "./assets/Components/Pages/Trasactions.jsx";
import Analytics from "./assets/Components/Pages/Analytics.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";





function App() {
  const [count, setCount] = useState(0)

  return (

      <Router>
          <div className="grid grid-cols-[250px_1fr] ">
              <Nav/>

              <div className="grid grid-rows-[75px_1fr]">
                  <NavTop/>


                  <div className="shadow rounded-t-md  bg-gray-50 ">

                          <Routes>
                              <Route path="/" element={<Dashboard />} />
                              <Route path="/transactions" element={<Transactions />} />
                              <Route path="/analytics" element={<Analytics />} />
                          </Routes>


                  </div>

              </div>


          </div>
      </Router>
  )
}

export default App
