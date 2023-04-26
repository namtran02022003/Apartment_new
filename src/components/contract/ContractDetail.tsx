import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import baseAxios from '../../apis/ConfigAxios'
import Loading from '../loading/Loading'
import ApartmentStyled from '../../assets/styles/ApartmentStyled'
import styled from 'styled-components'
import * as moment from 'moment'

const H2_centerStyled = styled.h2`
  text-align: center;
  margin: 20px 0;
`
interface contractFace {
  code: string
  apartment: {
    id: string
    area: string
  }
  priceApartment: string | number
  startDate: string
  status: string
  person: {
    fullName: string
  }
}
const ContractDetail: FC = () => {
  const { id } = useParams()
  const [contract, setContract] = useState<contractFace>(Object)
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(true)
  console.log(id)
  useEffect(() => {
    const getContract = async () => {
      try {
        const res = await baseAxios.get(`/contracts/${id}`)
        setTimeout(() => {
          setContract(res.data)
          setLoading(false)
        })
      } catch (err) {
        console.log(err)
        setErr('có lỗi khi tải dữ liệu vui lòng thử lại sau')
      }
    }
    getContract()
  }, [id])
  if (err) return <div>{err}</div>
  console.log(contract)
  return loading ? (
    <Loading />
  ) : (
    <ApartmentStyled>
      <H2_centerStyled>Contract detail</H2_centerStyled>
      <div className="apartment-content">
        <table>
          <tbody>
            <tr>
              <th>Contract ID</th>
              <th>Apartment ID</th>
              <th>Host name</th>
              <th>Area</th>
              <th>Rental price</th>
              <th>Registration date</th>
              <th>Status</th>
            </tr>
            <tr>
              <td>{contract.code}</td>
              <td>{contract.apartment.id}</td>
              <td>{contract.person.fullName}</td>
              <td>{contract.apartment.area}</td>
              <td>{Number(contract.priceApartment).toLocaleString()}</td>
              <td>{moment(contract.startDate).format('DD/MM/YYYY')}</td>
              <td>{contract.status}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </ApartmentStyled>
  )
}

export default ContractDetail
