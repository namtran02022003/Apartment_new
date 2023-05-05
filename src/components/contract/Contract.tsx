import { FC, useState, useEffect, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faEye, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import ApartmentStyled from '../../assets/styles/ApartmentStyled'
import Loading from '../loading/Loading'
import baseAxios from '../../apis/ConfigAxios'
import * as moment from 'moment'
import PagingBar from '../pagingbar/PagingBar '
import AlertMessage from '../alertMessage/AlertMessage'
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
interface Contract {
  content: []
  totalElements: number
}
const Contract: FC = () => {
  const [contracts, setContracts] = useState<Contract>(Object)
  const [loading, setLoading] = useState(true)
  const [index, setIndex] = useState(1)
  const [showMess, setShowMess] = useState(false)
  const Navigate = useNavigate()
  const getContracts = useCallback(async () => {
    try {
      const res = await baseAxios.get('/contracts', {
        params: {
          pageSize: 10,
          pageNo: index
        }
      })
      setTimeout(() => {
        setContracts(res.data)
        setLoading(false)
      }, 500)
    } catch (error) {
      console.log(error)
    }
  }, [index])
  useEffect(() => {
    getContracts()
  }, [index, getContracts])
  const handleDeleteContract = async (id: number) => {
    try {
      await baseAxios.put(`/contracts/change-status`, [id])
      setShowMess(true)
      getContracts()
    } catch (error) {
      console.log(error)
    }
  }
  return loading ? (
    <Loading />
  ) : (
    <>
      {showMess && <AlertMessage setShow={setShowMess} show={showMess} message="ok" />}
      <ApartmentStyled>
        <div className="apartment-flex">
          <div className="apartment-flex-item">
            <h3>Total contracts: {contracts.totalElements}</h3>
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
          {contracts.content.length > 0 ? (
            <>
              <table>
                <tbody>
                  <tr>
                    <th>Apartment name</th>
                    <th>Host name</th>
                    <th>Area</th>
                    <th>Rental price</th>
                    <th>Registration</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                  {contracts.content.map((contract: ListContractInterFace) => {
                    return (
                      <tr key={contract.code}>
                        <td>{contract.apartment.name}</td>
                        <td>{contract.person.fullName}</td>
                        <td>
                          {contract.apartment.area}m<sub>2</sub>
                        </td>
                        <td>{Number(contract.priceApartment).toLocaleString()} VND</td>
                        <td>{moment(contract.startDate).format('DD/MM/YYYY')}</td>
                        <td>{contract.status}</td>
                        <td className="td-action">
                          <button onClick={() => Navigate(`/detail-contrac/${contract.id}`)} title="view detail contract">
                            <FontAwesomeIcon className="icon-eye" icon={faEye} />
                          </button>
                          <button onClick={() => handleDeleteContract(contract.id)} title="view detail contract">
                            <FontAwesomeIcon className="icon-faTrash" icon={faTrash} />
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <PagingBar currentPage={index} totalPages={Math.ceil(Number(contracts.totalElements) / 10)} onPageChange={setIndex} />
            </>
          ) : (
            <div>No data matching</div>
          )}
        </div>
      </ApartmentStyled>
    </>
  )
}

export default Contract
