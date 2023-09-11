import prisma from '../libs/prismadb'

import randomstring from 'randomstring'

async function generateUniqueUsername() {
  let username
  let isUsernameUnique = false

  // Loop until a unique username is generated
  while (!isUsernameUnique) {
    // Generate a random username (you can customize this logic)
    username = randomstring.generate(16)

    // Check if the username already exists in the database
    const existingUser = await prisma.user.findUnique({
      where: { username },
    })

    // If the username doesn't exist, mark it as unique
    if (!existingUser) {
      isUsernameUnique = true
    }
  }

  return username
}

module.exports = generateUniqueUsername
