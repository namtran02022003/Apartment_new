import { useState, FC, ChangeEvent, useEffect } from 'react'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { InputStyled } from '../../assets/styles/Input'
import AlertMessage from '../alertMessage/AlertMessage'
import { Forms } from '../../assets/styles/Forms'
import styled from 'styled-components'
import baseAxios from '../../apis/ConfigAxios'
import { ValidateUser } from './Validates'
const ImgFormStyled = styled.div`
  min-height: 188px;
  text-align: center;
  img {
    border-radius: 50%;
    width: 11rem;
    height: 11rem;
    object-fit: cover;
  }
  input {
    visibility: hidden;
    display: none;
  }
  label {
    background: green;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    color: #fff;
  }
`
interface SignUpProps {
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  setId: React.Dispatch<React.SetStateAction<string>>
  show: boolean
  id?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getUsers: any
  setShowMes: React.Dispatch<React.SetStateAction<boolean>>
  setMess: React.Dispatch<React.SetStateAction<string>>
}
interface User {
  userName: string
  email: string
  firstName: string
  lastName: string
  middleName: string
  password: string
  imageUrl: string
  tokenKey: string
  id: number
}
const CreateUser: FC<SignUpProps> = ({ setShow, show, id, getUsers, setId, setShowMes, setMess }) => {
  const [typeInput, setTypeInput] = useState(true)
  const [showMessage, setShowMessage] = useState(false)
  const [file, setFile] = useState<string>('')
  const [user, setUser] = useState<User>({
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    password: '',
    userName: '',
    imageUrl: '',
    tokenKey: '',
    id: 0
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [errors, setError] = useState<any>({})
  const onSubmit = async () => {
    const type = id ? false : true
    if (!(Object.keys(ValidateUser(user, setError, type)).length > 0)) {
      const userData = {
        tokenKey: `${JSON.parse(localStorage.getItem('user') || '')?.tokenKey}`,
        imageUrl: file || user.imageUrl,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        middleName: user.middleName,
        password: id ? '' : user.password,
        id: user.id
      }
      await baseAxios.post(`/users/insert-update`, userData)
      getUsers()
      setMess(id ? 'Edit success' : 'Create success')
      setShowMes(true)
      setShow(!show)
      if (id) {
        setId('')
      }
    }
  }
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setFile(String(reader?.result))
      }
    }
  }
  useEffect(() => {
    const getUser = async () => {
      const res = await baseAxios.get(`/users/${id}`)
      if (res.status == 200) {
        setUser(res.data.item)
      }
    }
    if (id) {
      getUser()
    }
  }, [id])
  console.log(id)
  console.log(user.imageUrl)
  return (
    <Forms className="bg-form">
      {showMessage && <AlertMessage color={'green'} message={'ok'} show={showMessage} setShow={setShowMessage} />}
      <div className="w-75 form-content bg-white rounded-3 animate">
        <h5 className="title_page px-3 rounded-3 py-2 bg-heading-table pt-2">{id ? 'Edit' : 'Create new'} user</h5>
        <div className="p-3">
          <form className="p-3 login">
            <div className="row">
              <div className="col-6">
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="firstName">
                    First Name:
                    <span className="color-red">*</span>
                  </label>
                  <InputStyled
                    id="firstName"
                    type="text"
                    placeholder="Enter First Name"
                    value={user.firstName}
                    maxLength={50}
                    onChange={(e) => {
                      setUser({ ...user, firstName: e.target.value })
                      setError({ ...errors, firstName: '' })
                    }}
                  />
                  {errors.firstName && <p className="m-0 message_form">{errors.firstName}</p>}
                </div>
                <div className="my-2 position-relative">
                  <label htmlFor="middleName">
                    Middle Name:
                    <span className="color-red">*</span>
                  </label>
                  <InputStyled
                    value={user.middleName}
                    maxLength={50}
                    onChange={(e) => {
                      setUser({ ...user, middleName: e.target.value })
                      setError({ ...errors, middleName: '' })
                    }}
                    id="middleName"
                    type="text"
                    placeholder="Enter Middle Name"
                  />
                  {errors.middleName && <p className="m-0 message_form">{errors.middleName}</p>}
                </div>
                <div className="my-2 position-relative">
                  <label htmlFor="lastName">
                    Last Name:
                    <span className="color-red">*</span>
                  </label>
                  <InputStyled
                    id="lastName"
                    maxLength={50}
                    value={user.lastName}
                    onChange={(e) => {
                      setUser({ ...user, lastName: e.target.value })
                      setError({ ...errors, lastName: '' })
                    }}
                    type="text"
                    placeholder="Enter Last Name"
                  />
                  {errors.lastName && <p className="m-0 message_form">{errors.lastName}</p>}
                </div>
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="username">
                    Username:
                    <span className="color-red">*</span>
                  </label>
                  <InputStyled
                    disabled={!!id}
                    maxLength={250}
                    value={user.userName}
                    onChange={(e) => {
                      setUser({ ...user, userName: e.target.value })
                      setError({ ...errors, userName: '' })
                    }}
                    id="usernemr"
                    type="text"
                    placeholder="Enter Username"
                  />
                  {errors.userName && <p className="m-0 message_form">{errors.userName}</p>}
                </div>
              </div>
              <div className="col-6">
                <ImgFormStyled className="avatar-form position-relative text-center">
                  {<img src={file || user.imageUrl} alt="avatar" />}
                  <div>
                    <label htmlFor="file">Choose avatar</label>
                    <input id="file" type="file" onChange={(e) => handleImageChange(e)} title="enter file" />
                  </div>
                </ImgFormStyled>
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="email">
                    Email:
                    <span className="color-red">*</span>
                  </label>
                  <InputStyled
                    disabled={!!id}
                    maxLength={250}
                    value={user.email}
                    onChange={(e) => {
                      setUser({ ...user, email: e.target.value })
                      setError({ ...errors, email: '' })
                    }}
                    id="email"
                    type="text"
                    placeholder="Enter Email"
                  />
                  {errors.email && <p className="m-0 message_form">{errors.email}</p>}
                </div>
                <div className="my-2 position-relative">
                  <label htmlFor="password">
                    Password:
                    <span className="color-red">*</span>
                  </label>
                  <InputStyled
                    disabled={!!id}
                    value={id ? '' : user.password}
                    onChange={(e) => {
                      setUser({ ...user, password: e.target.value })
                      setError({ ...errors, password: '' })
                    }}
                    id="password"
                    type={typeInput ? 'password' : 'text'}
                    placeholder="Enter Password"
                  />
                  <FontAwesomeIcon
                    onClick={() => {
                      setTypeInput(!typeInput)
                    }}
                    className="icon-eye-password"
                    icon={faEye}
                  />
                  {errors.password && <p className="m-0 message_form">{errors.password}</p>}
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end mt-3">
              <button
                onClick={() => {
                  setShow(!show)
                  setFile('')
                  setId('')
                }}
                type="button"
                className="mx-3 btn border"
              >
                Cancel
              </button>
              <button onClick={onSubmit} type="button" className="btn mx-3  btn-success">
                {id ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Forms>
  )
}

export default CreateUser
