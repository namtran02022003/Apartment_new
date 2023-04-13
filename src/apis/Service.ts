import axios from 'axios'
import { RouteApartment, RouteResident } from './RouteApis'
import { Dispatch, SetStateAction } from 'react'
const getApartments = async (setApartments: Dispatch<SetStateAction<unknown>>) => {
  const res = await axios(RouteApartment(), {
    params: {
      pageSize: 10,
      pageNo: 1
    }
  })
  setApartments(res.data)
}
const getResident = async (setResident: Dispatch<SetStateAction<unknown>>) => {
  const res = await axios(RouteResident(), {
    params: {
      pageSize: 100,
      pageNo: 1
    }
  })
  setResident(res.data)
}
const getApartment = async (setApartment: Dispatch<SetStateAction<unknown>>, id: string) => {
  const res = await axios(`${RouteApartment()}/${id}`)
  setApartment(res.data)
}
export { getResident, getApartments, getApartment }
