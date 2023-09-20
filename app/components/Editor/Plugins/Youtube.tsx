import { TbBrandYoutubeFilled } from 'react-icons/tb'

const YoutubePlugin = (props: any) => {

  const handleClick = () => {
    props.editor.insertText('\n<Youtube id=""/>')
  }

  return (
    <div
      onClick={handleClick}
      className="flex items-center px-1 cursor-pointer text-xl hover:text-[#212121]"
      title="Youtube"
    >
      <TbBrandYoutubeFilled />
    </div>
  )
}

YoutubePlugin.align = 'left'
YoutubePlugin.pluginName = 'Youtube'

export default YoutubePlugin
