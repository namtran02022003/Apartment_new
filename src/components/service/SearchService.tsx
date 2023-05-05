import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import baseAxios from '../../apis/ConfigAxios'
import ApartmentStyled from '../../assets/styles/ApartmentStyled'
import Loading from '../loading/Loading'
import ListViewService from './ListViewService'
interface PropsDataFace {
  content: []
}
const SearchService: FC = () => {
  const { startDate, endDate, textSearch } = useParams()
  const [data, setData] = useState<PropsDataFace>(Object)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const getData = async () => {
      const res = await baseAxios.get(`bills/search`, {
        params: {
          apartmentCode: textSearch,
          endDate: endDate,
          startDate: startDate
        }
      })
      setLoading(false)
      setData(res.data)
    }
    getData()
  }, [startDate, endDate, textSearch])
  console.log(data)
  return loading ? (
    <Loading />
  ) : (
    <ApartmentStyled>
      <h2>
        Bill from:
        {startDate}
        to:
        {endDate}
        Apartment:
        {textSearch}
      </h2>
      <ListViewService services={data.content} />
    </ApartmentStyled>
  )
}

export default SearchService
