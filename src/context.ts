import { PrismaClient } from '@prisma/client'
import DataLoader from "dataloader"
import { batchCategories } from './loaders'
const prisma = new PrismaClient()

export interface Context {
  prisma: PrismaClient,
  req: any,
  loaders: any
}

export function createContext(req: any) {
  return {
    ...req,
    prisma,
    loaders: {
      category: new DataLoader((keys) => (
        batchCategories(keys as [number])
      )),
    }
  }
}