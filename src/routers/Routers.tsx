import SignUp from '../components/form/SignUp'
import Login from '../components/form/Login'
import Home from '../components/home/Home'
import Table from '../components/table/Table'

const PublicRouters = [
  { path: '/', component: Home },
  { path: '/login', component: Login, layout: null },
  { path: '/signup', component: SignUp, layout: null },
  { path: '/table', component: Table }
]

export default PublicRouters
