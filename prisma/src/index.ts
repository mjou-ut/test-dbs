import { prisma } from './config'
import { getAllUsers, getUserById } from './users'
import { embedsDomain } from './embeds'

async function main() {
  console.log('Hello there, PRISMA!')
  const users = await getAllUsers()
  console.log('Users:', users)

  const user = await getUserById(1)

  console.log('User:', user)
  console.log('User Type:', typeof user)

  const anotherUser = await getUserById(2)
  console.log('Another User:', anotherUser)

  // Embeds
  //
  //const newEvidence = await embedsDomain.new('sourceHost', 'sourcePath', 'accountId', 'workspaceId')
  const evidence = await embedsDomain.getById('3eae7fd7-9681-4e1e-8f4f-d42786d6f19d')
  console.log('Evidence:', evidence)
  if (!evidence) {
    throw new Error('Evidence not found')
  }
  const userId = '39f7e860-b3cf-45ce-a3bd-89b239932fc5'
  const report1 = '5d54bdb4-ea3d-4ae3-8f9c-c82c890c1939'
  const report2 = '7377af5a-14b2-403c-af4e-1725046cb3bd'
  // const embed1 = await embedsDomain.newEmbed(evidence.id, report1, userId)
  // const embed2 = await embedsDomain.newEmbed(evidence.id, report2, userId)
  const newEvidence = await embedsDomain.getById('3eae7fd7-9681-4e1e-8f4f-d42786d6f19d')
  console.log('Evidence', newEvidence)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
