import React, { FC, useEffect, useState } from 'react'
import Inputs from './Inputs'
import axios from 'axios'
import { RouteApartment } from '../../apis/RouteApis'
import ValidationFormCreateApartment from './Validation'
import FormCreateApartmentstyled from '../../assets/styles/Forms'
import { getApartment } from '../../apis/Service'
import { useParams, useNavigate } from 'react-router-dom'
interface Props {
  type: string
}
const FormCreateApartment: FC<Props> = ({ type }) => {
  const { id } = useParams()
  const Navigate = useNavigate()
  const method = type == 'Create' ? 'post' : 'put'
  const [values, setValues] = useState({
    name: '',
    status: '',
    area: '',
    description: '',
    code: ''
  })
  const [messageErrs, setMessageErrs] = useState({
    name: '',
    status: '',
    area: '',
    description: ''
  })
  useEffect(() => {
    if (type == 'Update') {
      getApartment(setValues, id)
    }
  }, [type, id])
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!Object.keys(ValidationFormCreateApartment(values, setMessageErrs)).length > 0) {
      if (method == 'put') {
        await axios[method](`${RouteApartment()}/${id}`, values)
        Navigate('/apartment')
      } else if (method == 'post') {
        await axios[method](`${RouteApartment()}`, values)
        Navigate('/apartment')
      }
    }
  }

  console.log(values)
  return (
    <FormCreateApartmentstyled id="form">
      <form onSubmit={onSubmit}>
        <h2>{type} new Apartment</h2>
        <Inputs
          name="fullname"
          label="FullName"
          placeholder="Enter fullname"
          type="text"
          value={values.name}
          onHandleChange={(e) => {
            setMessageErrs({
              ...messageErrs,
              name: ''
            })
            setValues({ ...values, name: e.target.value })
          }}
          err={messageErrs.name}
        />
        <Inputs
          name="area"
          label="Area"
          placeholder="Enter Area"
          type="text"
          value={values.area}
          onHandleChange={(e) => {
            setMessageErrs({
              ...messageErrs,
              area: ''
            })
            setValues({ ...values, area: e.target.value })
          }}
          err={messageErrs.area}
        />
        <label htmlFor="status">Status:</label>
        <select
          value={values.status}
          onChange={(e) => {
            setValues({ ...values, status: e.target.value })
          }}
          id="status"
        >
          <option value={0}>off</option>
          <option value={1}>on</option>
          <option value={2}>Repair</option>
        </select>
        <Inputs
          type="text"
          name="description"
          label="Description"
          placeholder="Enter description"
          value={values.description}
          onHandleChange={(e) => {
            setMessageErrs({
              ...messageErrs,
              description: ''
            })
            setValues({ ...values, description: e.target.value })
          }}
          err={messageErrs.description}
        />
        <button className="btn-create" type="submit">
          {type}
        </button>
      </form>
    </FormCreateApartmentstyled>
  )
}

export default FormCreateApartment
