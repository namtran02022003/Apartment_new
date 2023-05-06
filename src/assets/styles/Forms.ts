import styled from 'styled-components'
import backgroung_login from '../images/background_login.png'
const Formstyled = styled.div`
  background: rgb(204, 204, 204);
  height: 100vh;
  background-image: url(${backgroung_login});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  form {
    margin: auto;
    width: 700px;
    padding: 15px 30px;
    background: #fff;
    border-radius: 5px;
    h2 {
      padding: 30px 0;
      text-align: center;
    }
    .flex {
      width: 100%;
      display: flex;
      &-item {
        padding: 0 15px;
        flex: 1;
        .btn-option-flag {
          display: block;
          margin: auto;
        }
      }
    }
    label {
      display: block;
      margin: 15px 0 5px 0;
      font-weight: 600;
      color: #333;
    }
    #gender {
      display: flex;
      justify-content: space-around;
      span {
        display: flex;
        input {
          width: 17px;
          height: 17px;
          &:focus-within {
            outline: none;
          }
        }
      }
    }
    input,
    select {
      width: 100%;
      border: 1px solid #ccc;
      padding: 10px 15px;
      box-sizing: border-box;
      border-radius: 4px;
      &:focus-within {
        outline: 1px solid #ccc;
      }
    }
    .btn-create-person {
      border: none;
      border-radius: 4px;
      background: rgb(23, 53, 139);
      cursor: pointer;
      width: 50%;
      padding: 10px 15px;
      margin: 20px auto;
      display: block;
      color: #fff;
      cursor: pointer;
      &:hover {
        background: rgb(19 32 68);
      }
    }
  }
`

export default Formstyled
