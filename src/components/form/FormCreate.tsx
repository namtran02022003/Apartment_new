import { FC, useEffect, MouseEvent } from 'react'
import { useForm } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import { InputStyled } from './Input'
const FormCreateStyled = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.5);
  .content {
    width: 80%;
    margin: auto;
    background: #fff;
  }
  .btn-close-form-create {
    top: 5%;
    padding: 10px;
    right: 2%;
    position: absolute;
  }
`
interface PropsFace {
  showForm: boolean
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>
}
const FormCreate: FC<PropsFace> = ({ showForm, setShowForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const onSubmit = (data: unknown) => {
    console.log(data)
  }
  useEffect(() => {
    const element: HTMLElement | null = document.querySelector('.modal-create')
    function closeItem(e: MouseEvent<HTMLDivElement>) {
      if (e.target === element) {
        setShowForm(!showForm)
      }
    }
    window.addEventListener('click', closeItem as unknown as EventListener)
    return () => {
      window.removeEventListener('click', closeItem as unknown as EventListener)
    }
  })

  return (
    <FormCreateStyled className="modal-create">
      <div className="content rounded-3">
        <form className="p-4 shadow position-relative" onSubmit={handleSubmit(onSubmit)}>
          <button onClick={() => setShowForm(!showForm)} className="btn btn-close-form-create btn-close" title="close"></button>
          <h3 className="text-center">Create</h3>
          <div className="row">
            <div className="col-6">
              <div className="my-2 position-relative pb-1">
                <label className="my-2" htmlFor="username">
                  <FontAwesomeIcon className="me-2 opacity-50" icon={faUser} />
                  Username:
                </label>
                <InputStyled
                  id="usernemr"
                  type="text"
                  placeholder="Enter Username"
                  {...register('user_name', {
                    required: true,
                    minLength: 8
                  })}
                />
                {errors.user_name?.type === 'minLength' && <p className="m-0 message_form">Username must be at least 8 characters long</p>}
                {errors.user_name?.type === 'required' && <p className="m-0 message_form">Please enter your username</p>}
              </div>
              <div className="my-2 position-relative pb-1">
                <label className="my-2" htmlFor="username">
                  <FontAwesomeIcon className="me-2 opacity-50" icon={faUser} />
                  Username:
                </label>
                <InputStyled
                  id="usernemr"
                  type="text"
                  placeholder="Enter Username"
                  {...register('user_name', {
                    required: true,
                    minLength: 8
                  })}
                />
                {errors.user_name?.type === 'minLength' && <p className="m-0 message_form">Username must be at least 8 characters long</p>}
                {errors.user_name?.type === 'required' && <p className="m-0 message_form">Please enter your username</p>}
              </div>
              <div className="my-2 position-relative pb-1">
                <label className="my-2" htmlFor="username">
                  <FontAwesomeIcon className="me-2 opacity-50" icon={faUser} />
                  Username:
                </label>
                <InputStyled
                  id="usernemr"
                  type="text"
                  placeholder="Enter Username"
                  {...register('user_name', {
                    required: true,
                    minLength: 8
                  })}
                />
                {errors.user_name?.type === 'minLength' && <p className="m-0 message_form">Username must be at least 8 characters long</p>}
                {errors.user_name?.type === 'required' && <p className="m-0 message_form">Please enter your username</p>}
              </div>
              <div className="my-2 position-relative pb-1">
                <label className="my-2" htmlFor="username">
                  <FontAwesomeIcon className="me-2 opacity-50" icon={faUser} />
                  Username:
                </label>
                <InputStyled
                  id="usernemr"
                  type="text"
                  placeholder="Enter Username"
                  {...register('user_name', {
                    required: true,
                    minLength: 8
                  })}
                />
                {errors.user_name?.type === 'minLength' && <p className="m-0 message_form">Username must be at least 8 characters long</p>}
                {errors.user_name?.type === 'required' && <p className="m-0 message_form">Please enter your username</p>}
              </div>
            </div>
            <div className="col-6">
              <div className="my-2 position-relative pb-1">
                <label className="my-2" htmlFor="username">
                  <FontAwesomeIcon className="me-2 opacity-50" icon={faUser} />
                  Username:
                </label>
                <InputStyled
                  id="usernemr"
                  type="text"
                  placeholder="Enter Username"
                  {...register('user_name', {
                    required: true,
                    minLength: 8
                  })}
                />
                {errors.user_name?.type === 'minLength' && <p className="m-0 message_form">Username must be at least 8 characters long</p>}
                {errors.user_name?.type === 'required' && <p className="m-0 message_form">Please enter your username</p>}
              </div>
              <div className="my-2 position-relative pb-1">
                <label className="my-2" htmlFor="username">
                  <FontAwesomeIcon className="me-2 opacity-50" icon={faUser} />
                  Username:
                </label>
                <InputStyled
                  id="usernemr"
                  type="text"
                  placeholder="Enter Username"
                  {...register('user_name', {
                    required: true,
                    minLength: 8
                  })}
                />
                {errors.user_name?.type === 'minLength' && <p className="m-0 message_form">Username must be at least 8 characters long</p>}
                {errors.user_name?.type === 'required' && <p className="m-0 message_form">Please enter your username</p>}
              </div>
              <div className="my-2 position-relative pb-1">
                <label className="my-2" htmlFor="username">
                  <FontAwesomeIcon className="me-2 opacity-50" icon={faUser} />
                  Username:
                </label>
                <InputStyled
                  id="usernemr"
                  type="text"
                  placeholder="Enter Username"
                  {...register('user_name', {
                    required: true,
                    minLength: 8
                  })}
                />
                {errors.user_name?.type === 'minLength' && <p className="m-0 message_form">Username must be at least 8 characters long</p>}
                {errors.user_name?.type === 'required' && <p className="m-0 message_form">Please enter your username</p>}
              </div>
              <div className="my-2 position-relative pb-1">
                <label className="my-2" htmlFor="username">
                  <FontAwesomeIcon className="me-2 opacity-50" icon={faUser} />
                  Username:
                </label>
                <InputStyled
                  id="usernemr"
                  type="text"
                  placeholder="Enter Username"
                  {...register('user_name', {
                    required: true,
                    minLength: 8
                  })}
                />
                {errors.user_name?.type === 'minLength' && <p className="m-0 message_form">Username must be at least 8 characters long</p>}
                {errors.user_name?.type === 'required' && <p className="m-0 message_form">Please enter your username</p>}
              </div>
            </div>
          </div>
          <div className="w-50 d-flex justify-content-around mt-3">
            <button className="btn btn-info px-4">xxx</button>
            <button className="btn btn-info px-4">xxx</button>
          </div>
        </form>
      </div>
    </FormCreateStyled>
  )
}

export default FormCreate
