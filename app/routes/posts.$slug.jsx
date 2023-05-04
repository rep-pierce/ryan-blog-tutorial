import React from 'react'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getPost } from '../models/post.server'
import invariant from 'tiny-invariant'
import { marked } from 'marked'

export const loader = async ({ params }) => {
  invariant(params.slug, 'params.slug is required')

  const post = await getPost(params.slug)
  invariant(post, `Post not found: ${params.slug}`)

  const html = marked(post.markdown)
  return json({ html, post })
}

const PostSlug = () => {
  const { html, post } = useLoaderData()

  return (
    <main className='mx-auto max-w-4xl'>
      <h1 className='my-6 border-b-2 text-center text-3xl'>
        {post.title}
      </h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  )
}

export default PostSlug