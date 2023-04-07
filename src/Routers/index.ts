import Home from '../components/home/Home'
import Apartment from '../components/Apartment/Apartment'
import Resident from '../components/Resident/Resident'
const PublicRouters = [
  { path: '/', component: Home },
  { path: 'apartment', component: Apartment },
  { path: 'resident', component: Resident }
]
export default PublicRouters
