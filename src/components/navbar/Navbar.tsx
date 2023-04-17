import { FC } from 'react'
import Navbar from '../../assets/styles/Navbar'
import { Link, useLocation } from 'react-router-dom'
const listItem = [
  { name: 'Apartment', path: '/' },
  { name: 'Persons', path: '/persons' },
  { name: 'Service', path: '/service' },
  { name: 'Contract', path: '/contract' }
]
const Navbars: FC = () => {
  const { pathname } = useLocation()
  return (
    <Navbar>
      {listItem.map((item, index) => {
        return (
          <Link className={`navbar-item ${item.path == pathname ? 'active' : ''}`} to={item.path} key={index}>
            {item.name}
          </Link>
        )
      })}
    </Navbar>
  )
}
export default Navbars
