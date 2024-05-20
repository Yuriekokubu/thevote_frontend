import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
	text-decoration: none;

	&:hover {
		text-decoration: none;
	}

	&:focus {
		outline: none;
		text-decoration: none;
	}
`;

export default StyledLink;
