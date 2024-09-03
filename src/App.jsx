
import Main from "./components/Main"
import ResumeViewer from "./components/ResumeViewer";

import { useEffect } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import { useEffect } from "react";
import MouseFollower from "./components/MouseFollower";
import Header from "./components/Header";
import About from "./components/About";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Resume from "./components/Resume";
import Footer from "./components/Footer";


function App() {
  async function initLocomotiveScroll() {
    const LocomotiveScroll = (await import("locomotive-scroll")).default;
    new LocomotiveScroll();
  }

  useEffect(() => {
    initLocomotiveScroll();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/resume" element={<ResumeViewer />} />      
      </Routes>
    </Router>
  );
}

export default App;
