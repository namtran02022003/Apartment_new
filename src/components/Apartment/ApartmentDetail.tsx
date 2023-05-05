import baseAxios from '../../apis/ConfigAxios'
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Loading from '../loading/Loading'
import ApartmentStyled from '../../assets/styles/ApartmentStyled'
const H1Margin = styled.h1`
  margin: 30px auto;
  text-align: center;
`
interface ApartmentDetailInterFace {
  apartmentCode: string
  roomMaster: string
  contractCode: string
  status: boolean
  area: string | number
  personInApartment: number | string
}
const ApartmentDetail: FC = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [ApartmentDetail, setApartmentDetail] = useState<ApartmentDetailInterFace>()
  useEffect(() => {
    const getApartment = async () => {
      try {
        const res = await baseAxios.get(`/apartments/${id}`)
        setTimeout(() => {
          setApartmentDetail(res.data)
          setLoading(false)
        }, 500)
      } catch (error) {
        console.log(error)
      }
    }
    getApartment()
  }, [id])
  if (loading) {
    return <Loading />
  }

  if (!ApartmentDetail) {
    return <div>No data</div>
  }
  return (
    <ApartmentStyled>
      <H1Margin>Apartment Detail</H1Margin>
      <div className="item apartment-content">
        <table>
          <tbody>
            <tr>
              <th>Apartment ID</th>
              <th>Host name</th>
              <th>Contract ID</th>
              <th>Area</th>
              <th>Resident number</th>
              <th>Status</th>
            </tr>
            <tr>
              <td>{ApartmentDetail.apartmentCode}</td>
              <td>{ApartmentDetail.roomMaster} </td>
              <td>{ApartmentDetail.contractCode}</td>
              <td>
                {ApartmentDetail.area}m<sub>2</sub>
              </td>
              <td>{ApartmentDetail.personInApartment}</td>
              <td>{ApartmentDetail.status ? <b>Occupied</b> : 'Available'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </ApartmentStyled>
  )
}

export default ApartmentDetail
