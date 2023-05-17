import { FC, useEffect, useState } from 'react'
import { InputStyled } from '../../assets/styles/Input'
import AlertMessage from '../alertMessage/AlertMessage'
import { Forms } from '../../assets/styles/Forms'
import styled from 'styled-components'
import Select from 'react-select'
import { ValidateApartment } from './Validates'
import baseAxios from '../../apis/ConfigAxios'
export const SelectStyled = styled.select`
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
  setShowMes: React.Dispatch<React.SetStateAction<boolean>>
  setId: React.Dispatch<React.SetStateAction<string>>
  setMess: React.Dispatch<React.SetStateAction<string>>
  show: boolean
  id?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getApartments: any
}
interface DataBuildingName {
  label: string
  value: string
}
const FormCreateApartment: FC<SignUpProps> = ({ show, setShow, id, getApartments, setId, setMess, setShowMes }) => {
  console.log('form create', id)
  const [showMessage, setShowMessage] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [errors, setError] = useState<any>({})
  const [typeApartments, setTypeApartments] = useState([])
  const [apartments, setApartments] = useState({
    apartmentCode: '',
    apartmentName: '',
    location: '',
    acreage: '',
    roomNumber: 0,
    apartmentTypeId: 1,
    note: '',
    address: '',
    buildingId: {
      label: '',
      value: ''
    },
    id: 0
  })
  const [dataBuildingName, setDataBuildingName] = useState<Array<DataBuildingName>>([])
  useEffect(() => {
    const getBuildingsName = async () => {
      const res = await baseAxios.get('/master-data/building')
      const dataOptionBuildingName = res.data.item.map((data: { id: string; name: string }) => {
        return {
          value: data.id,
          label: data.name
        }
      })
      setDataBuildingName(dataOptionBuildingName)
    }
    getBuildingsName()
  }, [])
  const onSubmit = async () => {
    if (!(Object.keys(ValidateApartment(apartments, setError)).length > 0)) {
      const newApartments = {
        ...apartments,
        buildingId: apartments.buildingId.value,
        roomNumber: apartments.roomNumber.toString()
      }
      try {
        await baseAxios.post('/apartment/insert-update', newApartments)
        getApartments()
        setMess(id ? 'Edit success' : 'Create success')
        setShowMes(true)
        setShow(!show)
        if (id) {
          setId('')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hanDleChangeBuildingName = (e: any) => {
    setApartments({
      ...apartments,
      buildingId: e
    })
    setError({ ...errors, buildingName: '' })
  }
  useEffect(() => {
    const getApartmentType = async () => {
      try {
        const res = await baseAxios.get('/master-data/apartment_type')
        const data = res.data.item
        setTypeApartments(data)
      } catch (error) {
        console.log(error)
      }
    }
    getApartmentType()
  }, [])
  useEffect(() => {
    const getApartment = async () => {
      const res = await baseAxios.get(`/apartment/${id}`)
      console.log(res)
      const preData = {
        ...res.data.item,
        buildingId: {
          value: res.data.item.buildingId,
          label: res.data.item.buildingName
        }
      }
      setApartments(preData)
    }
    if (id) {
      getApartment()
    }
  }, [id])
  return (
    <Forms className="bg-form">
      {showMessage && <AlertMessage color={'green'} message="ok" show={showMessage} setShow={setShowMessage} />}
      <div className="w-75 animate bg-white rounded-3 form-content">
        <h5 className="title_page px-3 rounded-3 py-2 bg-heading-table pt-2">{id ? 'Edit' : 'Create new'} Apartment</h5>
        <div>
          <form className="p-3 login">
            <div className="row">
              <div className="col-6">
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="apartmentCode">
                    Apartment Code:
                    <span className="color-red">*</span>
                  </label>
                  <InputStyled
                    disabled={!!id}
                    id="apartmentCode"
                    type="text"
                    placeholder="Enter Apartment Code"
                    value={apartments.apartmentCode}
                    maxLength={50}
                    onChange={(e) => {
                      setApartments({ ...apartments, apartmentCode: e.target.value })
                      setError({ ...errors, apartmentCode: '' })
                    }}
                  />
                  {errors.apartmentCode && <p className="m-0 message_form">{errors.apartmentCode}</p>}
                </div>
                <div className="position-relative pb-1">
                  <label htmlFor="buildingname">
                    Building Name
                    <span className="color-red">*</span>
                  </label>
                  <Select
                    placeholder="Select a building"
                    value={apartments.buildingId.value ? apartments.buildingId : 0}
                    options={dataBuildingName}
                    onChange={(e) => hanDleChangeBuildingName(e)}
                    id="buildingname"
                  />
                  {errors.buildingId && <p className="m-0 message_form">{errors.buildingId}</p>}
                </div>
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="acreage">
                    Acreage:
                    <span className="color-red">*</span>
                  </label>
                  <InputStyled
                    id="acreage"
                    type="text"
                    maxLength={50}
                    placeholder="Enter Acreage"
                    value={apartments.acreage}
                    onChange={(e) => {
                      setApartments({ ...apartments, acreage: e.target.value })
                      setError({ ...errors, acreage: '' })
                    }}
                  />
                  {errors.acreage && <p className="m-0 message_form">{errors.acreage}</p>}
                </div>
              </div>
              <div className="col-6">
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="apartmentName">
                    Apartment Name:
                    <span className="color-red">*</span>
                  </label>
                  <InputStyled
                    id="apartmentName"
                    type="text"
                    maxLength={250}
                    placeholder="Enter Apartment Name"
                    value={apartments.apartmentName}
                    onChange={(e) => {
                      setApartments({ ...apartments, apartmentName: e.target.value })
                      setError({ ...errors, apartmentName: '' })
                    }}
                  />
                  {errors.apartmentName && <p className="m-0 message_form">{errors.apartmentName}</p>}
                </div>
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="apartmentTypeId">Apartment Type</label>
                  <SelectStyled
                    id="apartmentTypeId"
                    value={apartments.apartmentTypeId}
                    onChange={(e) => {
                      setApartments({ ...apartments, apartmentTypeId: Number(e.target.value) })
                    }}
                    title="Apartment type"
                  >
                    {typeApartments.map((val: { id: number; name: string }) => {
                      return (
                        <option key={val.id} value={val.id}>
                          {val.name}
                        </option>
                      )
                    })}
                  </SelectStyled>
                </div>
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="roomNumber">Room Number:</label>
                  <InputStyled
                    min="0"
                    id="roomNumber"
                    type="number"
                    placeholder="Enter Room Number"
                    value={apartments.roomNumber}
                    onChange={(e) => {
                      setApartments({ ...apartments, roomNumber: Number(e.target.value) })
                    }}
                  />
                </div>
              </div>
              <div className="my-2 position-relative pb-1">
                <label htmlFor="location">Location:</label>
                <InputStyled
                  id="location"
                  type="text"
                  maxLength={500}
                  placeholder="Enter Location"
                  value={apartments.location}
                  onChange={(e) => {
                    setApartments({ ...apartments, location: e.target.value })
                  }}
                />
              </div>
              <div className="position-relative">
                <label htmlFor="address">Address:</label>
                <TextareaStyled
                  id="address"
                  placeholder="Enter Address"
                  value={apartments.address}
                  onChange={(e) => {
                    setApartments({ ...apartments, address: e.target.value })
                  }}
                />
              </div>
              <div className="position-relative">
                <label htmlFor="note">Note:</label>
                <TextareaStyled
                  id="note"
                  placeholder="Enter Note"
                  value={apartments.note}
                  onChange={(e) => {
                    setApartments({ ...apartments, note: e.target.value })
                  }}
                />
              </div>
            </div>
            <div className="d-flex justify-content-end mt-3">
              <button
                onClick={() => {
                  setShow(!show)
                  setId('')
                }}
                type="button"
                className="mx-3 btn border"
              >
                Cancel
              </button>
              <button onClick={() => onSubmit()} type="button" className="btn mx-3  btn-success">
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
