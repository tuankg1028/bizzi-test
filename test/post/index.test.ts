import * as superagent from "superagent"
import { queryGetPost } from './query'

const request = superagent.agent();
var host = 'http://localhost:4000/dev/graphql'

describe('Posts', () => {
  it('Get post', async () => {
    await request
      .post(host + '/')
      .set('Accept', 'application/json')
      .send(queryGetPost({ postId: 1 }))
      .then((res) => {
        expect(res.status).toEqual(200)
        const post = res.body && res.body.data && res.body.data.post

        console.log(post)
        expect(post.id).toEqual(1)
        expect(post.title).toEqual('Join the Prisma Slack')
        expect(post.content).toEqual('https://slack.prisma.io')
        expect(post.author).toStrictEqual({ id: 1, email: 'alice@prisma.io', name: 'Alice' })
        expect(post.categoryId).toEqual(1)
        expect(post.category).toEqual({ id: 1, name: 'Category 1' })
      })
  })
})
