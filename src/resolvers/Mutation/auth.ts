import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { Context } from '../../helpers/utils'

const { APP_SECRET } = process.env
export const auth = {
  async signup(parent: any, args: any, ctx: Context) {
    const { 
      email,
      name,
    } = args
    const password = await bcrypt.hash(args.password, 10)
    const user = await ctx.prisma.user.create({ 
      data: {
        email,
        name,
        password
      } 
    })

    return {
      token: jwt.sign({ userId: user.id }, APP_SECRET as string),
      user,
    }
  },

  async login(parent: any, { email, password }: any, ctx: Context) {
    const user = await ctx.prisma.user.findFirst({
      where: { email }
    })
    if (!user) {
      throw new Error(`No such user found for email: ${email}`)
    }

    const valid = await bcrypt.compare(password, user.password as string)
    if (!valid) {
      throw new Error('Invalid password')
    }

    return {
      token: jwt.sign({ userId: user.id }, APP_SECRET as string),
      user,
    }
  },
}
