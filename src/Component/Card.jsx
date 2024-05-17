import React from "react";
import Button from "react-bootstrap/Button";

function Card({ imageSrc, title, description, buttonText, onClick, btnColor = "primary", firstName, lastName, prefixGender }) {
	return (
		<div className="max-w-md bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 transform hover:-translate-y-2 hover:shadow-lg cursor-pointer">
			<div className="md:flex">
				{imageSrc && (
					<div className="md:flex-shrink-0">
						<img className="h-48 w-full object-cover md:w-48" src={imageSrc} alt="Card image" />
					</div>
				)}
				<div className="p-4 flex flex-col justify-between w-full">
					<div>
						<div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{title}</div>
						<div className="mt-2 text-gray-900 text-sm font-bold">
							{prefixGender} {firstName}
						</div>
						<div className="mt-2 text-gray-900 text-sm font-bold">{lastName}</div>
					</div>
					<div className="mt-auto">
						<Button variant={btnColor} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full" onClick={onClick}>
							{buttonText}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Card;
