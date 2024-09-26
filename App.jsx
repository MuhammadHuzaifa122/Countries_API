import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { useState } from "react";
import "./style.css";


export default function App() {
  const [isDark, setisDark] = useState(
    JSON.parse(localStorage.getItem("isDarkMode"))
  );
  return (
    <>
      <Header theme={[isDark, setisDark]} />
      <Outlet context={[isDark, setisDark]} />
    </>
  );
}
