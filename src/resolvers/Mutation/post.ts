import { getUserId, Context } from '../../helpers/utils'

export const post = {
  async createPost(parent: any, { title, content }: any, ctx: Context) {
    const userId = getUserId(ctx);
    return ctx.prisma.post.create({
      data: {
        title,
        content,
        authorId: userId
      }
    })
  },

  async updatePost(parent: any, { id, title, content }: any, ctx: Context) {
    const userId = getUserId(ctx)
    const postExists = await ctx.prisma.post.findFirst({
      where: {
        id,
        authorId: userId,
      }
    })
    if (!postExists) {
      throw new Error(`Post not found or you're not the author`)
    }

    return ctx.prisma.post.update({
      where: { id },
      data: { title, content },
    })
  },

  async deletePost(parent: any, { id }: any, ctx: Context) {
    const userId = getUserId(ctx)
    const postExists = await ctx.prisma.post.findFirst({
      where: {
        id,
        author: { id: userId },
      }
    })
    if (!postExists) {
      throw new Error(`Post not found or you're not the author`)
    }

    return ctx.prisma.post.delete({
      where: { id }
    })
  },
}
