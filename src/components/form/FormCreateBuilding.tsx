import { useState, FC, useEffect } from 'react'
import { InputStyled } from '../../assets/styles/Input'
import { Forms } from '../../assets/styles/Forms'
import styled from 'styled-components'
import { ValidateBuilding } from './Validates'
import baseAxios from '../../apis/ConfigAxios'
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
  getBuildings: any
}
const FormCreateBuilding: FC<SignUpProps> = ({ show, setShow, id, getBuildings, setId, setMess, setShowMes }) => {
  const [values, setValues] = useState({
    buildingCode: '',
    buildingName: '',
    numberOfFloors: 0,
    height: '',
    acreage: '',
    numberOfApartments: 0,
    note: '',
    address: ''
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [errors, setError] = useState<any>({})
  const onSubmit = async () => {
    if (!(Object.keys(ValidateBuilding(values, setError)).length > 0)) {
      await baseAxios.post('/buildings/insert-update', values)
      getBuildings()
      setMess(id ? 'Edit success' : 'Create success')
      setShowMes(true)
      setShow(!show)
      if (id) {
        setId('')
      }
    }
  }
  useEffect(() => {
    const getBuilding = async () => {
      const res = await baseAxios.get(`/buildings/${id}`)
      if (res.status == 200) {
        setValues(res.data.item)
      }
    }
    if (id) {
      getBuilding()
    }
  }, [id])
  return (
    <Forms className="bg-form bg-form-create">
      <div className="w-75 animate bg-white rounded-3 form-content">
        <h5 className="title_page px-3 rounded-3 py-2 bg-heading-table pt-2">{id ? 'Edit' : 'Create new'} Building</h5>
        <div className="p-3">
          <form className="p-3 login">
            <div className="row">
              <div className="col-6">
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="buildingCode">
                    Building Code:
                    <span className="color-red">*</span>
                  </label>
                  <InputStyled
                    disabled={!!id}
                    id="firstName"
                    type="text"
                    placeholder="Enter First Name"
                    value={values.buildingCode}
                    onChange={(e) => {
                      setValues({ ...values, buildingCode: e.target.value })
                      setError({ ...errors, buildingCode: '' })
                    }}
                  />
                  {errors.buildingCode && <p className="m-0 message_form">{errors.buildingCode}</p>}
                </div>
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="buildingName">
                    Building Name:
                    <span className="color-red">*</span>
                  </label>
                  <InputStyled
                    id="buildingName"
                    type="text"
                    placeholder="Enter Building name"
                    value={values.buildingName}
                    onChange={(e) => {
                      setValues({ ...values, buildingName: e.target.value })
                      setError({ ...errors, buildingName: '' })
                    }}
                  />
                  {errors.buildingName && <p className="m-0 message_form">{errors.buildingName}</p>}
                </div>
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="numberFloors">Number of floors:</label>
                  <InputStyled
                    id="numberFloors"
                    type="number"
                    placeholder="Enter numberFloors"
                    value={Number(values.numberOfFloors)}
                    onChange={(e) => {
                      setValues({ ...values, numberOfFloors: Number(e.target.value) })
                    }}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="height">Height:</label>
                  <InputStyled
                    id="height"
                    type="text"
                    maxLength={50}
                    placeholder="Enter height"
                    value={values.height}
                    onChange={(e) => {
                      setValues({ ...values, height: e.target.value })
                    }}
                  />
                </div>
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="acreage">Acreage:</label>
                  <InputStyled
                    maxLength={50}
                    id="acreage"
                    type="text"
                    placeholder="Enter acreage"
                    value={values.acreage}
                    onChange={(e) => {
                      setValues({ ...values, acreage: e.target.value })
                    }}
                  />
                </div>
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="numberApartment">Number of Apartment:</label>
                  <InputStyled
                    id="numberApartment"
                    type="number"
                    placeholder="Enter numberApartment"
                    value={Number(values.numberOfApartments)}
                    onChange={(e) => {
                      setValues({ ...values, numberOfApartments: Number(e.target.value) })
                    }}
                  />
                </div>
              </div>
              <div className="position-relative">
                <label htmlFor="address">Address:</label>
                <TextareaStyled
                  id="address"
                  placeholder="Enter Address"
                  value={values.address}
                  onChange={(e) => {
                    setValues({ ...values, address: e.target.value })
                  }}
                />
              </div>
              <div className="position-relative">
                <label htmlFor="note">Note:</label>
                <TextareaStyled
                  id="note"
                  placeholder="Enter Note"
                  value={values.note}
                  onChange={(e) => {
                    setValues({ ...values, note: e.target.value })
                  }}
                />
              </div>
            </div>
            <div className="d-flex justify-content-end mt-3">
              <div>
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
                <button type="button" onClick={() => onSubmit()} className="btn mx-3  btn-success">
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
