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
  acreage: string
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
  if (!/^-?(0|[1-9]\d*|(?=\.))(\.\d+)?$/.test(apartment.acreage)) {
    errs.acreage = 'Invalid acreage'
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
interface dataSelectSearch {
  value: number
  label: string
}
interface resident {
  id: number
  fullName: string
  email: string
  birthDate: string
  gender: number
  phoneNumber: string
  idNo: string
  idDate: string
  idPlace: string
  nationId: dataSelectSearch
  provinceId: dataSelectSearch
  districtId: dataSelectSearch
  wardId: dataSelectSearch
  address: string
  residentType: number
}
const ValidateResident = (resident: resident, setError: Dispatch<SetStateAction<object>>) => {
  const idRegex = /^\d{9}$/
  const citizenshipRegex = /^\d{12}$/
  const phoneNumberRegex = new RegExp('^(1\\s|1|)?((\\(\\d{3}\\))|\\d{3})(-|\\s)?(\\d{3})(-|\\s)?(\\d{4})$')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const errs: any = {}
  if (!resident.fullName.trim()) {
    errs.fullName = 'Invalid fullName'
  }
  if (!resident.email.trim()) {
    errs.email = 'Invalid email'
  } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(resident.email.trim())) {
    errs.email = 'Invalid email!'
  } else if (resident.email.trim().length > 250) {
    errs.email = 'Please enter no more than 250 characters'
  }
  if (!resident.birthDate.trim()) {
    errs.birthDate = 'Invalid birth of date'
  }
  if (!resident.gender) {
    errs.gender = 'Invalid gender'
  }
  if (!resident.phoneNumber.trim()) {
    errs.phoneNumber = 'Invalid phone number'
  } else if (!phoneNumberRegex.test(resident.phoneNumber.trim())) {
    errs.phoneNumber = 'Invalid phone number'
  }
  if (!idRegex.test(resident.idNo.trim()) && !citizenshipRegex.test(resident.idNo.trim())) {
    errs.idNo = 'Invalid idNo'
  }
  if (!resident.address.trim()) {
    errs.address = 'Invalid address'
  }
  if (!resident.residentType) {
    errs.residentType = 'Invalid resident type'
  }
  if (!resident.nationId.value) {
    errs.nationId = 'Invalid nation'
  }
  if (!resident.provinceId.value) {
    errs.provinceId = 'Invalid province'
  }
  if (!resident.districtId.value) {
    errs.districtId = 'Invalid district'
  }
  if (!resident.wardId.value) {
    errs.wardId = 'Invalid ward'
  }
  if (!resident.idDate.trim()) {
    errs.idDate = 'Invalid id date'
  }
  if (!resident.idPlace.trim()) {
    errs.idPlace = 'Invalid id place'
  }
  setError(errs)
  return errs
}

interface contract {
  id: number
  contractNo: string
  startDate: string
  endDate: string
  residentId: dataSelectSearch
  signerDate: string
  contractType: dataSelectSearch
  buildingId: dataSelectSearch
  apartmentId: dataSelectSearch
}
const ValidateContract = (contract: contract, setError: Dispatch<SetStateAction<object>>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const errs: any = {}
  if (!contract.contractNo.trim()) {
    errs.contractNo = 'Invalid contract no'
  }
  if (!contract.endDate) {
    errs.endDate = 'Invalid end date'
  }
  if (!contract.startDate) {
    errs.startDate = 'Invalid start date'
  }
  if (!contract.signerDate) {
    errs.signerDate = 'Invalid signer date'
  }
  if (!contract.apartmentId.value) {
    errs.apartmentId = 'Invalid apartment name'
  }
  if (!contract.buildingId.value) {
    errs.buildingId = 'Invalid building name'
  }
  if (!contract.residentId.value) {
    errs.residentId = 'Invalid resident name'
  }
  if (!contract.contractType.value) {
    errs.contractType = 'Invalid contract type'
  }
  setError(errs)
  return errs
}

interface serviceFee {
  id: number
  periodId: dataSelectSearch
  residentId: dataSelectSearch
  buildingId: dataSelectSearch
  apartmentId: dataSelectSearch
  electricityNumber: number
  waterMumber: number
}
const ValidateServiceFee = (serviceFee: serviceFee, setError: Dispatch<SetStateAction<object>>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const errs: any = {}
  if (!serviceFee.periodId.value) {
    errs.periodId = 'Invalid period'
  }
  if (!serviceFee.residentId.value) {
    errs.residentId = 'Invalid resident name'
  }
  if (!serviceFee.buildingId.value) {
    errs.buildingId = 'Invalid building name'
  }
  if (!serviceFee.apartmentId.value) {
    errs.apartmentId = 'Invalid apartment name'
  }
  if (!serviceFee.waterMumber) {
    errs.waterMumber = 'Invalid water number '
  }
  if (!serviceFee.electricityNumber) {
    errs.electricityNumber = 'Invalid electricity number'
  }
  setError(errs)
  return errs
}
export { ValidateUser, ValidateBuilding, ValidateApartment, ValidateServices, ValidateResident, ValidateContract, ValidateServiceFee }
