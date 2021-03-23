import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthController {
  public async register ({request, response}:HttpContextContract) {
    const regSchema = schema.create({
      email: schema.string({},[
        rules.email(),
        rules.unique({table: 'users', column: 'email'})
      ]),
      password: schema.string({}, [
        rules.confirmed()
      ])
    })

    const validations = await request.validate({schema: regSchema})

    const user = await User.create(validations)

    return response.created(user)
  }

  public async login ({auth, request}:HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    const token = await auth.use('api').attempt(email, password)

    return token.toJSON()
  }
}
