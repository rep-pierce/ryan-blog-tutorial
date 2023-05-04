import { prisma } from "~/db.server"

const getPosts = async () => {
    return prisma.post.findMany()
}

const getPost = async (slug) => {
  return prisma.post.findUnique({ where: { slug } })
}

const createPost = async (post) => {
  return prisma.post.create({ data: post })
}

module.exports = {
    getPosts,
    getPost,
    createPost
}