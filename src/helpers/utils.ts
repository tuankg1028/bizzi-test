import * as jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

import { PAGINATION } from './constant';
const { APP_SECRET } = process.env
export interface Context {
  prisma: PrismaClient
  req: any,
  loaders: any,
}
export interface Search {
  searchBy: string
  value: string
}
export interface Filter {
  [key: string]: [string]
}
export interface Pagination {
  perPage: number,
  page: number
}
export interface PostQueryInput {
  search: Search,
  filter: Filter,
  pagination: Pagination
}
export function getUserId(ctx: Context): number {
  console.log(ctx.req)
  const Authorization = ctx.req.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, APP_SECRET as string) as { userId: number }
    return userId
  } 

  throw new AuthError()
}

export class AuthError extends Error {
  constructor() {
    super('Not authorized')
  }
}

/**
 * Build data get post
 *
 * @param {Object} args
 */
export function buildGetPost(args: PostQueryInput) {
  const {
    search,
    filter,
    pagination
  } = args

  const {
    perPage = PAGINATION.PER_PAGE,
    page = PAGINATION.PAGE
  } = pagination || {}
  
  return {
    skip: page ? (page - 1) * perPage : 0,
    take: perPage,
    where: {
      ...(search && {
        [search.searchBy]: {
          contains: search.value
        }
      }),
      ...(filter && filterSearch(filter))
    }
  }
}

/**
 * Get query filter
 *
 * @param {Object} filter
 */
function filterSearch(filter: Filter) {
  let query: any = {}
  const keys = Object.keys(filter)

  keys.forEach(key => {
    const value = filter[key]
    if (!value) return
    
    if (key === 'authorId') {
      query[key] = {
        in: value
      }
    }
  })

  return query
}