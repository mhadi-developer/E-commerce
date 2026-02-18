import './App.css'
import Nav from './components/Nav.jsx';
import { SideBar } from './components/SideBar.jsx';
import Home from './pages/Home.jsx'
import AddProductForm from './pages/AddProductForm.jsx';
import AddCategoryForm from './pages/AddCategoryForm.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Orders from './pages/Orders.jsx';
function App() {
 
 
  return (
    <div className="container-fluid position-relative d-flex p-0">
      <BrowserRouter>
        <SideBar />
        <div className="content">
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-product" element={<AddProductForm />} />
            <Route path="/add-category" element={<AddCategoryForm />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App
