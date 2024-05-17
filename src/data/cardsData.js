import employeeData from "./employee_data.json";

// Function to shuffle an array using Fisher-Yates algorithm
function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

// Shuffle the employeeData array
const shuffledEmployeeData = shuffleArray(employeeData);

// Map the shuffled employeeData to cardsData
const cardsData = shuffledEmployeeData.map((employee, index) => ({
	id: index + 1,
	imageSrc: `https://pictureapi.pea.co.th/MyphotoAPI/api/v1/Main/GetPicImg?EmpCode=${employee.pea_id}&Type=2&SType=2`,
	title: `${employee.pea_id}`,
	description: `${employee.name}`,
	buttonText: "Vote",
}));

export { cardsData };
