import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  body {
    font-family: Nunito,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .shadow {
    box-shadow: 0 .15rem 1.75rem 0 rgba(58,59,69,.15)!important;
  }
  a {
    color: white;
    text-decoration: none;
  }
  h1,h2,h3,h4,h5,h6,p {
    margin: 0;
  }
  .err-message {
    color: red;
    font-size: 0.9rem;
  }
  * {
    box-sizing: border-box;
  }
  sub {
    vertical-align: super;
  }
  tr {
    color: #858796;
  }
  th {
    padding: 10px !important;
    border-bottom: 3px solid #e3e6f0 !important;
    border-top: 3px solid #e3e6f0 !important;
  }
  table {
    border-bottom: 3px solid #e3e6f0 !important;
  }
  .td-action {
    button {
      svg {
        font-size: 0.8rem;
      }
    }
  }
  .btn-delete {
    background: #e77984;
    border: 1px solid red;
    color: #fff;
    padding: 0 15px;
    border-radius: 3px;
    &:hover {
      background: rgb(219 51 68);
    }
  }.btn-edit {
    background: rgb(109 191 112);
    border: 1px solid green;
    color: #fff;
    padding: 0 15px;
    border-radius: 3px;
    &:hover {
      background: rgb(47 155 51);
    }
  }
`
export default GlobalStyles
