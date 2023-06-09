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
    text-align: center;
    white-space: nowrap;
  }
  table {
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
  }
  .btn-check-contract {
    background: rgb(94 195 61);
    border: 1px solid green;
    color: #fff;
    padding: 5px 10px;
    border-radius: 3px;
    cursor: pointer;
    &:hover {
      background: rgb(108 167 88);
    }
  }
  .btn-remove-contract {
    background: rgb(94 195 61);
    border: 1px solid green;
    color: #fff;
    padding: 5px 10px;
    border-radius: 3px;
    cursor: pointer;
    &:hover {
      background: rgb(108 167 88);
    }
  }
  .btn-edit {
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
    border-bottom: 1px solid #ccc;
  }
  .table-bottom {
    position: sticky;
    padding-top: 10px;
    padding-bottom: 10px;
    bottom: 0px;
    box-shadow: 0px -1px 0px 0px rgb(227 204 204 / 50%);
    background: rgb(255, 255, 255);
  }
  .color-red {
    color: red;
  }
  td {
    white-space: nowrap;
  }
  .table-scroll-x {
    overflow-x: auto;
    ::-webkit-scrollbar {
      width: 8px;
      background-color: #f5f5f5;
      height: 10px;
    }
    
    ::-webkit-scrollbar-thumb {
      background-color: #aaa;
      border-radius: 10px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background-color: #555;
    }
  }
  // .t-stiky {
  //   position: sticky;
  //   right: 0;
  //   background: white;
  //   z-index: 555;
  // }
  .table-scroll-y, table-scroll {
    height: 68vh;
    overflow-y: auto;
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
  }
  .round-top {
    border-radius: 10px 10px 0 0;
  }
  .select-show-item-page {
    border: 1px solid #6666;
    border-radius: 3px;
    cursor: pointer;
    &:focus-within {
      outline: 1px solid #ccc;
    }
  }
  .select-fee {
    width: 200px;
    z-index: 221;
  }
  .table-scroll {
    padding-bottom: 2px;
    &-content {
      overflow-x: auto !important; 
      width: 1272px;
      ::-webkit-scrollbar {
        height: 8px;
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
    }
  }
  .flex-grow-02 {
    flex-grow: 0.2 !important;
}
`
export default GlobalStyles
