import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

interface ApartmentsInterFace {
  id: number
  roomMaster: string
  contractCode: string
  status: string
  personInApartment: string | number
  apartmentCode: string
}

interface Props<T> {
  apartments: Array<T>
}

const ListViewApartment: FC<Props<ApartmentsInterFace>> = ({ apartments }) => {
  const Navigate = useNavigate()

  return (
    <div className="apartment-content">
      <table>
        <tbody>
          <tr>
            <th>Apartment ID</th>
            <th>Host name</th>
            <th>Status</th>
            <th>Resident number</th>
            <th>Action</th>
          </tr>
          {apartments.map((apartment: ApartmentsInterFace) => {
            return (
              <tr key={apartment.id}>
                <td>{apartment.apartmentCode}</td>
                <td>{apartment.roomMaster || 'Emty'}</td>
                <td>{apartment.status ? <b>Occupied</b> : 'Available'}</td>
                <td>{apartment.personInApartment}</td>
                <td className="td-action">
                  <button
                    disabled={!apartment.contractCode}
                    onClick={() => {
                      Navigate(`/apartment_detail/${apartment.id}`)
                    }}
                    title="view"
                  >
                    <FontAwesomeIcon className="icon-eye" icon={faEye} />
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ListViewApartment
