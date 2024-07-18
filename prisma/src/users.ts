import { prisma } from './config'

// const user = await prisma.user.create({
//   data: {
//     name: 'Alice',
//     email: 'alice@prisma.io',
//   },
// })
// console.log(user)
//
//
export const getAllUsers = async () => {
  const allUsers = await prisma.user.findMany()
  console.log('[LOG] All users:', allUsers)

  return allUsers
}

export const getUserById = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  })
  console.log('[LOG] User:', user)

  return user
}
