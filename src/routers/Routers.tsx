import Home from '../components/home/Home'
import ListUser from '../components/listUser/ListUser'
import Apartments from '../components/apartments/Apartments'
import Buildings from '../components/buildings/Buildings'
import Services from '../components/services/Services'
import Residents from '../components/residents/Residents'
import Contracts from '../components/contracts/Contracts'
import ServiceFee from '../components/servicefee/ServiceFee'
import ServicesManagement from '../components/services-fee-management/ServicesManagement'
const PublicRouters = [
  { path: '/', component: Home },
  { path: '/users-list', component: ListUser },
  { path: '/apartments', component: Apartments },
  { path: '/buildings', component: Buildings },
  { path: '/services', component: Services },
  { path: '/residents', component: Residents },
  { path: '/contracts', component: Contracts },
  { path: '/service-fee', component: ServiceFee },
  { path: '/service-management', component: ServicesManagement }
]

export default PublicRouters
