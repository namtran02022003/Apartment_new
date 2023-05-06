import { FC, useState, useEffect } from 'react'
import Inputs from '../Inputs'
import Select from 'react-select'
import styled from 'styled-components'
import baseAxios from '../../../apis/ConfigAxios'
import ValidateContract from './ValidateContratc'
import { useNavigate } from 'react-router-dom'
import background_login from '../../../assets/images/background_login.png'
const FormContractsStyled = styled.div`
  background: #ccc;
  background-image: url(${background_login});
  background-size: cover;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  h2 {
    text-align: center;
  }
  form {
    width: 500px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: rgb(255 255 255 / 90%);
    margin: auto;
    input {
      box-sizing: border-box;
      width: 100%;
      padding: 10px 15px;
      border: 1px solid #ccc;
      border-radius: 4px;
      &:focus-within {
        outline: 1px solid #666;
      }
    }
    label {
      display: block;
      margin: 10px 0 5px 0;
    }
    .btn-create-contract {
      border: none;
      border-radius: 4px;
      background: #61b561;
      width: 50%;
      padding: 10px 15px;
      margin: 20px auto;
      display: block;
      cursor: pointer;
      &:hover {
        background: green;
        color: #fff;
      }
    }
    .live_here {
      display: flex;
      margin-top: 20px;
      align-items: center;
      input {
        width: 20px;
        height: 20px;
        margin-left: 20px;
        &:focus-within {
          outline: none;
        }
      }
    }
  }
`
const FormContracts: FC = () => {
  const Navigate = useNavigate()
  const [values, setValues] = useState({
    startDate: '',
    priceApartment: '',
    endDate: '',
    status: '1',
    person: {
      id: ''
    },
    apartment: {
      id: ''
    },
    liveHere: true
  })
  const [messageErrs, setMessageErrs] = useState({
    startDate: '',
    priceApartment: '',
    endDate: '',
    person: '',
    apartment: ''
  })
  const [dataOptions, setDataOptions] = useState({
    persons: [],
    apartments: []
  })
  useEffect(() => {
    const getDatas = async () => {
      const resPersons = await baseAxios.get('/persons')
      const resApartment = await baseAxios.get('/apartments/available')
      const dataPersons = resPersons.data.map((person: { id: number; fullName: string }) => {
        return {
          value: person.id,
          label: person.fullName
        }
      })
      const dataApartment = resApartment.data.map((apartment: { id: number; name: string }) => {
        return {
          value: apartment.id,
          label: apartment.name
        }
      })
      setDataOptions({
        persons: dataPersons,
        apartments: dataApartment
      })
    }
    getDatas()
  }, [])
  console.log(dataOptions)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlaChangeOptionsPersons = (e: any) => {
    setValues((pre) => {
      return {
        ...pre,
        person: {
          id: e
        }
      }
    })
    setMessageErrs({
      ...messageErrs,
      person: ''
    })
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlaChangeOptionsApartments = (e: any) => {
    setValues((pre) => {
      return {
        ...pre,
        apartment: {
          id: e
        }
      }
    })
    setMessageErrs({
      ...messageErrs,
      apartment: ''
    })
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const newValues = {
      ...values,
      person: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        id: values.person.id.value
      },
      apartment: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        id: values.apartment.id.value
      }
    }
    if (!(Object.keys(ValidateContract(newValues, setMessageErrs)).length > 0)) {
      await baseAxios.post('/contracts', newValues)
      Navigate('/contract')
    }
  }
  return (
    <FormContractsStyled>
      <form onSubmit={handleSubmit}>
        <h2>Create new contract</h2>
        <Inputs
          onChange={(e) => {
            setValues({ ...values, startDate: e.target.value })
            setMessageErrs({
              ...messageErrs,
              startDate: ''
            })
          }}
          value={values.startDate}
          type="date"
          label="Start Date"
          name="start date"
          err={messageErrs.startDate}
        />
        <Inputs
          onChange={(e) => {
            setValues({ ...values, endDate: e.target.value })
            setMessageErrs({
              ...messageErrs,
              endDate: ''
            })
          }}
          value={values.endDate}
          type="date"
          label="End Date"
          name="end date"
          err={messageErrs.endDate}
        />
        <Inputs
          onChange={(e) => {
            setValues({ ...values, priceApartment: e.target.value })
            setMessageErrs({
              ...messageErrs,
              priceApartment: ''
            })
          }}
          value={values.priceApartment}
          type="number"
          label="Price"
          placeholder="Enter price"
          name="price"
          err={messageErrs.priceApartment}
        />
        <label htmlFor="Persons">Persons Id</label>
        <Select onChange={handlaChangeOptionsPersons} value={values.person.id} options={dataOptions.persons} />
        <p className="err-message">{messageErrs.person}</p>
        <label htmlFor="Apartment">Apartment Id</label>
        <Select onChange={handlaChangeOptionsApartments} value={values.apartment.id} options={dataOptions.apartments} />
        <p className="err-message">{messageErrs.apartment}</p>
        <div className="live_here">
          <label htmlFor="live_here">LiveHere:</label>
          <input
            onChange={() => setValues({ ...values, liveHere: !values.liveHere })}
            checked={values.liveHere}
            id="live_here"
            type="checkbox"
            title="liveHere"
          />
        </div>
        <button className="btn-create-contract" type="submit">
          submit
        </button>
        <button className="btn-to-home" onClick={() => Navigate('/')}>
          Back to home
        </button>
      </form>
    </FormContractsStyled>
  )
}
export default FormContracts
