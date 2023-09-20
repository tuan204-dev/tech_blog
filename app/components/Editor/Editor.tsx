'use client'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import './Editor.scss'
import YoutubePlugin from './Plugins/Youtube'
import { MdOutlinePhotoSizeSelectActual, MdOutlineCloudUpload } from 'react-icons/md'
import Preview from './Plugins/Preview'
import { useContext, useEffect } from 'react'
import { ModalContext } from '@/app/contexts/ModalContext'
import { useTheme } from 'next-themes'

interface EditorProps {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  title: string
  setTitle: React.Dispatch<React.SetStateAction<string>>
  desc: string
  setDesc: React.Dispatch<React.SetStateAction<string>>
}

MdEditor.use(YoutubePlugin)
MdEditor.use(Preview)

const Editor: React.FC<EditorProps> = ({
  value,
  setValue,
  title,
  setTitle,
  desc,
  setDesc,
}) => {
  const { setMdValue, setPreviewTitle } = useContext(ModalContext)
  const { theme } = useTheme()

  useEffect(() => {
    setMdValue(value)
  }, [value, setMdValue])

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
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
                setPreviewTitle(e.target.value)
              }}
              className="w-full outline-none placeholder:text-4xl placeholder:text-slate-500 dark:placeholder:text-slate-200 text-4xl font-semibold appearance-none bg-white dark:bg-dark-base h-12 resize-none mb-7"
            />
            <textarea
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
              placeholder="Article description ..."
              className="w-full outline-none placeholder:text-2xl placeholder:text-slate-500 dark:placeholder:text-slate-200 text-2xl font-normal appearance-none bg-white dark:bg-dark-base h-12 resize-none"
            />
          </div>
          <div className="flex flex-col gap-3">
            <button className="w-fit px-3 py-2 flex items-center text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition rounded-3xl">
              <span className="text-2xl ">
                <MdOutlinePhotoSizeSelectActual />
              </span>
              <span className="hidden md:block ml-2">Add thumbnail</span>
            </button>
            <button className="w-fit px-3 py-2 flex items-center text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition rounded-3xl">
              <span className="text-2xl ">
                <MdOutlineCloudUpload />
              </span>
              <span className="hidden md:block ml-2">Upload image</span>
            </button>
          </div>
        </div>
        <MdEditor
          style={{ width: '100%', flex: '1' }}
          renderHTML={(text) => text}
          value={value}
          onChange={({ text }) => setValue(text)}
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
        />
      </div>
    </div>
  )
}

export default Editor
