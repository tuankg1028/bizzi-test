import { ApolloServer } from 'apollo-server-lambda'

import resolvers from './resolvers'
import typeDefs from './schemas'
import { createContext } from './context'

const server = new ApolloServer({ typeDefs, resolvers, context: createContext, csrfPrevention: true });
export const handler = server.createHandler();