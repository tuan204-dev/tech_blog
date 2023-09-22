'use client'
import handleUploadImage from '@/utils/handleUploadImage'
import { useTheme } from 'next-themes'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { MdOutlineCloudUpload, MdOutlinePhotoSizeSelectActual } from 'react-icons/md'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import './Editor.scss'
import Preview from './Plugins/Preview'
import YoutubePlugin from './Plugins/Youtube'

interface EditorProps {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  title: string
  setTitle: React.Dispatch<React.SetStateAction<string>>
  desc: string
  setDesc: React.Dispatch<React.SetStateAction<string>>
  setThumbUrl: React.Dispatch<React.SetStateAction<string>>
}

const plugins = [
  'header',
  'font-bold',
  'font-italic',
  'font-underline',
  'font-strikethrough',
  'divider',
  'list-unordered',
  'list-ordered',
  'divider',
  'block-wrap',
  'block-quote',
  'block-code-inline',
  'block-code-block',
  'divider',
  // 'table',
  // 'divider',
  'link',
  'image',
  'Youtube',
  'divider',
  'clear',
  'Preview',
  'full-screen',
]

MdEditor.use(YoutubePlugin)
MdEditor.use(Preview)

const Editor: React.FC<EditorProps> = ({
  value,
  setValue,
  title,
  setTitle,
  desc,
  setDesc,
  setThumbUrl,
}) => {
  const { theme } = useTheme()

  const [thumbFile, setThumbFile] = useState<File | null>(null)
  const [imgFile, setImgFile] = useState<File | null>(null)

  const thumbInput = useRef<HTMLInputElement>(null)
  const imgInput = useRef<HTMLInputElement>(null)



  useEffect(() => {
    ;(async () => {
      try {
        if (!imgFile) return
        document.body.style.cursor = 'progress'
        const url = await handleUploadImage(imgFile as File)
        navigator.clipboard.writeText(url as string)
        document.body.style.cursor = 'default'
        toast.success('Link image copied to clipboard!')
      } catch (error) {
        toast.error('Error uploading image!')
        document.body.style.cursor = 'default'
      }
    })()
  }, [imgFile])

  useEffect(() => {
    ;(async () => {
      try {
        if (!thumbFile) return
        document.body.style.cursor = 'progress'
        const thumbUrl = await handleUploadImage(thumbFile as File)
        document.body.style.cursor = 'default'
        setThumbUrl(thumbUrl as string)
        toast.success('Thumbnail uploaded successfully!')
      } catch (error) {
        toast.error('Error uploading thumbnail!')
        document.body.style.cursor = 'default'
      }
    })()
  }, [thumbFile, setThumbUrl])

  return (
    <div
      className={`flex justify-center h-[max(calc(100vh-70px),1000px)] bg-white dark:bg-dark-base ${
        theme === 'dark' ? 'dark-editor' : ''
      }`}
    >
      <div className="px-5 w-full relative max-w-[600px] md:max-w-[760px] lg:max-w-[1000px] xl:max-w-[1200px] flex flex-col">
        <div className="flex justify-between pt-10 px-6">
          <div className="sm:top-[40px] flex flex-col pb-3 flex-1">
            <textarea
              placeholder="Article title ..."
              defaultValue={title}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full outline-none placeholder:text-4xl placeholder:text-slate-500 dark:placeholder:text-slate-200 text-4xl font-semibold appearance-none bg-white dark:bg-dark-base h-12 resize-none mb-7"
            />
            <textarea
              onChange={(e) => setDesc(e.target.value)}
              defaultValue={desc}
              value={desc}
              placeholder="Article description ..."
              className="w-full outline-none placeholder:text-2xl placeholder:text-slate-500 dark:placeholder:text-slate-200 text-2xl font-normal appearance-none bg-white dark:bg-dark-base h-12 resize-none"
            />
          </div>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => thumbInput.current?.click()}
              className="w-fit px-3 py-2 flex items-center text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition rounded-3xl"
            >
              <span className="text-2xl ">
                <MdOutlinePhotoSizeSelectActual />
              </span>
              <span className="hidden md:block ml-2">Add thumbnail</span>
            </button>
            <button
              onClick={() => imgInput.current?.click()}
              className="w-fit px-3 py-2 flex items-center text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition rounded-3xl"
            >
              <span className="text-2xl ">
                <MdOutlineCloudUpload />
              </span>
              <span className="hidden md:block ml-2">Upload image</span>
            </button>

            <input
              type="file"
              id="thumbnailImage"
              accept="image/png, image/jpeg"
              ref={thumbInput}
              className="hidden"
              onChange={(e) => setThumbFile(e.target.files?.[0] || null)}
            />
            <input
              type="file"
              accept="image/png, image/jpeg"
              id="image"
              ref={imgInput}
              className="hidden"
              onChange={(e) => setImgFile(e.target.files?.[0] || null)}
            />
          </div>
        </div>
        <MdEditor
          style={{ width: '100%', flex: '1' }}
          renderHTML={(text) => text}
          value={value}
          onChange={({ text }) => setValue(text)}
          plugins={plugins}
          canView={{
            menu: true,
            md: true,
            html: false,
            both: false,
            fullScreen: true,
            hideMenu: true,
          }}
          view={{
            menu: true,
            md: true,
            html: false,
          }}
          placeholder='Write your article here ...'
        />
      </div>
    </div>
  )
}

export default Editor
