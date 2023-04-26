import baseAxios from '../../apis/ConfigAxios'
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Loading from '../loading/Loading'
const ApeartmentDetailStyled = styled.div`
  background: #fff;
  padding: 10px 20px;
  h1 {
    margin: 20px 0;
    text-align: center;
  }
  .item {
    margin: 30px 0;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    sub {
      vertical-align: super;
    }
  }
  th,
  tr,
  td,
  table {
    border: 1px solid #ccc;
    padding: 10px 5px;
  }
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
  console.log(ApartmentDetail)
  return (
    <ApeartmentDetailStyled>
      <h1>Apartment Detail</h1>
      <div className="item">
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
    </ApeartmentDetailStyled>
  )
}

export default ApartmentDetail
