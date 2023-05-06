import { FC, useCallback, useEffect, useState } from 'react'
import Loading from '../loading/Loading'
import { useNavigate, useParams } from 'react-router-dom'
import baseAxios from '../../apis/ConfigAxios'
import ApartmentStyled from '../../assets/styles/ApartmentStyled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

const H2_centerStyled = styled.h2`
  text-align: center;
  margin: 20px 0;
`
interface personFace {
  id: string
  email: string
  phone: string
  carrer: string
  fullName: string
  dob: string
}
const DetailPersons: FC = () => {
  const [loading, setLoading] = useState(true)
  const [persons, setPersons] = useState([])
  const { name } = useParams()
  const [error, setError] = useState('')
  const Navigate = useNavigate()
  const getMembers = useCallback(async () => {
    try {
      const resMenbers = await baseAxios.get(`/represents/list-member`, {
        params: {
          apartmentCode: name
        }
      })
      setTimeout(() => {
        setPersons(resMenbers.data)
        setLoading(false)
      }, 500)
    } catch (error) {
      console.log(error)
      setError('error')
    }
  }, [name])
  useEffect(() => {
    getMembers()
  }, [name, getMembers])
  const handleDeletePerson = async (id: string) => {
    await baseAxios.put(`/persons/change-status`, [id])
    getMembers()
  }
  if (error) {
    return <p>error</p>
  }
  console.log(persons)
  return loading ? (
    <Loading />
  ) : (
    <ApartmentStyled>
      <H2_centerStyled>Detail resident</H2_centerStyled>
      {persons.length > 0 ? (
        <div className="apartment-content">
          <table>
            <tbody>
              <tr>
                <th>Fullname</th>
                <th>ID</th>
                <th>Email</th>
                <th>Phone number</th>
                <th>Date of birth</th>
                <th>Career</th>
                <th>Action</th>
              </tr>
              {persons.map((person: personFace) => {
                return (
                  <tr key={person.id}>
                    <td>{person.fullName}</td>
                    <td>{person.id}</td>
                    <td>{person.email}</td>
                    <td>{person.phone}</td>
                    <td>{person.dob}</td>
                    <td>{person.carrer}</td>
                    <td className="td-action">
                      <button onClick={() => Navigate(`/edit_person/${person.id}`)} title="edit" className="btn-action">
                        <FontAwesomeIcon className="icon-edit" icon={faEdit} />
                      </button>
                      <button onClick={() => handleDeletePerson(person.id)} title="delete" className="btn-action">
                        <FontAwesomeIcon className="icon-delete" icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No data matching</p>
      )}
    </ApartmentStyled>
  )
}

export default DetailPersons
