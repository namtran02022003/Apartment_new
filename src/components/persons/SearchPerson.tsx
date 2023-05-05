import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import baseAxios from '../../apis/ConfigAxios'
import ListViewPerson from './ListViewPerson'
import ApartmentStyled from '../../assets/styles/ApartmentStyled'
const SearchApartments: FC = () => {
  const { name } = useParams()
  const [personList, setPersonsList] = useState([])
  useEffect(() => {
    const getListPersons = async () => {
      try {
        const res = await baseAxios.get('/persons/search-by-name', {
          params: {
            personName: name
          }
        })
        setPersonsList(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getListPersons()
  }, [name])
  return (
    <ApartmentStyled>
      <ListViewPerson persons={personList} />
    </ApartmentStyled>
  )
}
export default SearchApartments
