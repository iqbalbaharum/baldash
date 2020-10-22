import { Database } from '@vuex-orm/core'
import User from '../models/User'
import Session from '../models/Session'
import Category from '../models/Category'
import Zone from '../models/Zone'
import Role from '../models/Role'
import Product from '../models/Product'
import Courier from '../models/Courier'

// Relation
import UserRole from '../models/UserRole'

const database = new Database()

database.register(User)
database.register(Session)
database.register(Category)
database.register(Zone)
database.register(Role)
database.register(Product)
database.register(Courier)
//
database.register(UserRole)

export default database
