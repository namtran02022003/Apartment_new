import { FC, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faEye } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, Link } from 'react-router-dom'
import ApartmentStyled from '../../assets/styles/ApartmentStyled'
import Loading from '../loading/Loading'
import axios from 'axios'
import PagingBar from '../pagingbar/PagingBar '
import styled from 'styled-components'
const FormSearchStyled = styled.form`
  position: relative;
  .menu_search {
    width: 100%;
    background: #fff;
    position: absolute;
    height: 200px;
    overflow: auto;
    padding: 10px 15px;
    box-sizing: border-box;
    z-index: 100;
    border-radius: 10px;
    a {
      padding: 5px;
      cursor: pointer;
      display: block;
      color: black;
      &:hover {
        background: #ccc;
      }
    }
  }
`
interface ApartmentInterFace {
  id: number
  roomMaster: string
  contractCode: string
  status: string
  personInApartment: string | number
  apartmentCode: string
}
const Apartment: FC = () => {
  const [apartments, setApartment] = useState([])
  const [loading, setLoading] = useState(true)
  const [index, setIndex] = useState(1)
  const [textSearch, setTextSearch] = useState('')
  const [dataSearchs, setDatasSearch] = useState([])
  const Navigate = useNavigate()
  useEffect(() => {
    try {
      const getApartments = async () => {
        const res = await axios.get('http://localhost:8080/api/apartments', {
          params: {
            pageSize: 10,
            pageNo: index
          }
        })
        setApartment(res.data)
      }
      getApartments()
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }, [index])

  useEffect(() => {
    const getDataSearchs = async () => {
      const res = await axios.post('http://localhost:8080/api/apartments/search-by-name', {
        name: textSearch.trim()
      })
      setDatasSearch(res.data)
    }
    if (textSearch.trim().length > 0) {
      getDataSearchs()
    }
  }, [textSearch])
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
            <FormSearchStyled>
              <input
                type="text"
                value={textSearch}
                onChange={(e) => {
                  setTextSearch(e.target.value)
                }}
                placeholder="Enter search..."
              />
              <button title="search" type="submit" className="btn-search">
                <FontAwesomeIcon icon={faSearch} />
              </button>
              {textSearch.trim().length > 0 && (
                <div className="menu_search">
                  {dataSearchs.map((apartment: object) => {
                    return (
                      <Link to={`/apartment_detail/${apartment.id}`} key={apartment.id}>
                        {apartment.apartmentCode}
                      </Link>
                    )
                  })}
                </div>
              )}
            </FormSearchStyled>
          </div>
        </div>
        <div className="apartment-content">
          <table>
            <tbody>
              <tr>
                <th>apartmentCode</th>
                <th>Persons</th>
                <th>contractCode</th>
                <th>status</th>
                <th>Number/room</th>
                <th>Actions</th>
              </tr>
              {apartments.map((apartment: ApartmentInterFace) => {
                return (
                  <tr key={apartment.id}>
                    <td>#{apartment.apartmentCode}</td>
                    <td>{apartment.roomMaster || 'Emty'}</td>
                    <td>{apartment.contractCode || 'Emty'}</td>
                    <td>{apartment.status == 1 ? 'Occupied ' : 'Available'}</td>
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
        <div>
          <PagingBar currentPage={index} totalPages={10} onPageChange={setIndex} />
        </div>
      </ApartmentStyled>
    </>
  )
}

export default Apartment
