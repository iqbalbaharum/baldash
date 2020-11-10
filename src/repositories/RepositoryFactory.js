
import UserRepository from './UserRepository'
import SessionRepository from './SessionRepository'
import ZoneRepository from './ZoneRepository'
import RoleRepository from './RoleRepository'
import LeadRepository from './LeadRepository'
import BranchRepository from './BranchRepository'

export default {
  // userRepository: bind('userRepository', RepositoryInterface)
  user: new UserRepository(),
  session: new SessionRepository(),
  zone: new ZoneRepository(),
  role: new RoleRepository(),
  lead: new LeadRepository(),
  branch: new BranchRepository()
}
