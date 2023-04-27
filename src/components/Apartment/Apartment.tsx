import React, { FC, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, Link } from 'react-router-dom'
import ApartmentStyled from '../../assets/styles/ApartmentStyled'
import Loading from '../loading/Loading'
import PagingBar from '../pagingbar/PagingBar '
import styled from 'styled-components'
import baseAxios from '../../apis/ConfigAxios'
import ListViewApartment from './ListViewApartment'
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

interface MouseEvent {
  preventDefault(): void
}
interface Apartment {
  content: []
  totalElements: number
}
const Apartment: FC = () => {
  const [apartments, setApartment] = useState<Apartment>(Object)
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
      const res = await baseAxios.get('/apartments/search-by-represent', {
        params: {
          represent: textSearch.trim()
        }
      })
      setDatasSearch(res.data)
    }
    if (textSearch.trim().length > 0) {
      getDataSearchs()
    }
  }, [textSearch])
  useEffect(() => {
    function closeMenuSearch(e: MouseEvent | TouchEvent) {
      const element = document.getElementById('menu_search')
      console.log(element)
      if (e instanceof MouseEvent && e.target != element) {
        setShow(false)
      }
    }
    if (show) {
      window.addEventListener('click', closeMenuSearch)
      return () => {
        window.removeEventListener('click', closeMenuSearch)
      }
    }
  })
  const handleClickLink = (e: MouseEvent) => {
    e.preventDefault()
    alert('emty')
  }
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
            <h3>
              Total apartments: {countApartment}/{apartments.totalElements}
            </h3>
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
                <div id="menu_search" className="menu_search">
                  {dataSearchs.length > 0 ? (
                    dataSearchs.map((apartment: { roomMaster: string; id: number | string; apartmentCode: string }) => {
                      return (
                        <Link
                          to={`/apartment_detail/${apartment.id}`}
                          key={apartment.id}
                          onClick={!apartment.roomMaster ? (e) => handleClickLink(e) : undefined}
                        >
                          {apartment.apartmentCode} - {apartment.roomMaster}
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
        <ListViewApartment apartments={apartments.content} />
        <div>
          <PagingBar currentPage={index} totalPages={10} onPageChange={setIndex} />
        </div>
      </ApartmentStyled>
    </>
  )
}

export default Apartment
