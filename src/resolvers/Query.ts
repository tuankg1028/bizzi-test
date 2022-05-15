import { getUserId, Context, buildGetPost, PostQueryInput } from '../helpers/utils'

export const Query = {
  async categories(parent: any, args: any, ctx: Context) {
    const result = await ctx.prisma.category.findMany()
    return result
  },
  async category(parent: any, { id }: any, ctx: Context) {
    const result = await ctx.loaders.category.load(id)
    return result
  },

  async posts(parent: any, args: PostQueryInput, ctx: Context) {
    const query = buildGetPost(args)
    const result = await ctx.prisma.post.findMany(query)
    return result
  },
  async post(parent: any, { id }: any, ctx: Context) {
    const result = await ctx.prisma.post.findFirst({
      where: {
        id
      },
      include: {
        author: true,
        category: true,
      },
    })
    return result
  },

  async users(parent: any, args: any, ctx: Context) {
    const result = await ctx.prisma.user.findMany()
    return result
  },
}
