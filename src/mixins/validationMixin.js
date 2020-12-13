import { isValidEmail, isValidPhoneNo } from '../utils'

const validationMixin = {
  data() {
    return {
      textRules: val => !!val.toString() && val.toString().length,
      emailRules: val => !!val && isValidEmail(val),
      phoneNoRules: val => !!val && isValidPhoneNo(val),
    }
  }
}

export default validationMixin
