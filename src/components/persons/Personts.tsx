import { FC, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faEye } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import ApartmentStyled from '../../assets/styles/ApartmentStyled'
import Loading from '../loading/Loading'
import axios from 'axios'
interface ListPersonsInterFace {
  id: number
  fullName: string
  email: string
  dob: string
  phone: string
  cin: string
  gender: boolean
  carrer: string
  apartmentCode: string | number
  status: string | number
}
const Persons: FC = () => {
  const [persons, setPersons] = useState([])
  const [loading, setLoading] = useState(true)
  const Navigate = useNavigate()
  useEffect(() => {
    try {
      const getPersons = async () => {
        const res = await axios.get('http://localhost:8080/api/persons/represent', {
          params: {
            pageSize: 10,
            pageNo: 1
          }
        })
        setPersons(res.data)
      }
      getPersons()
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }, [])
  console.log(persons)
  return loading ? (
    <Loading />
  ) : (
    <>
      <ApartmentStyled>
        <div className="apartment-flex">
          <div className="apartment-flex-item">
            <h3>Total: 20/50</h3>
          </div>
          <div className="apartment-flex-item apartment-flex">
            <form>
              <input type="text" placeholder="Enter search..." />
              <button title="search" type="button" className="btn-search">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </form>
            <button onClick={() => Navigate('/Create_persons')} className="btn-create">
              Create new Persons
            </button>
          </div>
        </div>
        <div className="apartment-content">
          <table>
            <tbody>
              <tr>
                <th>ApartmentCode</th>
                <th>FullName</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Cin</th>
                <th>Date time</th>
                <th>Action</th>
              </tr>
              {persons.map((person: ListPersonsInterFace) => {
                return (
                  <tr key={person.id}>
                    <td>#{person.apartmentCode}</td>
                    <td>{person.fullName}</td>
                    <td>{person.email}</td>
                    <td>{person.phone}</td>
                    <td>{person.cin}</td>
                    <td>{person.dob}</td>
                    <td className="td-action">
                      <button onClick={() => Navigate(`/person_detail/${person.id}`)} title="eee">
                        <FontAwesomeIcon className="icon-eye" icon={faEye} />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </ApartmentStyled>
    </>
  )
}

export default Persons
