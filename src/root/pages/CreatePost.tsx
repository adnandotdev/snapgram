import FileUploader from '@/components/shared/FileUploader'
import { useUserContext } from '@/context/AuthContext';
import { createPost } from '@/lib/appwrite/api';
import { INewPost } from '@/types';
import { Models } from 'appwrite';
import React, { useState } from 'react'

const CreatePost = () => {
  const { user } = useUserContext();



  const [caption, setCaption] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File[]>([]);
  const [location, setLocation] = useState('');
  const [tags, setTags] = useState('');
  const handleFieldChange = (selectedFile: File[]) => {
    // Handle the file change event here
    setUploadedFile(selectedFile); // For example, storing the first file in state
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    const postData: INewPost = {
      userId: user.id,
      caption: caption,
      file: uploadedFile, // Add the 'file' property with the value of 'uploadedFile' or an empty array if it's undefined
      location: location,
      tags: tags
    }
    e.preventDefault();
    const newPost = await createPost(postData)
    
    if (!newPost) {
      console.log("error")
    }
  }
  return (
    <div className='flex flex-1 overflow-y-auto'>
      <div className='flex flex-col w-full  gap-10 py-10 px-5 md:px-8 lg:p-10 custom-scroolbar'>
        <div className='flex max-w-5xl flex-start gap-3'>
          <img
            src="/icons/add-post.svg"
            width={36}
            height={36}
            alt="add"
          />
          <h2 className='font-bold md:font-semibold text-left text-2xl'>Create Post</h2>
        </div>

        <div>
          <form onSubmit={onSubmit}>
            <div className='py-2' >
              <label className='text-lg block my-1 ' htmlFor="caption">
                Caption
              </label>
              <textarea
                id='caption'
                className='text-xm bg-gray-200 border-2 border-black rounded-xl h-28 w-full py-2 px-4 focus:outline-none focus:border-blue-500'
                onChange={(e) => setCaption(e.target.value)} />
            </div>


            <div className='py-2' >
              <label className='text-lg block my-1 ' htmlFor="photo">
                Add Photos
              </label>
              <FileUploader
                fieldChange={handleFieldChange}
                 />
            </div>

            <div className='py-2' >
              <label className='text-lg block my-1 ' htmlFor="location">
                Add Location
              </label>
              <input
                id='location'
                className='text-xm bg-gray-200 border-2 border-black rounded-xl w-full py-2 px-4 focus:outline-none focus:border-blue-500'
                onChange={(e) => setLocation(e.target.value)} />
            </div>

            <div className='py-2' >
              <label className='text-lg block my-1 ' htmlFor="tags">
                Add Tags (separated by comma ' , ')
              </label>
              <input
                id='tags'
                placeholder='Art, Design, Fashion, etc...'
                className='text-xm bg-gray-200 border-2 border-black rounded-xl w-full py-2 px-4 focus:outline-none focus:border-blue-500'
                onChange={(e) => setTags(e.target.value)} />
            </div>

            <div className='flex justify-end my-10'>
              <button
                type='button'
                className='bg-indigo-800 text-white font-semibold py-2 px-4 mx-4 rounded-lg'>Cancel
              </button>
              <button
                type='submit'
                className='bg-indigo-800 text-white font-semibold py-2 px-4 mx-4 rounded-lg'>Submit
              </button>
            </div>



          </form>
        </div>

      </div>

    </div>
  )
}

export default CreatePost