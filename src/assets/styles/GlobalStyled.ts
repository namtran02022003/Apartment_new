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
  .color-table {
    color: #858796;
  }
  th {
    padding: 10px !important;
    border-bottom: 3px solid #e3e6f0 !important;
    border-top: 2px solid #e3e6f0 !important;
  }
  table {
    border-bottom: 3px solid #e3e6f0 !important;
    td {
      padding: 0.75rem !important;
    }
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
    padding: 5px 10px;
    border-radius: 3px;
    cursor: pointer;
    &:hover {
      background: rgb(219 51 68);
    }
  }.btn-edit {
    background: rgb(109 191 112);
    border: 1px solid green;
    color: #fff;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 3px;
    &:hover {
      background: rgb(47 155 51);
    }
  }
  input::placeholder {
    opacity: 0.9;
  }
  select::placeholder {
    opacity: 0.5;
  } 
  .bg-form-create {
    background: #f3eded;
  }
  .bg-heading-table {
    background: #f8f9fc;
    border-bottom: 1px solid #e3e6f0;
  }
  .animate {
    -webkit-animation: animatezoom 0.6s;
    animation: animatezoom 0.6s;
  }
  @-webkit-keyframes animatezoom {
    from {
      -webkit-transform: scale(0);
    }
    to {
      -webkit-transform: scale(1);
    }
  }
  @keyframes animatezoom {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }
  thead {
    position: sticky;
    top: -1px;
    z-index: 122;
    background: #fff;
    border-bottom: 2px solid #ccc;
    tr {
      box-shadow: inset -2px 4px 10px -10px rgba(0, 0, 0, 0.5), inset -1px -4px 10px -10px rgba(0, 0, 0, 0.5);
    }
  }
  .table-bottom {
    position: sticky;
    padding-top: 10px;
    bottom: 0px;
    box-shadow: 0px -1px 0px 0px rgb(227 204 204 / 50%);
    background: rgb(255, 255, 255);
  }
  .table-scroll {
    height: 76vh;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      width: 8px;
      background-color: #f5f5f5;
    }
    
    ::-webkit-scrollbar-thumb {
      background-color: #aaa;
      border-radius: 10px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background-color: #555;
    }
    
    /* Firefox */
    ::-moz-scrollbar {
      width: 8px;
      background-color: #f5f5f5;
    }
    
    ::-moz-scrollbar-thumb {
      background-color: #aaa;
      border-radius: 10px;
    }
    
    ::-moz-scrollbar-thumb:hover {
      background-color: #555;
    }
    
    /* Edge */
    ::-ms-scrollbar {
      width: 8px;
      background-color: #f5f5f5;
    }
    
    ::-ms-scrollbar-thumb {
      background-color: #aaa;
      border-radius: 10px;
    }
    
    ::-ms-scrollbar-thumb:hover {
      background-color: #555;
    }
  }
  .color-red {
    color: red;
  }
`
export default GlobalStyles
