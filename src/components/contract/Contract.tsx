import { FC, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faEye } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import ApartmentStyled from '../../assets/styles/ApartmentStyled'
import Loading from '../loading/Loading'
import axios from 'axios'
import * as moment from 'moment'
interface ListContractInterFace {
  id: number
  code: string
  apartment: object
  person: string
  status: string
  priceApartment: string | number
  startDate: string
}
const Contract: FC = () => {
  const [contracts, setContracts] = useState([])
  const [loading, setLoading] = useState(true)
  const Navigate = useNavigate()
  useEffect(() => {
    const getContracts = async () => {
      const res = await axios.get('http://localhost:8080/api/contracts', {
        params: {
          pageSize: 10,
          pageNo: 1
        }
      })
      setContracts(res.data)
    }
    getContracts()
    setLoading(false)
  }, [])
  console.log(contracts)
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
            <button onClick={() => Navigate('/create_contract')} className="btn-create">
              Create new Contract
            </button>
          </div>
        </div>
        <div className="apartment-content">
          <table>
            <tbody>
              <tr>
                <th>Contract code</th>
                <th>Apartment name</th>
                <th>Host name</th>
                <th>Acreage</th>
                <th>Rental price</th>
                <th>Registration</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
              {contracts.map((contract: ListContractInterFace) => {
                return (
                  <tr key={contract.id}>
                    <td>#{contract.code}</td>
                    <td>{contract.apartment.name}</td>
                    <td>{contract.person.fullName}</td>
                    <td>{contract.apartment.area}</td>
                    <td>{contract.priceApartment}</td>
                    <td>{moment(contracts.startDate).format('DD/MM/YYYY')}</td>
                    <td>{contract.status == 1 ? 'active' : 'emty'}</td>
                    <td className="td-action">
                      <FontAwesomeIcon icon={faEye} />
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

export default Contract
