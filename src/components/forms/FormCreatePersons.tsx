import { FC, useCallback, useEffect, useState } from 'react'
import Inputs from './Inputs'
import FormCreateApartmentstyled from '../../assets/styles/FormCreateApartment'
import Select from 'react-select'
import axios from 'axios'

const FormCreatePersons: FC = () => {
  const [values, setValues] = useState({
    fullName: '',
    phone: '',
    email: '',
    dob: '',
    cin: '',
    gender: 'true',
    carrer: '',
    idParent: '',
    status: '1'
  })
  const [messageErrs, setMessageErrs] = useState({
    fullName: '',
    phone: '',
    email: '',
    dob: '',
    cin: '',
    carrer: '',
    idParent: ''
  })
  const handleChange = (option) => {
    setValues({ ...values, idParent: option.values })
  }
  const [options, setOptions] = useState([])
  const getDatasSearch = useCallback(async () => {
    const res = await axios.get('http://localhost:8080/api/apartments', {
      params: {
        pageSize: 100,
        pageNo: 1
      }
    })
    const newDatas = res.data.map((apartment) => {
      return {
        values: apartment.id,
        label: apartment.apartmentName
      }
    })
    setOptions(newDatas)
  }, [])
  useEffect(() => {
    getDatasSearch()
  }, [getDatasSearch]) // eslint-disable-next-line react-hooks/exhaustive-deps
  console.log(values)
  console.log(options)
  return (
    <FormCreateApartmentstyled>
      <form>
        <h2>Create new Persons</h2>
        <div className="flex">
          <div className="flex-item">
            <Inputs
              name="fullname"
              label="FullName:"
              type="text"
              placeholder="Enter FullName"
              value={values.fullName}
              onHandleChange={(e) => {
                setMessageErrs({
                  ...messageErrs,
                  fullName: ''
                })
                setValues({ ...values, fullName: e.target.value })
              }}
              err={messageErrs.fullName}
            />
            <Inputs
              name="phone"
              label="PhoneNumber"
              type="text"
              placeholder="Enter PhoneNumber"
              value={values.phone}
              onHandleChange={(e) => {
                setMessageErrs({
                  ...messageErrs,
                  phone: ''
                })
                setValues({ ...values, phone: e.target.value })
              }}
              err={messageErrs.phone}
            />
            <Inputs
              name="email"
              label="Email"
              type="email"
              placeholder="Enter Email"
              value={values.email}
              onHandleChange={(e) => {
                setMessageErrs({
                  ...messageErrs,
                  email: ''
                })
                setValues({ ...values, email: e.target.value })
              }}
              err={messageErrs.email}
            />
            <label htmlFor="gender">Gender:</label>
            <div id="gender" className="dflex">
              <span>
                <input
                  onChange={(e) => {
                    setValues({ ...values, gender: e.target.value })
                  }}
                  checked={values.gender == 'true'}
                  title="gender"
                  type="radio"
                  name="gender"
                  value={'true'}
                />
                Male
              </span>
              <span>
                <input
                  onChange={(e) => {
                    setValues({ ...values, gender: e.target.value })
                  }}
                  checked={values.gender == 'false'}
                  title="gender"
                  type="radio"
                  name="gender"
                  value={'false'}
                />
                Female
              </span>
            </div>
          </div>
          <div className="flex-item">
            <label htmlFor="nameApartment">Name Apartment:</label>
            <Select id="nameApartment" value={values.idParent} onChange={handleChange} options={options} isSearchable placeholder="Select a fruit" />
            <Inputs
              name="cin"
              label="IdCode"
              type="text"
              placeholder="Enter IdCode"
              value={values.cin}
              onHandleChange={(e) => {
                setMessageErrs({
                  ...messageErrs,
                  cin: ''
                })
                setValues({ ...values, cin: e.target.value })
              }}
              err={messageErrs.cin}
            />
            <Inputs
              name="carrer"
              label="Carrer"
              type="text"
              placeholder="Enter Carrer"
              value={values.carrer}
              onHandleChange={(e) => {
                setMessageErrs({
                  ...messageErrs,
                  carrer: ''
                })
                setValues({ ...values, carrer: e.target.value })
              }}
              err={messageErrs.carrer}
            />
            <label htmlFor="status">Date of birth:</label>
            <Inputs
              name="date"
              type="date"
              value={values.dob}
              onHandleChange={(e) => {
                setMessageErrs({
                  ...messageErrs,
                  dob: ''
                })
                setValues({ ...values, dob: e.target.value })
              }}
            />
          </div>
        </div>
        <button className="btn-create">Create Presons</button>
      </form>
    </FormCreateApartmentstyled>
  )
}
export default FormCreatePersons
