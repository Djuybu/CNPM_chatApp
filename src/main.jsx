import React from 'react'
import { Routes,Route,BrowserRouter} from "react-router-dom";
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import HelloWorld from "./components/Helloworld.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
     <Routes >
          <Route path="/" element={<App />} />
          <Route path="/call" element={<HelloWorld />} />
     </Routes>
      </BrowserRouter>
  </React.StrictMode>,
)