import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import HomePage from './Pages/Home.page.jsx';
import LoginPage from './Pages/Login.page.jsx';
import ManageTasks from './Pages/ManageTaks.jsx';
import CreateTask from './Pages/CreateTask.jsx';
import EditPage from './Pages/Edit.page.jsx';

function App() { 
  const [isAuthenticated, setIsAuthenticated] = useState(false); 

  useEffect(()=>{
    const checkLogin = ()=>{
      const isPassword = localStorage.getItem('Username');

      if(isPassword != null){
        setIsAuthenticated(true);
      }
    }

    checkLogin();
  }, [])

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={isAuthenticated ? <HomePage /> : <LoginPage />} />
        <Route path='/login' element={!isAuthenticated ? <LoginPage /> : <HomePage />}/>
        <Route path='/manageTasks' element={isAuthenticated ? <ManageTasks /> : <LoginPage />}/>
        <Route path='/createTask' element={isAuthenticated ? <CreateTask /> : <LoginPage />} />
        <Route path='/edit/:id'element={isAuthenticated ? <EditPage /> : <LoginPage />}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
