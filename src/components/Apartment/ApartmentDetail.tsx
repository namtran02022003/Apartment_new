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
interface contractsInterFace {
  person: { fullName: string }
  apartment: { code: string; area: number | string }
  code: string
  status: string
}
const ApartmentDetail: FC = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [contracts, setContract] = useState<contractsInterFace>()
  const [error, setError] = useState('')
  useEffect(() => {
    let isMounted = true
    const fetchData = async () => {
      try {
        const resContract = await baseAxios.get(`/apartments/${id}/contract`)
        if (isMounted) {
          setContract(resContract.data)
          setLoading(false)
        }
      } catch (error) {
        if (isMounted) {
          setError('Có lỗi xảy ra khi tải dữ liệu, vui lòng thử lại sau.')
          setLoading(false)
        }
      }
    }
    if (id) {
      fetchData()
    } else {
      setLoading(false)
    }
    return () => {
      isMounted = false
    }
  }, [id])

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  if (!contracts) {
    return <div>No data</div>
  }
  return (
    <ApeartmentDetailStyled>
      <h1>Detail Apartment</h1>
      <div className="item">
        <table>
          <tbody>
            <tr>
              <th>Apartment id</th>
              <th>Host name</th>
              <th>Contract id</th>
              <th>Area</th>
              <th>Number/room</th>
              <th>Status</th>
            </tr>
            <tr>
              <td>{contracts.apartment.code}</td>
              <td>{contracts.person.fullName} </td>
              <td>{contracts.code}</td>
              <td>
                {contracts.apartment.area}m<sub>2</sub>
              </td>
              <td>d</td>
              <td>{contracts.status}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </ApeartmentDetailStyled>
  )
}

export default ApartmentDetail
