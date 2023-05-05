import { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
interface ListServiceInterFace {
  billNum: string | number
  apartmentName: string | number
  total: string
  status: string
  id: number
}
interface Props<T> {
  services: Array<T>
}
const ListViewService: FC<Props<ListServiceInterFace>> = ({ services }) => {
  const Navigate = useNavigate()
  return (
    <div className="apartment-content">
      <table>
        <tbody>
          <tr>
            <th>bill num</th>
            <th>Apartment num</th>
            <th>Total amound Unpaid</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
          {services.map((service: ListServiceInterFace) => {
            return (
              <tr key={service.id}>
                <td>#{service.id}</td>
                <td>{service.apartmentName}</td>
                <td>{Number(service.total).toLocaleString()} VND</td>
                <td>{service.status ? 'Pain' : 'Unpain'}</td>
                <td className="td-action">
                  <button onClick={() => Navigate(`/service_detail/${service.id}`)} title="view detail">
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

export default ListViewService
