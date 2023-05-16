import styled from 'styled-components'
const Forms = styled.div`
  position: fixed;
  display: flex;
  -webkit-box-align: center;
  background: rgb(243 234 234 / 50%);
  align-items: center;
  z-index: 222;
  justify-content: center;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  .title_page {
    color: #084298;
    font-weight: bold;
  }
  .login {
    border-radius: 10px;
    padding: 10px;
  }
  .bg-form {
    background-color: rgb(235 230 226 / 49%);
    padding: 10px 0;
  }
  .form-content {
    color: #0e0d0d !important;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.6;
    box-shadow: rgb(100 100 111 / 20%) 0px 7px 29px 0px;
  }
  .login-left-img {
    object-fit: cover;
    width: 100%;
    height: 525px;
    border-radius: 5px;
  }
  .login label {
    margin: 15px 0 5px 0;
  }
  .text_a {
    margin: 15px 0;
  }
  .text_a a {
    text-decoration: none;
    color: #0e0d0d !important;
    margin: 15px 0;
  }
  .message_form {
    position: absolute;
    color: red;
    font-size: 0.9rem;
    padding-left: 20px;
  }
  .icon-eye-password {
    position: absolute;
    top: 56%;
    cursor: pointer;
    right: 0%;
    transform: translaeY(-50%);
    padding: 10px 20px;
    border-radius: 0 5px 5px 0;
  }
  .icon-eye-password:hover {
    background: #ccc;
  }
  .content-login {
    height: 350px !important;
  }
`

export { Forms }
