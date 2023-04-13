import Apartment from '../components/Apartment/Apartment'
import Resident from '../components/Resident/Resident'
import Ssevice from '../components/service/Service'
import Bill from '../components/bill/Bill'
import Contract from '../components/contract/Contract'
import FormCreateApartment from '../components/forms/FormCreateApartment'
import FormCreatePersons from '../components/forms/FormCreatePersons'
const PublicRouters = [
  { path: '/', component: Apartment },
  { path: 'resident', component: Resident },
  { path: 'service', component: Ssevice },
  { path: 'bill', component: Bill },
  { path: 'Contract', component: Contract },
  { path: 'create_apartment', component: FormCreateApartment, type: 'Create', layout: true },
  { path: 'update_apartment/:id', component: FormCreateApartment, type: 'Update', layout: true },
  { path: 'Create_persons', component: FormCreatePersons, type: 'Create', layout: true }
]
export default PublicRouters
