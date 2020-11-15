import { Database } from '@vuex-orm/core'
import User from '../models/User'
import Session from '../models/Session'
import Zone from '../models/Zone'
import Role from '../models/Role'
import Branch from '../models/Branch'
import Lead from '../models/Lead'
import QualifiedLeads from '../models/QualifiedLeads'
// Relation
import UserRole from '../models/UserRole'

const database = new Database()

database.register(User)
database.register(Session)
database.register(Zone)
database.register(Role)
database.register(Branch)
database.register(Lead)
database.register(QualifiedLeads)

//
database.register(UserRole)

export default database
