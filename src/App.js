import React, { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import Login from "pages/Login";
import Register from "pages/Register";
import Detail from "pages/Detail";
import ErrorPage from "pages/ErrorPage";
import Product from "pages/Product";
import Cart from "pages/Cart";
import { useDispatch, useSelector } from "react-redux";
import { setIsMobile } from "app/stateDevide";
import { PHONE_BREAKPOINT, TABLET_BREAKPOINT } from "constant/breakpoint";
import ThankYou from "pages/ThankYou";
import Chat from "pages/Chat";
import Order from "pages/Order";
import Profile from "pages/Profile";
import ProductSearch from "pages/ProductSearch";
import ForgotPassword from "pages/ForgotPassword";
import ConfirmOTP from "pages/ConfirmOTP";
import ChangePass from "pages/ChangePass";
// import MessengerCustomerChat from "react-messenger-customer-chat";
function App() {
  const [width, setWidth] = useState(undefined);
  const dispatch = useDispatch();
  const isMobile = useSelector((state) => state.stateDevide.isMobile);
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    if (width >= TABLET_BREAKPOINT) {
      dispatch(setIsMobile(false));
    } else {
      dispatch(setIsMobile(true));
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);
  return (
    <div
      className={`w-full overflow-x-hidden ${
        isMobile
          ? `max-w-[${PHONE_BREAKPOINT}]`
          : `max-w-[${TABLET_BREAKPOINT}]`
      }`}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Product />} />
        <Route path="/products/:id" element={<Detail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search/:search" element={<ProductSearch />} />
        <Route path="/thanks" element={<ThankYou />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/confirm" element={<ConfirmOTP />} />
        <Route path="/changePassword" element={<ChangePass />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
