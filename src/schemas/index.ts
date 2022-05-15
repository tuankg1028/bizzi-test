import { gql } from 'apollo-server-express'

const schema = gql`
  type Query {
    post(
      id: Int
    ): Post
    posts(
      filter: FilterInput
      search: SearchInput
      pagination: Pagination
    ): [Post]

    categories: [Category]
    category(
      id: Int
    ): Category

    users(id: Int): [User]
  }
  
  type Mutation {
    signup(email: String!, password: String!, name: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    createPost(title: String!, content: String!): Post!
    updatePost(id: Int!, title: String!, content: String!): Post!
    deletePost(id: Int!): Post!
  }

  type Post { 
    id: Int!
    title: String!
    content: String
    createdAt: String!
    updatedAt: String!
    authorId: Int!
    author: User
    categoryId: Int
    category: Category
  }

  type Category { 
    id: Int!
    name: String!
  }

  type User { 
    id: Int!
    email: String!
    name: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input SearchInput {
    searchBy: SearchBy!
    value: String!
  }

  input FilterInput {
    authorId: [Int!]
  }

  input Pagination {
    perPage: Int!
    page: Int!
  }

  enum SearchBy {
    title
    content
  }
`
export default schema