import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { InputStyled } from '../form/Input'
import AlertMessage from '../alertMessage/AlertMessage'
import { Forms } from '../../assets/styles/Forms'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
const TextareaStyled = styled.textarea`
  width: 100%;
  padding: 10px;
  max-width: 100%;
  max-height: 70px;
  min-height: 70px;
  border-radius: 5px;
  border: 1px solid #ccc;
  &:focus-within {
    outline: 0.5px solid rgb(202, 183, 183);
  }
`
export default function FormCreateBuilding() {
  const [showMessage, setShowMessage] = useState(false)
  const Navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const onSubmit = async (data: unknown) => {
    console.log(data)
    setShowMessage(true)
  }

  return (
    <Forms className="bg-form bg-form-create">
      {showMessage && <AlertMessage color={'green'} message="ok" show={showMessage} setShow={setShowMessage} />}
      <div className="w-50 container bg-white rounded-3 form-content">
        <div className="text-center">
          <h2 className="title_page opacity-75">Create new Building</h2>
        </div>
        <div className="p-3">
          <form className="p-3 login" onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-6">
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="buildingCode">Building Code:</label>
                  <InputStyled
                    id="buildingCode"
                    type="text"
                    placeholder="Enter Building Code"
                    {...register('buildingCode', {
                      required: true,
                      maxLength: 250,
                      min: 1
                    })}
                  />
                  {errors.buildingCode?.type === 'min' && <p className="m-0 message_form">Please enter your building Code</p>}
                  {errors.buildingCode?.type === 'required' && <p className="m-0 message_form">Please enter your building Code</p>}
                  {errors.buildingCode?.type === 'maxLength' && <p className="m-0 message_form">building Code must be no more than 250 characters long</p>}
                </div>
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="buildingName">Building Name:</label>
                  <InputStyled
                    id="buildingName"
                    type="text"
                    placeholder="Enter Building Name"
                    {...register('buildingName', {
                      required: true,
                      maxLength: 50,
                      min: 1
                    })}
                  />
                  {errors.buildingName?.type === 'min' && <p className="m-0 message_form">Please enter your Building Name</p>}
                  {errors.buildingName?.type === 'maxLength' && <p className="m-0 message_form">Building Name must be no more than 250 characters long</p>}
                  {errors.buildingName?.type === 'required' && <p className="m-0 message_form">Please enter your Building Name</p>}
                </div>
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="numberFloors">Number of floors:</label>
                  <InputStyled id="numberFloors" type="number" min="0" placeholder="Enter Last Name" {...register('numberFloors')} />
                </div>
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="address">Address:</label>
                  <TextareaStyled id="address" placeholder="Enter Address" {...register('address')} />
                </div>
              </div>
              <div className="col-6">
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="height">Height:</label>
                  <InputStyled id="height" type="text" placeholder="Enter Height" {...register('height')} />
                </div>
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="acreage">Acreage:</label>
                  <InputStyled
                    id="acreage"
                    type="text"
                    placeholder="Enter Acreage"
                    {...register('acreage', {
                      maxLength: 250
                    })}
                  />
                  {errors.acreage?.type === 'maxLength' && <p className="m-0 message_form">Acreage must be no more than 250 characters long</p>}
                </div>
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="numberApartment">Number of Apartment:</label>
                  <InputStyled min="0" id="numberApartment" type="number" placeholder="Enter Username" {...register('numberApartment')} />
                </div>
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="note">Note:</label>
                  <TextareaStyled id="note" placeholder="Enter Note" {...register('note')} />
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div>
                <button onClick={() => Navigate('/')} className="btn btn-primary">
                  Back to home
                </button>
              </div>
              <div>
                <button type="button" className="mx-3 btn border">
                  Cancel
                </button>
                <button type="submit" className="btn mx-3  btn-success">
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Forms>
  )
}
