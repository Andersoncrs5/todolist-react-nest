import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pags/home.tsx';
import CreateTask from './pags/createTask.tsx';
import NotFound from './pags/NotFound.tsx';
import Header from './components/Header.tsx';
import UpdateTask from './pags/UpdateTask.tsx';

function AppModule() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateTask />} />
        <Route path="/update/:id" element={<UpdateTask />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default AppModule;