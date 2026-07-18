import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import AdminRouter from './admin/routes/AdminRouter.jsx'
import QueryProvider from './admin/providers/QueryProvider.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/admin/*" element={<AdminRouter />} />
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </QueryProvider>
  </React.StrictMode>,
)
