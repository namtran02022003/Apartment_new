import { useForm } from 'react-hook-form'
import { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUser, faEye } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import { InputStyled } from '../form/Input'
import { ButtonSubmit } from '../../assets/styles/Buttons'
import AlertMessage from '../alertMessage/AlertMessage'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export const LoginStyled = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  .title_page {
    color: #0e0d0d !important;
  }
  .title_page::after {
    content: '';
    display: block;
    clear: both;
    width: 350px;
    height: 2px;
    background-color: red;
    margin: 5px auto;
  }
  .login {
    border-radius: 10px;
    padding: 10px;
    box-shadow: rgb(100 100 111 / 20%) 0px 7px 29px 0px;
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
  .text-center .title_page {
    margin: 20px 0 30px 0;
  }
  .list_icons img {
    border-radius: 50%;
    margin: 20px 10px;
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
    border-radius: 0 50px 50px 0;
  }
  .icon-eye-password:hover {
    background: #ccc;
  }
`
export default function Login() {
  const refMessage = useRef()
  const [typeInput, setTypeInput] = useState(true)
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')
  const Navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const onSubmit = async (data: unknown) => {
    try {
      const res = await axios.post(`http://localhost:8088/v1/users/login`, data)
      console.log(res)
      if (res.data.errorCode == 0 && res.data.success) {
        const dataUser = {
          tokenKey: res.data.item.tokenKey,
          fullName: res.data.item.fullName
        }
        console.log(dataUser)
        await localStorage.setItem('user', JSON.stringify(dataUser))
        Navigate('/')
      } else {
        setMessage(res.data.message)
        setShowMessage(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <LoginStyled className="bg-form">
      {showMessage && <AlertMessage color={'red'} message={message} show={showMessage} setShow={setShowMessage} />}
      <div className=" container form-content">
        <div className="row px-3">
          <div className="col-lg-6 d-none d-lg-block ">
            <div className="p-3">
              <img
                className="login-left-img"
                src="https://img.trackhs.com/600/https://track-pm.s3.amazonaws.com/brett-robinson/image/c43c4d2b-60d4-46cf-bd3b-56a0e98084b2"
                alt="img"
              />
            </div>
          </div>

          <div className="col-sm-12 col-lg-6">
            <div className="text-center">
              <h2 className="title_page">Login form</h2>
            </div>
            <div className="p-3">
              <form className="p-3 login" onSubmit={handleSubmit(onSubmit)}>
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="username">
                    <FontAwesomeIcon className="me-2 opacity-50" icon={faUser} />
                    Username:
                  </label>
                  <InputStyled
                    id="usernemr"
                    type="text"
                    placeholder="Enter Username"
                    {...register('userName', {
                      required: true,
                      minLength: 5
                    })}
                  />
                  {errors.userName?.type === 'minLength' && <p className="m-0 message_form">Username must be at least 8 characters long</p>}
                  {errors.userName?.type === 'required' && <p className="m-0 message_form">Please enter your username</p>}
                </div>
                <div className="my-2 position-relative">
                  <label htmlFor="password">
                    <FontAwesomeIcon className="me-2 opacity-50" icon={faLock} />
                    Password:
                  </label>
                  <InputStyled
                    id="password"
                    type={typeInput ? 'password' : 'text'}
                    placeholder="Enter Password"
                    {...register('password', {
                      required: true,
                      minLength: 8
                    })}
                  />
                  <FontAwesomeIcon
                    onClick={() => {
                      setTypeInput(!typeInput)
                    }}
                    className="icon-eye-password"
                    icon={faEye}
                  />
                  {errors.password?.type === 'minLength' && <p className="m-0 message_form">Password must be at least 8 characters long</p>}
                  {errors.password?.type === 'required' && <p className="m-0 message_form">Please enter your pasword</p>}
                </div>
                <div className="text-center">
                  <span>{refMessage.current}</span>
                </div>
                <div className="text-center">
                  <ButtonSubmit type="submit">Login</ButtonSubmit>
                </div>
                <p>Or signup using:</p>
                <button onClick={() => Navigate('/signup')} type="button" className="btn">
                  signup
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </LoginStyled>
  )
}
