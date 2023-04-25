import { Dispatch, SetStateAction } from 'react'
interface Err {
  startDate?: string
  endDate?: string
  priceApartment?: number | string
  code?: string
  apartment?: string
  person?: string
}
interface Contract {
  startDate: string
  endDate: string
  priceApartment: number
  code: string
  apartment: {
    id: string
  }
  person: {
    id: string
  }
}
const ValidateContract = (values: Contract, setMessageErr: Dispatch<SetStateAction<object>>) => {
  const errs: Err = {}
  if (!values.startDate) {
    errs.startDate = 'Invalid start date'
  }
  if (!values.endDate) {
    errs.endDate = 'Invalid end date'
  }
  if (!values.priceApartment) {
    errs.priceApartment = 'Invalid priceApartment'
  } else if (values.priceApartment < 0) {
    errs.priceApartment = 'Invalid priceApartment'
  }
  if (!values.code || values.code.length < 4 || values.code.length > 8) {
    errs.code = 'Invalid code'
  }
  if (!values.apartment.id) {
    errs.apartment = 'Invalid apartment'
  }
  if (!values.person.id) {
    errs.person = 'Invalid person'
  }
  setMessageErr(errs)
  return errs
}

export default ValidateContract
