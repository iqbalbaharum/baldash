

import UserRepository from './UserRepository'
import SessionRepository from './SessionRepository'
import ZoneRepository from './ZoneRepository'
import RoleRepository from './RoleRepository'
import CategoryRepository from './CategoryRepository'
import ProductRepository from './ProductRepository'
import CourierRepository from './CourierRepository'

export default {
  //userRepository: bind('userRepository', RepositoryInterface)
  user: new UserRepository(),
  session: new SessionRepository(),
  category: new CategoryRepository(),
  product: new ProductRepository(),
  zone: new ZoneRepository(),
  role: new RoleRepository(),
  courier: new CourierRepository()
}
