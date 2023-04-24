import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import Loading from '../loading/Loading'
import { useParams } from 'react-router-dom'
import baseAxios from '../../apis/ConfigAxios'
const DetailPersonsStyled = styled.div``
const DetailPersons: FC = () => {
  const [loading, setLoading] = useState(true)
  const [perons, setPersons] = useState([])
  const { id } = useParams()
  useEffect(() => {
    const getMembers = async () => {
      try {
        const resMenbers = await baseAxios.get(`/represent/${id}/persons`)
        setPersons(resMenbers.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    getMembers()
  }, [id])
  console.log(perons)
  return loading ? (
    <Loading />
  ) : (
    <DetailPersonsStyled>
      <table>
        <tbody>
          <tr>
            <th></th>
          </tr>
        </tbody>
      </table>
    </DetailPersonsStyled>
  )
}

export default DetailPersons
