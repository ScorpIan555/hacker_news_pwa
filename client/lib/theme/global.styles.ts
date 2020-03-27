import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
#_next {
	marging: 0px;
	padding: 0px;
}

html {
	font-size: 62.5%;
}

body {
		font-family: 'Open Sans Condensed';
		padding: 20px 40px;

		@media screen and (max-width: 800px) {
			padding: 10px;
		}
	}

	a {
		text-decoration: none;
		color: black;
	}

	* {
		box-sizing: border-box;
	}
`;
