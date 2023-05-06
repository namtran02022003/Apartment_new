import { FC, useCallback, useEffect, useState, SyntheticEvent, ChangeEvent } from 'react'
import Inputs from '../Inputs'
import Formstyled from '../../../assets/styles/Forms'
import Select from 'react-select'
import baseAxios from '../../../apis/ConfigAxios'
import { useNavigate, useParams } from 'react-router-dom'
import ValidatePersons from './ValidateCreatePersons'
interface ValuesFace {
  fullName: string
  phone: string
  email: string
  dob: string
  cin: number | string
  gender: string | number
  carrer: string
  apartmentId: { value?: string | undefined } | string
  status: string
}
const FormCreatePersons: FC = () => {
  const { id } = useParams()
  const Navigate = useNavigate()
  const [values, setValues] = useState<ValuesFace>({
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
  const handleChange = (option: { value: string; label: string }) => {
    setValues({ ...values, apartmentId: option })
    setMessageErrs({ ...messageErrs, apartmentId: '' })
  }
  const getDatasSearch = useCallback(async () => {
    const res = await baseAxios.get('/apartments/un-available', {
      params: {
        pageSize: 100,
        pageNo: 1
      }
    })
    const newDatas = res.data.map((apartment: { id: string | number; name: string }) => {
      return {
        value: apartment.id,
        label: apartment.name
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
      setValues({ ...res.data, apartmentId: { value: res.data.apartment.id, label: res.data.apartment.name } })
    }
    if (id) {
      getPerson()
    }
  }, [id])
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    const newValues = {
      ...values,
      apartmentId: values.apartmentId.value,
      gender: values.gender == 1 ? true : false
    }
    if (!(Object.keys(ValidatePersons(newValues, setMessageErrs)).length > 0)) {
      try {
        if (!id) {
          await baseAxios.post('/persons', newValues)
          Navigate('/resident')
        } else {
          await baseAxios.put(`/persons/${id}`, newValues)
          Navigate('/resident')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    setMessageErrs({
      ...messageErrs,
      [name]: ''
    })
    setValues({ ...values, [name]: e.target.value })
  }
  return (
    <Formstyled>
      <form onSubmit={handleSubmit}>
        <h2>{id ? 'Edit Person' : 'Create New Person'}</h2>
        <div className="flex">
          <div className="flex-item">
            <Inputs
              name="fullname"
              label="FullName"
              type="text"
              placeholder="Enter FullName"
              value={values.fullName}
              onChange={(e) => {
                handleChangeInput(e, 'fullName')
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
                handleChangeInput(e, 'phone')
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
                handleChangeInput(e, 'email')
              }}
              err={messageErrs.email}
            />
          </div>
          <div className="flex-item">
            <Inputs
              name="cin"
              label="ID"
              type="text"
              placeholder="Enter IdCode"
              value={values.cin}
              onChange={(e) => {
                handleChangeInput(e, 'cin')
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
                handleChangeInput(e, 'carrer')
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
                handleChangeInput(e, 'dob')
              }}
            />
          </div>
        </div>
        <div className="flex-item">
          <label htmlFor="nameApartment">Name Apartment</label>
          <Select id="nameApartment" value={values.apartmentId} onChange={handleChange} options={options} placeholder="Select a fruit" />
          {messageErrs.apartmentId && <p className="err-message">{messageErrs.apartmentId}</p>}
        </div>
        <button className="btn-create-person">{id ? 'Up date' : 'Create Presons'}</button>
      </form>
      <button onClick={() => Navigate('/')} className="btn-to-home">
        Back to home
      </button>
    </Formstyled>
  )
}
export default FormCreatePersons
