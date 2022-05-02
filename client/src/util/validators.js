const TYPE_REQUIRED = "REQUIRED"
const TYPE_MIN_LENGTH = "REQUIRE_MIN_LENGTH"
const TYPE_MAX_LENGTH= "REQUIRE_MAX_LENGTH"
const TYPE_REQUIRE_EMAIL = "REQUIRE_EMAIL"
const TYPE_SAME_AS = "SAME_AS"


const VALIDATOR_REQUIRED = () => ({type: TYPE_REQUIRED})
const VALIDATOR_MIN_LENGTH = val => ({type: TYPE_MIN_LENGTH, value: val})
const VALIDATOR_MAX_LENGTH = val => ({type: TYPE_MAX_LENGTH, value: val})
const VALIDATOR_EMAIL = () => ({type: TYPE_REQUIRE_EMAIL})
const VALIDATOR_SAME_AS = val => ({type: TYPE_SAME_AS, value: val})

const valid = (value, validators) => {
    let isValid=true
    validators.forEach(validator => {
        switch (validator.type) {
            case TYPE_REQUIRED:
                 isValid = isValid &&  value.trim().length > 0
                 break
            case TYPE_MIN_LENGTH:
                 isValid = isValid &&value.trim().length >= validator.value
                break
            case TYPE_MAX_LENGTH:
                 isValid =isValid && value.trim().lenght <= validator.value
                 break
            case TYPE_REQUIRE_EMAIL:
                isValid = isValid &&/^\S+@\S+\.\S+$/.test(value)
                break
            case TYPE_SAME_AS:
                isValid = isValid && value == validator.value
        }
    })
    return isValid
} 



module.exports = {
    valid,
    VALIDATOR_REQUIRED,
    VALIDATOR_MAX_LENGTH,
    VALIDATOR_MIN_LENGTH,
    VALIDATOR_EMAIL,
    VALIDATOR_SAME_AS
}