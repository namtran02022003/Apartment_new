import { FC } from 'react'
import SidebarStyled from '../../assets/styles/Sidebar'
import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUsers, faMoneyCheck, faFileSignature, IconDefinition } from '@fortawesome/free-solid-svg-icons'

interface SidebarItem {
  name: string
  path: string
  icon?: IconDefinition
}

const listItem: SidebarItem[] = [
  { name: 'Apartments', path: '/', icon: faHome },
  { name: 'Resident', path: '/resident', icon: faUsers },
  { name: 'Service', path: '/service', icon: faMoneyCheck },
  { name: 'Contract', path: '/contract', icon: faFileSignature }
]
const Sidebar: FC = () => {
  const { pathname } = useLocation()

  return (
    <SidebarStyled>
      <Link to="/">
        <img className="logo-home" alt="logo apartment" src={logo} />
      </Link>
      <div className="content">
        {listItem.map((item, index) => {
          return (
            <Link className={`navbar-item ${item.path === pathname ? 'active' : ''}`} to={item.path} key={index}>
              {item.icon && <FontAwesomeIcon icon={item.icon} />} {item.name}
            </Link>
          )
        })}
      </div>
    </SidebarStyled>
  )
}

export default Sidebar
