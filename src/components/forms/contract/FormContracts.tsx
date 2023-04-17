import { FC, useState, useEffect } from 'react'
import Inputs from '../Inputs'
import Select from 'react-select'
import styled from 'styled-components'
import axios from 'axios'
import ValidateContract from './ValidateContratc'
import { useNavigate } from 'react-router-dom'
const FormContractsStyled = styled.div`
  background: #ccc;
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
    background: #fff;
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
  }
`
const FormContracts: FC = () => {
  const Navigate = useNavigate()
  const [values, setValues] = useState({
    startDate: '',
    priceApartment: '',
    endDate: '',
    code: '',
    status: '1',
    person: {
      id: ''
    },
    apartment: {
      id: ''
    }
  })
  const [messageErrs, setMessageErrs] = useState({
    startDate: '',
    priceApartment: '',
    endDate: '',
    code: '',
    person: '',
    apartment: ''
  })
  const [dataOptions, setDataOptions] = useState({
    persons: [],
    apartments: []
  })
  useEffect(() => {
    const getDatas = async () => {
      const resPersons = await axios.get('http://localhost:8080/api/persons')
      const resApartment = await axios.get('http://localhost:8080/api/apartments')
      const dataPersons = resPersons.data.map((person: object) => {
        return {
          value: person.id,
          label: person.fullName
        }
      })
      const dataApartment = resApartment.data.map((apartment: object) => {
        return {
          value: apartment.id,
          label: apartment.apartmentCode
        }
      })
      setDataOptions({
        persons: dataPersons,
        apartments: dataApartment
      })
    }
    getDatas()
  }, [])
  const handlaChangeOptionsPersons = (e) => {
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
  const handlaChangeOptionsApartments = (e) => {
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
  const handleSubmit = async (e) => {
    e.preventDefault()
    const newValues = {
      ...values,
      person: {
        id: values.person.id.value
      },
      apartment: {
        id: values.apartment.id.value
      }
    }
    if (!Object.keys(ValidateContract(newValues, setMessageErrs)).length > 0) {
      await axios.post('http://localhost:8080/api/contracts', newValues)
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
          min="0"
          value={values.priceApartmen}
          type="number"
          label="Price"
          placeholder="Enter price"
          name="price"
          err={messageErrs.priceApartment}
        />
        <Inputs
          onChange={(e) => {
            setValues({ ...values, code: e.target.value })
            setMessageErrs({
              ...messageErrs,
              code: ''
            })
          }}
          value={values.code}
          type="text"
          label="Code HD"
          placeholder="Enter code HD"
          name="code"
          err={messageErrs.code}
        />
        <label htmlFor="Persons">Persons Id</label>
        <Select onChange={handlaChangeOptionsPersons} value={values.person.id} options={dataOptions.persons} />
        <p className="err-message">{messageErrs.person}</p>
        <label htmlFor="Apartment">Apartment Id</label>
        <Select onChange={handlaChangeOptionsApartments} value={values.apartment.id} options={dataOptions.apartments} />
        <p className="err-message">{messageErrs.apartment}</p>
        <button className="btn-create-contract" type="submit">
          submit
        </button>
      </form>
    </FormContractsStyled>
  )
}
export default FormContracts
