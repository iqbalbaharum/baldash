import { isValidEmail, isValidPhoneNo } from '../utils'

const validationMixin = {
  data() {
    return {
      textRules: val => !!val && val.toString().length > 0,
      emailRules: val => !!val && isValidEmail(val),
      phoneNoRules: val => !!val && isValidPhoneNo(val),
    }
  }
}

export default validationMixin
