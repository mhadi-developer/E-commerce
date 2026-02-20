/* eslint-disable no-unused-vars */
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Nav from './components/nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cart from './pages/Cart';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Details from './pages/Details';
import { createContext, useState, useEffect } from 'react';
import Contact from './pages/Contact';
import Topbar from './components/Topbar';
import Footer from './components/Footer';
import {useFetch} from '../src/customHooks/useFetch'
import SignupForm from './pages/SignupForm.jsx';
import SignInForm from './pages/SigninForm.jsx';
import AuthProvider from './Custom-context/AuthProvider.jsx';
import UserProfile from './pages/UserProfile.jsx';
import Protected from './pages/Protected.jsx';
import CartProvider from './Custom-context/CartProvider.jsx';
import Checkout from './pages/Checkout.jsx';
import PaymentSuccess from './pages/PaymentSuccsess.jsx';
import PaymentCancellation from './pages/PaymentCancel.jsx';
import ConfirmedOrderDetails from './pages/ConfirmOrderDetails.jsx';
import UserOrdersView from './components/Profile/subContent-Profile/UserOrdersView.jsx';
import Shope from './pages/Shope.jsx';
import ChatBot from './pages/CustomerService.jsx';



// Create Cart Context
// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();

function App() {
  // fetching data from custom hook

  //   const {
  //     data: loggedInUserData,
  //     error: loggedInUserError,
  //     loading: loggedInUserLoading
  // } = useFetch("http://localhost:7000/users/loggedIn-user");
  // fetching the information of looged in user from backend whenever the app.jsx renders.

  // console.log('*****logged in ',loggedInUserData);
  

  const {
    data: categories,
    error,
    loading,
  } = useFetch(`${import.meta.env.VITE_API_URL}/categories`); // custom hook.

  // Load cart directly from localStorage as initial state
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
      return [];
    }
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);


 
  

  return (
    <AuthProvider>
      {/* children prop concept*/}
      <CartProvider>
        <BrowserRouter>
          <Topbar />
          <Nav categories={categories} />
          <Routes>
            <Route path="/" element={<Home categories={categories} />} />
            <Route path="/about" element={<About />} />
            <Route path="/chat/customer/service" element={<ChatBot />} />

            <Route
              path="/cart"
              element={
                <Protected>
                  <Cart />
                </Protected>
              }
            />
            <Route
              path="/checkout"
              element={
                <Protected>
                  <Checkout />
                </Protected>
              }
            />

            <Route path="/contact" element={<Contact />} />
            <Route path="/payment/success" element={<PaymentSuccess />} />
            <Route path="/payment/cancel" element={<PaymentCancellation />} />
            <Route path="/shop/:cat_id?" element={<Shope />} />

            <Route
              path="/order/confirm/detail"
              element={<ConfirmedOrderDetails />}
            />

            <Route path="/product/detail/:slug" element={<Details />} />
            <Route path="/user/all/orders" element={<UserOrdersView />} />

            <Route path="/signup" element={<SignupForm />} />
            <Route path="/signin" element={<SignInForm />} />
            <Route
              path="/profile"
              element={
                <Protected>
                  <UserProfile />
                </Protected>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </CartProvider>
    </AuthProvider> // children prop concept
  );
}

export default App;







// Child prop Concept  || children prop


// function childprop({children}) {
//   return (
//     <p> {children}</p>
//   )
// }


// <childprop>
//   <ul>
//     <li><a href=""></a><a href=""></a></li>
//   </ul>
//   <ul>
//     <li><a href=""></a><a href=""></a></li>
//   </ul>
//   <ul>
//     <li><a href=""></a><a href=""></a></li>
//   </ul>
// </childprop>