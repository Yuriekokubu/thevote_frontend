import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./VoteTotal.css";
import Card from "../Component/Card_Realtime";

const socket = io(process.env.REACT_APP_API_URL);

function VoteTotal() {
	const [votes, setVotes] = useState([]);

	useEffect(() => {
		// Function to fetch initial data
		const fetchData = async () => {
			try {
				const response = await fetch(`${process.env.REACT_APP_API_URL}/total-votes`);
				const data = await response.json();
				console.log(data);
				setVotes(data.totalVotes);
			} catch (error) {
				console.error("Error fetching total votes:", error);
			}
		};

		// Call the function to fetch initial data
		fetchData();

		// Listen for new votes from socket.io
		socket.on("newVote", (vote) => {
			setVotes((prevVotes) => [vote, ...prevVotes]);
		});

		// Clean up socket.io listener
		return () => socket.off("newVote");
	}, []);

	return (
		<div className="App">
			<h1 className="title">Real-Time Votes</h1> {/* Apply margin and padding to the h1 element */}
			<div className="votes-grid">
				{votes.map((vote, index) => (
					<Card key={index}>
						<img
							src={`https://pictureapi.pea.co.th/MyphotoAPI/api/v1/Main/GetPicImg?EmpCode=${vote._id}&Type=2&SType=2`}
							alt={`Vote ${index + 1}`}
							style={{ width: "100%", height: "auto" }}
						/>
						<p>Voted ID: {vote._id}</p>
						<p>Total Votes: {vote.total_votes}</p>
					</Card>
				))}
			</div>
		</div>
	);
}

export default VoteTotal;
