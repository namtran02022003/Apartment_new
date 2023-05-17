import { useForm } from 'react-hook-form'
import { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUser, faEye } from '@fortawesome/free-solid-svg-icons'
import { Forms } from '../../assets/styles/Forms'
import { InputStyled } from '../../assets/styles/Input'
import { ButtonSubmit } from '../../assets/styles/Buttons'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { showToast } from '../toasts/ToastActions'
export default function Login() {
  const refMessage = useRef()
  const [typeInput, setTypeInput] = useState(true)
  const Navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const showToasts = (message: string, color: string) => {
    dispatch(
      showToast({
        message: message,
        color: color
      })
    )
  }
  const onSubmit = async (data: unknown) => {
    try {
      const res = await axios.post(`http://localhost:8088/v1/users/login`, data)
      if (res.data.errorCode == 0 && res.data.success) {
        const dataUser = {
          tokenKey: res.data.item.tokenKey,
          fullName: res.data.item.fullName
        }
        localStorage.setItem('user', JSON.stringify(dataUser))
        localStorage.setItem('isLogin', JSON.stringify('true'))
        Navigate('/')
      } else {
        showToasts(res.data.message, 'red')
      }
    } catch (error) {
      showToasts((error as Error).message, 'red')
    }
  }
  return (
    <Forms className="bg-form bg-white">
      <div className=" container form-content bg-white p-3 rounded-3">
        <div className="row px-3">
          <div className="col-lg-6 d-none d-lg-block ">
            <div className="p-3">
              <img
                className="login-left-img"
                src="data:image/jpeg;base64,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"
                alt="img"
              />
            </div>
          </div>
          <div className="col-sm-12 col-lg-6">
            <div className="text-center">
              <h2 className="title_page">Login form</h2>
            </div>
            <div className="p-3">
              <form className="p-3 login content-login shadow h-75" onSubmit={handleSubmit(onSubmit)}>
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="username">
                    <FontAwesomeIcon className="me-2 opacity-50" icon={faUser} />
                    Username:
                  </label>
                  <InputStyled
                    id="username"
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </Forms>
  )
}
