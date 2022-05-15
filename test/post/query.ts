export const queryGetPost = (variables: any) => ({
  query: `
    query GetPost($postId: Int) {
      post(id: $postId) {
        id
        title
        content
        author {
          id
          email
          name
        }
        categoryId
        category {
          id
          name
        }
      }
    }
  `,
  variables
})