import { Dispatch, SetStateAction } from 'react'
interface user {
  userName: string
  email: string
  firstName: string
  lastName: string
  id: string | number
  middleName: string
  password: string
}
const ValidateUser = (user: user, setMessageErr: Dispatch<SetStateAction<object>>, edit: boolean) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const errs: any = {}
  if (!user.firstName.trim()) {
    errs.firstName = 'Invalid firstName'
  } else if (user.firstName.trim().length > 50) {
    errs.firstName = 'Please enter no more than 50 characters'
  }
  if (!user.middleName.trim()) {
    errs.middleName = 'Invalid middleName'
  } else if (user.middleName.trim().length > 50) {
    errs.middleName = 'Please enter no more than 50 characters'
  }
  if (!user.lastName.trim()) {
    errs.lastName = 'Invalid lastName'
  } else if (user.lastName.trim().length > 50) {
    errs.lastName = 'Please enter no more than 50 characters'
  }
  if (edit) {
    if (!user.userName.trim()) {
      errs.userName = 'Invalid userName'
    } else if (user.userName.trim().length > 250) {
      errs.userName = 'Please enter no more than 250 characters'
    }
    if (!user.password.trim()) {
      errs.password = 'Invalid password'
    } else if (user.password.trim().length > 50) {
      errs.password = 'Please enter no more than 50 characters'
    }
    if (!user.email.trim()) {
      errs.email = 'Invalid email'
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(user.email.trim())) {
      errs.email = 'Invalid email!'
    } else if (user.email.trim().length > 250) {
      errs.email = 'Please enter no more than 250 characters'
    }
  }
  setMessageErr(errs)
  return errs
}

interface building {
  buildingCode: string
  buildingName: string
}
const ValidateBuilding = (values: building, setError: Dispatch<SetStateAction<object>>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const errs: any = {}
  if (!values.buildingCode.trim()) {
    errs.buildingCode = 'Invalid building code'
  }
  if (!values.buildingName.trim()) {
    errs.buildingName = 'Invalid building name'
  }
  setError(errs)
  return errs
}

interface apartment {
  apartmentCode: string
  apartmentName: string
  buildingId?: {
    label: string
    value: string
  }
}
const ValidateApartment = (apartment: apartment, setError: Dispatch<SetStateAction<object>>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const errs: any = {}
  if (!apartment.apartmentCode.trim()) {
    errs.apartmentCode = 'Invalid apartment code'
  }
  if (!apartment.apartmentName.trim()) {
    errs.apartmentName = 'Invalid apartment name'
  }
  if (!apartment.buildingId?.value) {
    errs.buildingId = 'Invalid building name'
  }
  setError(errs)
  return errs
}
interface services {
  servicesCode: string
  servicesName: string
  servicesPrice: number
}
const ValidateServices = (services: services, setError: Dispatch<SetStateAction<object>>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const errs: any = {}
  if (!services.servicesCode.trim()) {
    errs.servicesCode = 'Invalid services code'
  }
  if (!services.servicesName.trim()) {
    errs.servicesName = 'Invalid services name'
  }
  if (!services.servicesPrice) {
    errs.servicesPrice = 'Invalid services price'
  }
  setError(errs)
  return errs
}
export { ValidateUser, ValidateBuilding, ValidateApartment, ValidateServices }
