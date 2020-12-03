
import UserRepository from './UserRepository'
import SessionRepository from './SessionRepository'
import ZoneRepository from './ZoneRepository'
import RoleRepository from './RoleRepository'
import LeadRepository from './LeadRepository'
import BranchRepository from './BranchRepository'
import ItemlistRepository from './ItemlistRepository'
import QualifiedLeadsRepository from './QualifiedLeadsRepository'
import ContainerRepository from './ContainerRepository'
import PermissionRepository from './PermissionRepository'

export default {
  // userRepository: bind('userRepository', RepositoryInterface)
  user: new UserRepository(),
  session: new SessionRepository(),
  zone: new ZoneRepository(),
  role: new RoleRepository(),
  lead: new LeadRepository(),
  branch: new BranchRepository(),
  itemlist: new ItemlistRepository(),
  qualifiedleads: new QualifiedLeadsRepository(),
  container: new ContainerRepository(),
  permission: new PermissionRepository(),
}
