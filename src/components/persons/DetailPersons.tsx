import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import Loading from '../loading/Loading'
import { useParams } from 'react-router-dom'
import axios from 'axios'
const DetailPersonsStyled = styled.div``
const DetailPersons: FC = () => {
  const [loading, setLoading] = useState(true)
  const [perons, setPersons] = useState([])
  const { id } = useParams()
  useEffect(() => {
    const getMembers = async () => {
      try {
        const resMenbers = await axios.get(`http://localhost:8080/api/represent/${id}/persons`)
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
      <p>detail</p>
    </DetailPersonsStyled>
  )
}

export default DetailPersons
