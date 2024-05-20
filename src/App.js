import React from "react";
import { Routes, Route } from "react-router-dom";
import HeroSection from "./Section/Hero";
import Navbar from "./Section/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import VoteTotal from './pages/VoteTotal';
import "./App.css";

const MyComponent = () => {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" element={<HeroSection />} />
				<Route path="/voteTotal" element={<VoteTotal />} />
			</Routes>
		</>
	);
};

export default MyComponent;
