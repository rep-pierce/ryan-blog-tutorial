import React from 'react'
import { Form, useNavigation } from '@remix-run/react'
import { redirect } from '@remix-run/node'
import { createPost } from '../models/post.server'

const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`;

export const action = async ({ request }) => {
    const formData = await request.formData()
    
    const title = formData.get("title")
    const slug = formData.get("slug")
    const markdown = formData.get("markdown")
    await new Promise((res) => setTimeout(res, 1000))

    await createPost({ title, slug, markdown})

    return redirect("/posts/admin")
}

function NewPost() {
    const navigation = useNavigation()
    const isCreating = Boolean(
        navigation.state === "submitting"
    )
    return (
      <Form method='post'>
          <p>
              <label>
                  Post Title:{' '}
                  <input required type='text' name='title' className={inputClassName} />
              </label>
          </p>
          <p>
              <label>
                  Post Slug:{' '}
                  <input required type='text' name='slug' className={inputClassName} />
              </label>
          </p>
          <p>
              <label htmlFor="markdown">Markdown</label>
              <br />
              <textarea required id='markdown' rows={20} name='markdown' className={`${inputClassName} font-mono`} />
          </p>
          <p className='text-right'>
              <button type='submit' className='rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300' disabled={isCreating}>{isCreating ? "Creating..." : "Create Post"}</button>
          </p>
      </Form>
    )
}

export default NewPost