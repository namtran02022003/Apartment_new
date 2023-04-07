import { FC } from 'react'
import SideBarStyled from '../../assets/styles/SideBarStyled'
import { Link } from 'react-router-dom'
const listItem = [
  { name: 'Home', path: '/' },
  { name: 'Apartment', path: '/apartment' },
  { name: 'Resident', path: '/resident' },
  { name: 'Service', path: '/service' }
]
const SideBar: FC = () => {
  return (
    <SideBarStyled>
      {listItem.map((item, index) => {
        return (
          <Link className="sidebar-item" to={item.path} key={index}>
            {item.name}
          </Link>
        )
      })}
    </SideBarStyled>
  )
}
export default SideBar
