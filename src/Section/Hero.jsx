import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Card from "../Component/Card";
import VoteModal from "../Component/VoteModal";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { BarLoader } from "react-spinners";
import { css } from "@emotion/react";

const API_URL = process.env.REACT_APP_API_URL;

function HeroSection() {
	const navigate = useNavigate();
	const [showModal, setShowModal] = useState(false);
	const [modalContent, setModalContent] = useState({});
	const [selectedVoteId, setSelectedVoteId] = useState(null);
	const [employeesData, setEmployeesData] = useState(null);
	const [error, setError] = useState(null);
	const [shuffledData, setShuffledData] = useState([]);
	const [loading, setLoading] = useState(true);

	const handleClose = () => setShowModal(false);

	const override = css`
		width: 100% !important;
	`;

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const value = params.get("v");

		if (value) {
			localStorage.setItem("jwt", value);
		}

		// Clear the path
		navigate("/");
	}, [navigate]);

	useEffect(() => {
		if (employeesData) {
			const shuffled = shuffleArray(employeesData);
			setShuffledData(shuffled);
			setLoading(false);
		}
	}, [employeesData]);

	useMemo(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`${API_URL}/getUsers`);
				setEmployeesData(response.data);
			} catch (error) {
				setError(error);
			}
		};

		return fetchData();
	}, []);

	if (error) return <div>Error fetching data</div>;
	if (loading) return <BarLoader color={"#36D7B7"} loading={loading} css={override} />;
	if (!employeesData) return <div>Loading...</div>;

	const cardsData = shuffledData.map((employee, index) => {
		let nameParts = employee.username.split(" ");
		let prefixGender = nameParts[0];
		let firstName = nameParts[1];
		let lastName = nameParts[2];

		return {
			id: index + 1,
			imageSrc: `https://pictureapi.pea.co.th/MyphotoAPI/api/v1/Main/GetPicImg?EmpCode=${employee.pea_id}&Type=2&SType=2`,
			emp_id: `${employee.pea_id}`,
			username: employee.username,
			firstName,
			lastName,
			prefixGender,
			description: `${employee.username}`,
			buttonText: "Vote",
		};
	});

	const handleVote = (votedForId, firstName, lastName) => {
		if (votedForId === "no vote") {
			setModalContent({ type: "confirm", message: "คุณต้องการยืนยันไม่ประสงค์โหวต?" });
		} else {
			setModalContent({ type: "confirm", message: `คุณต้องการโหวตเลือกคุณ ${firstName} ${lastName}?` });
		}
		setSelectedVoteId(votedForId);
		setShowModal(true);
	};

	const confirmVoteHandler = () => {
		const jwt = localStorage.getItem("jwt");

		if (!jwt) {
			console.error("JWT not found in localStorage");
			return;
		}

		let decodedJwt;
		try {
			decodedJwt = jwtDecode(jwt);
		} catch (error) {
			console.error("Error decoding JWT:", error);
			return;
		}

		const voterId = decodedJwt.pea_id;

		if (!voterId) {
			console.error("Invalid voter ID in JWT");
			return;
		}

		axios
			.post(
				`${API_URL}/vote`,
				{
					voterId: voterId,
					votedForId: selectedVoteId,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${jwt}`,
					},
				}
			)
			.then((response) => {
				if (response.status === 200) {
					setModalContent({ type: "success", message: "โหวตสำเร็จเรียบร้อย ขอบคุณครับ" });
				} else if (response.status === 400) {
					throw new Error(response.data.message || "Vote failed");
				} else {
					throw new Error("Network response was not ok");
				}
			})
			.catch((error) => {
				setModalContent({ type: "error", message: error.response?.data?.message || "Error voting. Please try again later." });
			})
			.finally(() => setShowModal(true));
	};

	return (
		<>
			<div className="banner">
				<div className="overlay"></div>
				<div className="container">
					<h1 className="banner-title">กองบริหารจัดการระบบวัดพลังงานไฟฟ้า</h1>
					<p className="banner-description">โครงการค้นหาบุคลากรมาสาย 3 อันดับแรก</p>
					<b>
						<p className="banner-description">ประจำเดือนพฤษภาคม</p>
					</b>
				</div>
			</div>
			<div className="m-3 p-3">
				<p>ลำดับในการจัดแสดงจะเป็นการสุ่ม</p>
			</div>
			<div className="container mt-2 pb-1 mb-5 pb-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
				<Card title={"ไม่ประสงค์โหวต"} buttonText={"No Vote"} onClick={() => handleVote("no vote")} btnColor="danger" />
				{cardsData.map((card) => (
					<div key={card.id} className="card-wrapper p-1">
						<Card
							imageSrc={card.imageSrc}
							description={card.description}
							buttonText={card.buttonText}
							onClick={() => handleVote(card.emp_id, card.firstName, card.lastName)}
							firstName={card.firstName}
							lastName={card.lastName}
							prefixGender={card.prefixGender}
						/>
					</div>
				))}
				<VoteModal show={showModal} onClose={handleClose} type={modalContent.type} message={modalContent.message} onConfirm={confirmVoteHandler} />
			</div>
		</>
	);
}

// Function to shuffle an array using Fisher-Yates algorithm
function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

export default HeroSection;
