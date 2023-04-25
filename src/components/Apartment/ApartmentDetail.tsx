import baseAxios from '../../apis/ConfigAxios'
import { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import Loading from '../loading/Loading'
import * as moment from 'moment'
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
interface personsInterFace {
  id: number | string
  fullName: string
  email: string
  phone: string | number
  gender: boolean
  cin: string
  carrer: string
  dob: string
  status: string | number
}
interface contractsInterFace {
  person: { fullName: string }
  apartment: { code: string; area: number | string }
  code: string
  startDate: string
  endDate: string
}
const ApartmentDetail: FC = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [contracts, setContract] = useState<contractsInterFace>()
  const [listPersons, setListPersons] = useState([])
  const [error, setError] = useState('')
  const Navigate = useNavigate()
  useEffect(() => {
    let isMounted = true
    const fetchData = async () => {
      try {
        const resContract = await baseAxios.get(`/apartments/${id}/contract`)
        const resPersons = await baseAxios.get(`/apartments/${id}/persons`)
        if (isMounted) {
          setContract(resContract.data)
          setListPersons(resPersons.data)
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

  if (!contracts || !listPersons) {
    return <div>No data</div>
  }
  console.log(listPersons)
  return (
    <ApeartmentDetailStyled>
      <h1>Detail Apartment</h1>
      <div className="item">
        <h3>Contract</h3>
        <table>
          <tbody>
            <tr>
              <th>Host name</th>
              <th>Apartment code</th>
              <th>Contract code</th>
              <th>Area</th>
              <th>Start Date</th>
              <th>End date</th>
            </tr>
            <tr>
              <td>{contracts.person.fullName} </td>
              <td>{contracts.apartment.code}</td>
              <td>{contracts.code}</td>
              <td>
                {contracts.apartment.area}m<sub>2</sub>
              </td>
              <td>{moment(contracts.startDate).format('DD/MM/YYYY')}</td>
              <td>{moment(contracts.endDate).format('DD/MM/YYYY')}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="item">
        <h3>Members:</h3>
        <table>
          <tbody>
            <tr>
              <th>Fullname</th>
              <th>Email</th>
              <th>Phone number</th>
              <th>Gender</th>
              <th>Date of birth</th>
              <th>Carrer</th>
              <th>Id no</th>
              <th>Action</th>
            </tr>
            {listPersons.map((person: personsInterFace) => {
              return (
                <tr key={person.id}>
                  <td>{person.fullName}</td>
                  <td>{person.email}</td>
                  <td>{person.phone}</td>
                  <td>{person.gender ? 'Male' : 'Female'}</td>
                  <td>{person.dob}</td>
                  <td>{person.carrer}</td>
                  <td>{person.cin}</td>
                  <td className="td-action">
                    <button onClick={() => Navigate(`/edit_person/${person.id}`)} className="btn-edit" title="edit">
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className="btn-delete" title="delate">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </ApeartmentDetailStyled>
  )
}

export default ApartmentDetail
