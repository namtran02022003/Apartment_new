import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { useState, useEffect } from 'react'
import baseAxios from '../../apis/ConfigAxios'

const MonthlyRevenueChart = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    const getData = async () => {
      const res = await baseAxios.get(`/summary/chart-data`)
      console.log(res)
      setData(res.data.item)
    }
    getData()
  }, [])
  return (
    <BarChart width={1200} height={400} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="revenue" fill="#8884d8" />
    </BarChart>
  )
}

export default MonthlyRevenueChart
