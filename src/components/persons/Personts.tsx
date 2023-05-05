import { FC, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, Link } from 'react-router-dom'
import ApartmentStyled from '../../assets/styles/ApartmentStyled'
import Loading from '../loading/Loading'
import baseAxios from '../../apis/ConfigAxios'
import PagingBar from '../pagingbar/PagingBar '
import ListViewPerson from './ListViewPerson'
import { FormSearchStyled } from '../apartment/Apartment'
interface PersonsFace {
  content: []
  totalElements: number
}
const Persons: FC = () => {
  const [persons, setPersons] = useState<PersonsFace>(Object)
  const [loading, setLoading] = useState(true)
  const [index, setIndex] = useState(1)
  const [textSearch, setTextSearch] = useState('')
  const [dataSearchs, setDatasSearch] = useState([])
  const [show, setShow] = useState(false)
  const Navigate = useNavigate()
  useEffect(() => {
    const getPersons = async () => {
      try {
        const res = await baseAxios.get('/persons/represent', {
          params: {
            pageSize: 10,
            pageNo: index
          }
        })
        setTimeout(() => {
          setPersons(res.data)
          setLoading(false)
        }, 500)
      } catch (error) {
        console.log(error)
      }
    }
    getPersons()
  }, [index])
  useEffect(() => {
    const getDataSearchs = async () => {
      const res = await baseAxios.get('/persons/search-by-name', {
        params: {
          personName: textSearch.trim()
        }
      })
      console.log(res)
      setDatasSearch(res.data)
    }
    if (textSearch.trim().length > 0) {
      console.log(textSearch)
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
  return loading ? (
    <Loading />
  ) : (
    <>
      <ApartmentStyled>
        <div className="apartment-flex">
          <div className="apartment-flex-item">
            <h3>Total resident: {persons.totalElements}</h3>
          </div>
          <div className="apartment-flex-item apartment-flex">
            <FormSearchStyled>
              <input
                type="text"
                placeholder="Enter search..."
                value={textSearch}
                onChange={(e) => {
                  setTextSearch(e.target.value)
                  setShow(true)
                }}
              />
              <button title="search" type="button" className="btn-search">
                <FontAwesomeIcon icon={faSearch} />
              </button>
              {show && (
                <div id="menu_search" className="menu_search">
                  {dataSearchs.length > 0 ? (
                    dataSearchs.map((person: { fullName: string; id: number | string; apartment: { code: string } }) => {
                      return (
                        <Link to={`/person_detail/${person.apartment.code}`} key={person.id}>
                          {person.fullName} - {person.apartment.code}
                        </Link>
                      )
                    })
                  ) : (
                    <p>no data</p>
                  )}
                </div>
              )}
            </FormSearchStyled>
            <button onClick={() => Navigate('/Create_persons')} className="btn-create">
              Create new Persons
            </button>
          </div>
        </div>
        <ListViewPerson persons={persons.content} />
        {persons.content.length > 0 && <PagingBar currentPage={index} totalPages={Math.ceil(Number(persons.totalElements) / 10)} onPageChange={setIndex} />}
      </ApartmentStyled>
    </>
  )
}

export default Persons
