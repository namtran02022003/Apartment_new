import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import baseAxios from '../../apis/ConfigAxios'
import Loading from '../loading/Loading'
import ApartmentStyled from '../../assets/styles/ApartmentStyled'
import * as moment from 'moment'
interface PropsBillsFace {
  id: string
  status: boolean
  createdDate: string
  total: string
  apartmentName: string
  billDetails: [
    {
      serviceFee: {
        price: string
      }
      consume: string
      subTotal: string
    },
    {
      serviceFee: {
        price: string
        subTotal: string
      }
      consume: string
      subTotal: string
    }
  ]
}
const ServiceDetail: FC = () => {
  const { id } = useParams()
  const [bills, setBills] = useState<PropsBillsFace>(Object)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const getBillDetail = async () => {
      try {
        const res = await baseAxios.get(`bills/${id}`)
        setTimeout(() => {
          setLoading(false)
          setBills(res.data)
        }, 500)
      } catch (error) {
        console.log(error)
      }
    }
    getBillDetail()
  }, [id])
  return loading ? (
    <Loading />
  ) : (
    <ApartmentStyled>
      <h2>Bill detail</h2>
      <div className="apartment-content">
        <table>
          <tbody>
            <tr>
              <th>Bill num</th>
              <th>Apartment ID</th>
              <th>
                Electric num
                <span>({Number(bills.billDetails[0].serviceFee.price).toLocaleString()} VND)</span>
              </th>
              <th>
                Water num
                <span>({Number(bills.billDetails[1].serviceFee.price).toLocaleString()} VND)</span>
              </th>
              <th>Created date </th>
              <th>Status</th>
              <th>Total</th>
            </tr>
            <tr key={bills.id}>
              <td>{bills.id}</td>
              <td>{bills.apartmentName}</td>
              <td>
                {bills.billDetails[0].consume} = {Number(bills.billDetails[0].subTotal).toLocaleString()} VND
              </td>
              <td>
                {bills.billDetails[1].consume} = {Number(bills.billDetails[1].subTotal).toLocaleString()} VND
              </td>
              <td>{moment(bills.createdDate).format('DD/MM/YYYY')}</td>
              <td>{bills.status ? 'Pain' : 'Unpain'}</td>
              <td>{Number(bills.total).toLocaleString()} VND</td>
            </tr>
          </tbody>
        </table>
      </div>
    </ApartmentStyled>
  )
}

export default ServiceDetail
