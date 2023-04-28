import { FC, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faEye } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import ApartmentStyled from '../../assets/styles/ApartmentStyled'
import Loading from '../loading/Loading'
import baseAxios from '../../apis/ConfigAxios'
import PagingBar from '../pagingbar/PagingBar '
interface ListPersonsInterFace {
  id: number
  fullName: string
  email: string
  dob: string
  phone: string
  cin: string
  gender: boolean
  carrer: string
  apartment: { code: string }
  status: string | number
}
interface Persons {
  content: []
  totalElements: number
}
const Persons: FC = () => {
  const [persons, setPersons] = useState<Persons>(Object)
  const [loading, setLoading] = useState(true)
  const [index, setIndex] = useState(1)
  const Navigate = useNavigate()
  useEffect(() => {
    const getPersons = async () => {
      try {
        const res = await baseAxios.get('/persons/represent', {
          params: {
            pageSize: 10,
            pageNo: index
          }
        })
        setTimeout(() => {
          setPersons(res.data)
          setLoading(false)
        }, 500)
      } catch (error) {
        console.log(error)
      }
    }
    getPersons()
  }, [index])
  console.log(persons)
  return loading ? (
    <Loading />
  ) : (
    <>
      <ApartmentStyled>
        <div className="apartment-flex">
          <div className="apartment-flex-item">
            <h3>Total resident: {persons.totalElements}</h3>
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
          {persons.content.length ? (
            <div>
              <table>
                <tbody>
                  <tr>
                    <th>Apartment ID</th>
                    <th>Host name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>ID</th>
                    <th>Action</th>
                  </tr>
                  {persons.content.map((person: ListPersonsInterFace) => {
                    return (
                      <tr key={person.id}>
                        <td>#{person.apartment.code}</td>
                        <td>{person.fullName}</td>
                        <td>{person.email}</td>
                        <td>{person.phone}</td>
                        <td>{person.cin}</td>
                        <td className="td-action">
                          <button onClick={() => Navigate(`/person_detail/${person.apartment.code}`)} title="view detail">
                            <FontAwesomeIcon className="icon-eye" icon={faEye} />
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <PagingBar currentPage={index} totalPages={10} onPageChange={setIndex} />
            </div>
          ) : (
            <div>no data</div>
          )}
        </div>
      </ApartmentStyled>
    </>
  )
}

export default Persons
