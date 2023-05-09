import { useForm } from 'react-hook-form'
import { useState, FC } from 'react'
import { InputStyled } from '../../assets/styles/Input'
import AlertMessage from '../alertMessage/AlertMessage'
import { Forms } from '../../assets/styles/Forms'
import styled from 'styled-components'
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
interface SignUpProps {
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  show: boolean
  id?: string
}
const FormCreateBuilding: FC<SignUpProps> = ({ show, setShow, id }) => {
  const [showMessage, setShowMessage] = useState(false)
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
      <div className="w-75 animate bg-white rounded-3 form-content">
        <h5 className="title_page px-3 rounded-3 py-2 bg-heading-table pt-2">{id ? 'Edit' : 'Create new'} Building</h5>
        <div className="p-3">
          <form className="p-3 login" onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-6">
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="buildingCode">
                    Building Code:
                    <span className="color-red">*</span>
                  </label>
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
                  <label htmlFor="buildingName">
                    Building Name:
                    <span className="color-red">*</span>
                  </label>
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
              </div>
              <div className="position-relative">
                <label htmlFor="address">Address:</label>
                <TextareaStyled id="address" placeholder="Enter Address" {...register('address')} />
              </div>
              <div className="position-relative">
                <label htmlFor="note">Note:</label>
                <TextareaStyled id="note" placeholder="Enter Note" {...register('note')} />
              </div>
            </div>
            <div className="d-flex justify-content-end mt-3">
              <div>
                <button onClick={() => setShow(!show)} type="button" className="mx-3 btn border">
                  Cancel
                </button>
                <button type="submit" className="btn mx-3  btn-success">
                  {id ? 'Update' : 'Create'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Forms>
  )
}

export default FormCreateBuilding
