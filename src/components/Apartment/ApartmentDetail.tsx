import axios from 'axios'
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
const ApartmentDetail: FC = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [contracts, setContract] = useState([])
  const [listPersons, setListPersons] = useState([])
  const Navigate = useNavigate()
  useEffect(() => {
    const getDatas = async () => {
      const resContract = await axios.get(`http://localhost:8080/api/apartments/${id}/contract`)
      const resPersons = await axios.get(`http://localhost:8080/api/apartments/${id}/persons-active`)
      setContract(resContract.data)
      setListPersons(resPersons.data)
      setLoading(false)
    }
    getDatas()
  }, [id])
  console.log(listPersons)
  return loading ? (
    <Loading />
  ) : (
    <ApeartmentDetailStyled>
      <div className="item">
        <h2>Contract</h2>
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
        <h2>Members:</h2>
        <table>
          <tbody>
            <tr>
              <th>id</th>
              <th>fullname</th>
              <th>email</th>
              <th>phone number</th>
              <th>gender</th>
              <th>date of birth</th>
              <th>status</th>
              <th>carrer</th>
              <th>cin</th>
              <th>action</th>
            </tr>
            {listPersons.map((person: personsInterFace) => {
              return (
                <tr key={person.id}>
                  <td>{person.id}</td>
                  <td>
                    {person.fullName}
                    {`${person.idParent ? '' : ' (host)'} `}
                  </td>
                  <td>{person.email}</td>
                  <td>{person.phone}</td>
                  <td>{person.gender ? 'Male' : 'Female'}</td>
                  <td>{person.dob}</td>
                  <td>{person.status}</td>
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
