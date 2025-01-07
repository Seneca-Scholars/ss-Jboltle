import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


const deleteAllUsers = async ()   =>  {

    const user = await prisma.user.deleteMany(
    )
    

    
    }
async function main() {
  const user = await prisma.user.findMany(); const posts = await prisma.post.findMany()

  console.log(user , posts)
  
  deleteAllUsers()
  
  console.log(user , posts)
  
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