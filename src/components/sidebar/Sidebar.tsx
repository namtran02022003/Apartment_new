import { FC } from 'react'
import SidebarStyled from '../../assets/styles/Sidebar'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
const listItem = [
  { name: 'Apartments', path: '/' },
  { name: 'Resident', path: '/resident' },
  { name: 'Service', path: '/service' },
  { name: 'Contract', path: '/contract' }
]
const Sidebar: FC = () => {
  const { pathname } = useLocation()
  return (
    <SidebarStyled>
      <Link to="/">
        <FontAwesomeIcon className="icon-home" icon={faHome} />
        Apartment management
      </Link>
      <div className="content">
        {listItem.map((item, index) => {
          return (
            <Link className={`navbar-item ${item.path == pathname ? 'active' : ''}`} to={item.path} key={index}>
              {item.name}
            </Link>
          )
        })}
      </div>
    </SidebarStyled>
  )
}
export default Sidebar
