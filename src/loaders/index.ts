import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const batchCategories = async (keys: [number]) => {
  const categories = await prisma.category.findMany()

  return keys.map(key =>
    categories.find((category: { id: number }) => category.id === key)
  )
}
