import { FC, useCallback, useEffect, useState } from 'react'
import Inputs from '../Inputs'
import Formstyled from '../../../assets/styles/Forms'
import Select from 'react-select'
import baseAxios from '../../../apis/ConfigAxios'
import { useNavigate, useParams } from 'react-router-dom'
import ValidatePersons from './ValidateCreatePersons'
const FormCreatePersons: FC = () => {
  const { id } = useParams()
  const Navigate = useNavigate()
  const [values, setValues] = useState({
    fullName: '',
    phone: '',
    email: '',
    dob: '',
    cin: '',
    gender: 1,
    carrer: '',
    apartmentId: '',
    status: ''
  })
  const [messageErrs, setMessageErrs] = useState({
    fullName: '',
    phone: '',
    email: '',
    dob: '',
    cin: '',
    carrer: '',
    apartmentId: ''
  })
  const [options, setOptions] = useState([])
  const handleChange = (option) => {
    setValues({ ...values, apartmentId: option })
    setMessageErrs({ ...messageErrs, apartmentId: '' })
  }
  const getDatasSearch = useCallback(async () => {
    const res = await baseAxios.get('/apartments', {
      params: {
        pageSize: 100,
        pageNo: 1
      }
    })
    const newDatas = res.data.map((apartment) => {
      return {
        values: apartment.id,
        label: apartment.apartmentCode
      }
    })
    setOptions(newDatas)
  }, [])
  useEffect(() => {
    getDatasSearch()
  }, [getDatasSearch])
  useEffect(() => {
    const getPerson = async () => {
      const res = await baseAxios.get(`/persons/${id}`)
      setValues(res.data)
    }
    if (id) {
      getPerson()
    }
  }, [id])
  const handleSubmit = async (e) => {
    e.preventDefault()
    const newValues = {
      ...values,
      apartmentId: values.apartmentId.values,
      gender: values.gender == 1 ? true : false
    }
    console.log(newValues)
    if (!Object.keys(ValidatePersons(newValues, setMessageErrs)).length > 0) {
      if (!id) {
        await baseAxios.post('/persons', newValues)
        Navigate('/resident')
      } else {
        await baseAxios.put(`/persons/${id}`, newValues)
        Navigate('/resident')
      }
    }
  }
  console.log(values)
  return (
    <Formstyled>
      <form onSubmit={handleSubmit}>
        <h2>Create new Persons</h2>
        <div className="flex">
          <div className="flex-item">
            <Inputs
              name="fullname"
              label="FullName:"
              type="text"
              placeholder="Enter FullName"
              value={values.fullName}
              onChange={(e) => {
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
              onChange={(e) => {
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
              onChange={(e) => {
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
                  checked={values.gender == 1}
                  title="gender"
                  type="radio"
                  name="gender"
                  value={1}
                />
                Male
              </span>
              <span>
                <input
                  onChange={(e) => {
                    setValues({ ...values, gender: e.target.value })
                  }}
                  checked={values.gender == 0}
                  title="gender"
                  type="radio"
                  name="gender"
                  value={0}
                />
                Female
              </span>
            </div>
          </div>
          <div className="flex-item">
            <label htmlFor="nameApartment">Name Apartment:</label>
            <Select id="nameApartment" value={values.apartmentId} onChange={handleChange} options={options} isSearchable placeholder="Select a fruit" />
            <p className="err-message">{messageErrs.apartmentId}</p>
            <Inputs
              name="cin"
              label="Cin"
              type="text"
              placeholder="Enter IdCode"
              value={values.cin}
              onChange={(e) => {
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
              onChange={(e) => {
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
              err={messageErrs.dob}
              onChange={(e) => {
                setMessageErrs({
                  ...messageErrs,
                  dob: ''
                })
                setValues({ ...values, dob: e.target.value })
              }}
            />
          </div>
        </div>
        <button className="btn-create-person">Create Presons</button>
      </form>
    </Formstyled>
  )
}
export default FormCreatePersons
