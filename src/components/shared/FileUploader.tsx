import React, { useCallback, useState } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone'

type FileUploaderProps = {
    fieldChange: (files: File[]) => void;
};

const FileUploader = ({ fieldChange }: FileUploaderProps) => {

    const [file, setFile] = useState<FileWithPath[]>([])
    const [fileUrl, setFileUrl] = useState('')
    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        setFile(acceptedFiles)
        fieldChange(acceptedFiles);
        setFileUrl(URL.createObjectURL(acceptedFiles[0]))

    }, [file])
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.svg']
        }
    })

    return (
        <div {...getRootProps()} className='flex flex-center flex-col rounded-xl cursor-pointer bg-gray-200 items-center'>
            <input {...getInputProps()} className='cursor-pointer' />
            {
                fileUrl ? (
                    <>
                        <div className='flex flex-1 justify-center w-full p-5 lg:p-10'>
                            <img
                                src={fileUrl}
                                alt="uploaded-image"
                                className='h-auto lg:h-[480px] w-auto rounded-[24px] object-cover object-top'
                            />
                        </div>
                        <p className='text-center text-[14px] font-normal leading-[140%] w-full p-4 border-t'>Click or drag photo to replace</p>
                    </>
                ) : (
                    <div className='flex flex-col items-center justify-center h-72 p-7'>
                        <img
                            src="/icons/file-upload.svg"
                            width={96}
                            height={77}
                            alt="file-upload"
                            className=''
                        />
                        <h3 className='text-center mb-2 mt-6'>Drag Photo here</h3>
                        <p className='text-sm text-center'>SVG, PNG, JPG</p>
                        <button
                            type='button'
                            className='bg-indigo-800 text-white font-semibold py-2 px-4 m-4 rounded-lg'>Select from the Device
                        </button>
                    </div>
                )


            }
        </div>
    )
}

export default FileUploader