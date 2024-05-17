import React from "react";
import { Routes, Route } from "react-router-dom";
import HeroSection from "./Section/Hero";
import Navbar from "./Section/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const MyComponent = () => {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" element={<HeroSection />} />
			</Routes>
		</>
	);
};

export default MyComponent;
