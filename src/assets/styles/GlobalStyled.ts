import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Open Sans', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  a {
    color: white;
    text-decoration: none;
  }
  h1,h2,h3,h4,h5,h6,p {
    margin: 0;
  }
  .btn-create {
    &:hover {
      background : green;
    }
  }
  .err-message {
    color: red;
    font-size: 0.9rem;
  }
  * {
    box-sizing: border-box;
  }
`
export default GlobalStyles
