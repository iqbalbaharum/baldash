import { Database } from '@vuex-orm/core'
import User from '../models/User'
import Session from '../models/Session'
import Zone from '../models/Zone'
import Role from '../models/Role'
import Branch from '../models/Branch'
import Lead from '../models/Lead'
<<<<<<< HEAD
import ItemList from '../models/ItemList'
=======
import QualifiedLeads from '../models/QualifiedLeads'
>>>>>>> 080c1dfc6a78000e44e8b40f328d5a217188f99b
// Relation
import UserRole from '../models/UserRole'

const database = new Database()

database.register(User)
database.register(Session)
database.register(Zone)
database.register(Role)
database.register(Branch)
database.register(ItemList)
database.register(Lead)
database.register(QualifiedLeads)

//
database.register(UserRole)

export default database
