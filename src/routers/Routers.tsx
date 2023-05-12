import Home from '../components/home/Home'
import ListUser from '../components/listUser/ListUser'
import Apartments from '../components/apartments/Apartments'
import Buildings from '../components/buildings/Buildings'
import Services from '../components/services/Services'
import Residents from '../components/residents/Residents'

const PublicRouters = [
  { path: '/', component: Home },
  { path: '/users-list', component: ListUser },
  { path: '/apartments', component: Apartments },
  { path: '/buildings', component: Buildings },
  { path: '/services', component: Services },
  { path: '/residents', component: Residents }
]

export default PublicRouters
