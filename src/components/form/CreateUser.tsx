import { useForm } from 'react-hook-form'
import { useState, FC, ChangeEvent } from 'react'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { InputStyled } from './Input'
import AlertMessage from '../alertMessage/AlertMessage'
import { Forms } from '../../assets/styles/Forms'
import styled from 'styled-components'
interface SignUpProps {
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  show: boolean
  id?: string
}
const ImgFormStyled = styled.div`
  min-height: 188px;
  text-align: center;
  img {
    border-radius: 50%;
    width: 11rem;
    height: 11rem;
    object-fit: cover;
  }
`
const CreateUser: FC<SignUpProps> = ({ setShow, show, id }) => {
  console.log('idddddddddddddddddd', id)
  const [typeInput, setTypeInput] = useState(true)
  const [showMessage, setShowMessage] = useState(false)
  const [file, setFile] = useState<string>('')
  // const [message, setMessage] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const onSubmit = async (data: unknown) => {
    // const res = await axios.post(`http://localhost:8088/v1/users/login`, data)
    // console.log(res)
    console.log(data)
    setShowMessage(true)
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
  return (
    <Forms className="bg-form">
      {showMessage && <AlertMessage color={'green'} message="ok" show={showMessage} setShow={setShowMessage} />}
      <div className="w-75 form-content bg-white rounded-3 animate">
        <h5 className="title_page px-3 rounded-3 py-2 bg-heading-table pt-2">{id ? 'Edit' : 'Create new'} user</h5>
        <div className="p-3">
          <form className="p-3 login" onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-6">
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="firstName">First Name:</label>
                  <InputStyled
                    id="firstName"
                    type="text"
                    placeholder="Enter First Name"
                    {...register('firstName', {
                      required: true,
                      maxLength: 250,
                      min: 1
                    })}
                  />
                  {errors.firstName?.type === 'min' && <p className="m-0 message_form">Please enter your first Name</p>}
                  {errors.firstName?.type === 'required' && <p className="m-0 message_form">Please enter your first Name</p>}
                  {errors.firstName?.type === 'maxLength' && <p className="m-0 message_form">first Name must be no more than 250 characters long</p>}
                </div>
                <div className="my-2 position-relative">
                  <label htmlFor="middleName">Middle Name:</label>
                  <InputStyled
                    id="middleName"
                    type="text"
                    placeholder="Enter Middle Name"
                    {...register('middleName', {
                      required: true,
                      maxLength: 50
                    })}
                  />
                  {errors.middleName?.type === 'maxLength' && <p className="m-0 message_form">Middle Name must be no more than 250 characters long</p>}
                  {errors.middleName?.type === 'required' && <p className="m-0 message_form">Please enter your Middle Name</p>}
                </div>
                <div className="my-2 position-relative">
                  <label htmlFor="lastName">Last Name:</label>
                  <InputStyled
                    id="lastName"
                    type="text"
                    placeholder="Enter Last Name"
                    {...register('lastName', {
                      required: true,
                      maxLength: 50
                    })}
                  />
                  {errors.lastName?.type === 'maxLength' && <p className="m-0 message_form">Last Name must be no more than 50 characters long</p>}
                  {errors.lastName?.type === 'required' && <p className="m-0 message_form">Please enter your Last Name</p>}
                </div>
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="username">Username:</label>
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
                <div className="my-4">
                  <input type="file" onChange={(e) => handleImageChange(e)} title="enter file" />
                </div>
              </div>
              <div className="col-6">
                <ImgFormStyled className="avatar-form">{file && <img src={file} alt="avatar" />}</ImgFormStyled>
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="email">Email:</label>
                  <InputStyled
                    id="email"
                    type="text"
                    placeholder="Enter Email"
                    {...register('email', {
                      required: true,
                      maxLength: 250,
                      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                    })}
                  />
                  {errors.email?.type === 'maxLength' && <p className="m-0 message_form">Email must be no more than 250 characters long</p>}
                  {errors.email?.type === 'required' && <p className="m-0 message_form">Please enter your email</p>}
                  {errors.email?.type === 'pattern' && <p className="m-0 message_form">Please enter correct email format</p>}
                </div>
                <div className="my-2 position-relative">
                  <label htmlFor="middleName">Password:</label>
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
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <button onClick={() => setShow(!show)} type="button" className="mx-3 btn border">
                Cancel
              </button>
              <button type="submit" className="btn mx-3  btn-success">
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
