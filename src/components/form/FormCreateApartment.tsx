import { useForm } from 'react-hook-form'
import { FC, useEffect, useState } from 'react'
import { InputStyled } from '../../assets/styles/Input'
import AlertMessage from '../alertMessage/AlertMessage'
import { Forms } from '../../assets/styles/Forms'
import styled from 'styled-components'
import Select from 'react-select'
const SelectStyled = styled.select`
  width: 100%;
  padding: 9px 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  &:focus-within {
    outline: 0.5px solid rgb(202, 183, 183);
  }
`
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
interface DataBuildingName {
  label: string
  value: string
}
const FormCreateApartment: FC<SignUpProps> = ({ show, setShow, id }) => {
  const [showMessage, setShowMessage] = useState(false)
  const [errbdName, setErrBdName] = useState('')
  const [dataBuildingName, setDataBuildingName] = useState<Array<DataBuildingName>>([])
  const [buildingName, setBuildingName] = useState({
    value: '',
    label: ''
  })
  useEffect(() => {
    const dataFake = [{ value: 'value1', label: 'label1' }]
    setDataBuildingName(dataFake)
  }, [])
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const onSubmit = async (data: unknown) => {
    console.log(buildingName)
    if (buildingName.label && buildingName.value) {
      console.log(data)
      setShowMessage(true)
    } else {
      setErrBdName('Please enter your Building name')
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hanDleChangeBuildingName = (e: any) => {
    setErrBdName('')
    setBuildingName(e)
  }
  console.log(buildingName)
  return (
    <Forms className="bg-form">
      {showMessage && <AlertMessage color={'green'} message="ok" show={showMessage} setShow={setShowMessage} />}
      <div className="w-75 animate bg-white rounded-3 form-content">
        <h5 className="title_page px-3 rounded-3 py-2 bg-heading-table pt-2">{id ? 'Edit' : 'Create new'} Apartment</h5>
        <div>
          <form className="p-3 login" onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-6">
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="apartmentCode">
                    Apartment Code:
                    <span className="color-red">*</span>
                  </label>
                  <InputStyled
                    id="apartmentCode"
                    type="text"
                    placeholder="Enter Apartment Code"
                    {...register('apartmentCode', {
                      required: true,
                      maxLength: 50,
                      min: 1
                    })}
                  />
                  {errors.apartmentCode?.type === 'min' && <p className="m-0 message_form">Please enter your Apartment Code</p>}
                  {errors.apartmentCode?.type === 'required' && <p className="m-0 message_form">Please enter your Apartment Code</p>}
                  {errors.apartmentCode?.type === 'maxLength' && <p className="m-0 message_form">Apartment Code must be no more than 50 characters long</p>}
                </div>
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="apartmentName">
                    Apartment Name:
                    <span className="color-red">*</span>
                  </label>
                  <InputStyled
                    id="apartmentName"
                    type="text"
                    placeholder="Enter Apartment Name"
                    {...register('apartmentName', {
                      required: true,
                      maxLength: 250,
                      min: 1
                    })}
                  />
                  {errors.apartmentName?.type === 'min' && <p className="m-0 message_form">Please enter your Apartment Name</p>}
                  {errors.apartmentName?.type === 'maxLength' && <p className="m-0 message_form">Apartment Name must be no more than 250 characters long</p>}
                  {errors.apartmentName?.type === 'required' && <p className="m-0 message_form">Please enter your Apartment Name</p>}
                </div>
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="location">Location:</label>
                  <InputStyled id="location" type="text" placeholder="Enter Location" {...register('location')} />
                </div>
              </div>
              <div className="col-6">
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
                  <label htmlFor="roomNumber">Room Number:</label>
                  <InputStyled min="0" id="roomNumber" type="number" placeholder="Enter Room Number" {...register('roomNumber')} />
                </div>
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="apartmentType">Apartment Type</label>
                  <SelectStyled id="apartmentType" defaultValue={1} title="Apartment type">
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                  </SelectStyled>
                </div>
              </div>
              <div className="position-relative pb-1">
                <label htmlFor="buildingname">Building Name</label>
                <Select value={buildingName} options={dataBuildingName} onChange={(e) => hanDleChangeBuildingName(e)} id="buildingname" />
                {errbdName && <p className="m-0 message_form">{errbdName}</p>}
              </div>
              <div className="position-relative">
                <label htmlFor="note">Note:</label>
                <TextareaStyled id="note" placeholder="Enter Note" {...register('note')} />
              </div>
              <div className="position-relative">
                <label htmlFor="address">Address:</label>
                <TextareaStyled id="address" placeholder="Enter Address" {...register('address')} />
              </div>
            </div>
            <div className="d-flex justify-content-end mt-3">
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

export default FormCreateApartment
