import { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import { faEye } from '@fortawesome/free-solid-svg-icons'
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
interface Props<T> {
  persons: Array<T>
}
const ListViewPerson: FC<Props<ListPersonsInterFace>> = ({ persons }) => {
  const Navigate = useNavigate()
  return (
    <div className="apartment-content">
      {persons.length ? (
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
              {persons.map((person: ListPersonsInterFace) => {
                return (
                  <tr key={person.id + person.apartment.code}>
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
        </div>
      ) : (
        <div>No data matching</div>
      )}
    </div>
  )
}

export default ListViewPerson
