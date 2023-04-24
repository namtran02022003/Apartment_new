import { FC, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faEye } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import ApartmentStyled from '../../assets/styles/ApartmentStyled'
import Loading from '../loading/Loading'
import baseAxios from '../../apis/ConfigAxios'
import * as moment from 'moment'
import withAuthorization from '../../routers/WithAuthorization'
interface ListContractInterFace {
  id: number
  code: string
  apartment: {
    name: string
    area: string | number
  }
  person: {
    fullName: string
  }
  status: string | number
  priceApartment: string | number
  startDate: string
}
const Contract: FC = () => {
  const [contracts, setContracts] = useState([])
  const [loading, setLoading] = useState(true)
  const Navigate = useNavigate()
  useEffect(() => {
    const getContracts = async () => {
      try {
        const res = await baseAxios.get('/contracts', {
          params: {
            pageSize: 10,
            pageNo: 1
          }
        })
        setContracts(res.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    getContracts()
  }, [])
  console.log(contracts)
  return loading ? (
    <Loading />
  ) : (
    <>
      <ApartmentStyled>
        <div className="apartment-flex">
          <div className="apartment-flex-item">
            <h3>Total contracts: 20/50</h3>
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
                    <td>{contract.apartment.name}</td>
                    <td>{contract.person.fullName}</td>
                    <td>{contract.apartment.area}</td>
                    <td>{Number(contract.priceApartment).toLocaleString()} VND</td>
                    <td>{moment(contracts.startDate).format('DD/MM/YYYY')}</td>
                    <td>{contract.status}</td>
                    <td className="td-action">
                      <button title="view detail contract">
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

export default withAuthorization(Contract)
