import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Noto Sans', sans-serif;
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
    display: block;
    margin: 20px auto;
    width: 60%;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background: #417c41;
    cursor: pointer;
    &:hover {
      background : green;
    }
  }
`
export default GlobalStyles
