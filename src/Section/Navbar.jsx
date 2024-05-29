import React from "react";
import styled from "styled-components";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import StyledLink from "../Component/StyledLink";

const linkStyles = `
    text-white hover:text-gray-300
`;

const StyledList = styled.ul`
	display: flex;
	gap: 1rem;
	margin-bottom: 0;
`;

function Navbar() {
	return (
		<nav className="bg-gray-800 p-3">
			<div className="container mx-auto flex justify-between items-center">
				<div className="flex items-center text-white font-bold text-lg">
					<CheckCircleIcon className="h-6 w-6 mr-2" /> {/* Add FireIcon with margin */}
					<StyledLink to="/" className={linkStyles}>
						The Vote
					</StyledLink>
				</div>
				<StyledList>
					<li>
						<StyledLink to="/" className={linkStyles}>
							หน้าหลัก
						</StyledLink>
					</li>
					<li>
						<StyledLink to="/about" className={linkStyles}>
							เกี่ยวกับ
						</StyledLink>
					</li>
					<li>
						<StyledLink to="/contact" className={linkStyles}>
							ติดต่อ
						</StyledLink>
					</li>
				</StyledList>
			</div>
		</nav>
	);
}

export default Navbar;
