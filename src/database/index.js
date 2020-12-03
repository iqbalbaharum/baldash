import { Database } from '@vuex-orm/core'
import User from '../models/User'
import Session from '../models/Session'
import Zone from '../models/Zone'
import Role from '../models/Role'
import Branch from '../models/Branch'
import Lead from '../models/Lead'
import ItemList from '../models/ItemList'
import QualifiedLeads from '../models/QualifiedLeads'
import Profile from '../models/Profile'
import Permission from '../models/Permission'
import Country from '../models/Country'

// Relation
import UserRole from '../models/UserRole'
// Other
import Container from '../models/Container'

const database = new Database()

database.register(User)
database.register(Session)
database.register(Zone)
database.register(Role)
database.register(Branch)
database.register(ItemList)
database.register(Lead)
database.register(QualifiedLeads)
database.register(Profile)
database.register(Permission)
database.register(Country)

//
database.register(UserRole)
//
database.register(Container)

export default database
