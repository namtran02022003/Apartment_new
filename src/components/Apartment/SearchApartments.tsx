import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import baseAxios from '../../apis/ConfigAxios'
import ListViewApartment from './ListViewApartment'
import ApartmentStyled from '../../assets/styles/ApartmentStyled'
const SearchApartments: FC = () => {
  const { name } = useParams()
  const [apartmentList, setApartmentList] = useState([])
  useEffect(() => {
    const getListApartments = async () => {
      try {
        const res = await baseAxios.get('/apartments/search-by-name', {
          params: {
            apartmentName: name
          }
        })
        setApartmentList(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getListApartments()
  }, [name])
  console.log(apartmentList)
  return (
    <ApartmentStyled>
      <ListViewApartment apartments={apartmentList} />
    </ApartmentStyled>
  )
}
export default SearchApartments
