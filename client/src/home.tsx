import React from "react";
import { Navbar } from "./components/navigation/navbar";
import "./home.scss";
import logo_extended from "./assets/logo_extended.png";

function Home() {
  return (
    <div className="HomeWrapper">
      <link
        href="https://fonts.googleapis.com/css?family=Lexend"
        rel="stylesheet"
      />
      <Navbar />
      <div className="Home">
        <h1 className="title">Image Super-Resolution As a Service</h1>
        <h2 className="subtitle">ISAS Project</h2>
        <img src={logo_extended} alt="logo_extended" />
      </div>
    </div>
  );
}

export default Home;
