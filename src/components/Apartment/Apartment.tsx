import React, { FC, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faEye } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, Link } from 'react-router-dom'
import ApartmentStyled from '../../assets/styles/ApartmentStyled'
import Loading from '../loading/Loading'
import PagingBar from '../pagingbar/PagingBar '
import styled from 'styled-components'
import baseAxios from '../../apis/ConfigAxios'
const FormSearchStyled = styled.form`
  position: relative;
  .menu_search {
    width: 100%;
    background: #fff;
    position: absolute;
    height: 200px;
    overflow: auto;
    padding: 25px 15px;
    box-sizing: border-box;
    z-index: 100;
    border-radius: 10px;
    span {
      position: absolute;
      right: 3%;
      top: 5px;
      cursor: pointer;
      padding: 5px 10px;
      background: rgb(245 238 238);
      border-radius: 4px;
    }
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
interface MouseEvent {
  preventDefault(): void
}
const Apartment: FC = () => {
  const [apartments, setApartment] = useState([])
  const [loading, setLoading] = useState(true)
  const [show, setShow] = useState(false)
  const [index, setIndex] = useState(1)
  const [textSearch, setTextSearch] = useState('')
  const [dataSearchs, setDatasSearch] = useState([])
  const [countApartment, setCountApartment] = useState(0)
  const Navigate = useNavigate()
  const [err, setErr] = useState('')
  useEffect(() => {
    const getApartments = async () => {
      setLoading(true)
      try {
        const res = await baseAxios.get(`/apartments`, {
          params: {
            pageSize: 10,
            pageNo: index
          }
        })
        const resTotal = await baseAxios.get(`/apartments/count-apartment-occupied`)
        setTimeout(() => {
          setCountApartment(resTotal.data)
          setApartment(res.data)
          setLoading(false)
        }, 500)
      } catch (error) {
        setErr('ERRR')
      }
    }
    getApartments()
  }, [index])

  useEffect(() => {
    const getDataSearchs = async () => {
      const res = await baseAxios.get('/apartments/search-by-name', {
        params: {
          apartmentName: textSearch.trim()
        }
      })
      setDatasSearch(res.data)
    }
    if (textSearch.trim().length > 0) {
      getDataSearchs()
    }
  }, [textSearch])

  const handleClickLink = (e: MouseEvent) => {
    e.preventDefault()
    alert('emty')
  }
  console.log(apartments)
  if (err) {
    return <div>{err}</div>
  }
  return loading ? (
    <Loading />
  ) : (
    <>
      <ApartmentStyled>
        <div className="apartment-flex">
          <div className="apartment-flex-item">
            <h3>Total apartments: {countApartment}/100</h3>
          </div>
          <div className="apartment-flex-item apartment-flex">
            <FormSearchStyled>
              <input
                maxLength={50}
                type="text"
                value={textSearch}
                onChange={(e) => {
                  setTextSearch(e.target.value)
                  setShow(true)
                }}
                placeholder="Enter search..."
              />
              <button
                disabled={!textSearch}
                type="button"
                onClick={() => {
                  Navigate(`/apartments/search_by_name/${textSearch}`)
                }}
                title="search"
                className="btn-search"
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
              {show && (
                <div className="menu_search">
                  {dataSearchs.length > 0 ? (
                    dataSearchs.map((apartment: { roomMaster: string; id: number | string; apartmentCode: string }) => {
                      return (
                        <Link
                          to={`/apartment_detail/${apartment.id}`}
                          key={apartment.id}
                          onClick={!apartment.roomMaster ? (e) => handleClickLink(e) : undefined}
                        >
                          {apartment.apartmentCode}
                        </Link>
                      )
                    })
                  ) : (
                    <p>no data</p>
                  )}
                </div>
              )}
            </FormSearchStyled>
          </div>
        </div>
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
              {apartments.map((apartment: ApartmentInterFace) => {
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
        <div>
          <PagingBar currentPage={index} totalPages={10} onPageChange={setIndex} />
        </div>
      </ApartmentStyled>
    </>
  )
}

export default Apartment
