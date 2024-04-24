const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name : {
        type : String
    },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
  }
})

// static signup method
userSchema.statics.signup = async function(name, email, password) {

  // validation
  if (!email || !password) {
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email not valid')
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough')
  }

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ name, email, password: hash })
  //THIS WHERE ITS BEEN CREATED

  return user
}
// static login method
userSchema.statics.login = async function(email, password) {
    console.log(1)

  if (!email || !password) {
    throw Error('All fields must be filled')
  }
  console.log(2)

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Incorrect email')
  }
  console.log(3)

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }
  console.log(4)

  return user
}

module.exports = mongoose.model('User', userSchema)