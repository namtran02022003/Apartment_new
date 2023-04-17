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
      const resMenbers = await axios.get(`http://localhost:8080/api/apartments/${id}/persons-active`)
      setPersons(resMenbers.data)
    }
    getMembers()
    setLoading(false)
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
