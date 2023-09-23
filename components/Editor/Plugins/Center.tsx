import { RxTextAlignCenter } from 'react-icons/rx'

const CenterPlugin = (props: any) => {
  const handleClick = () => {
    props.editor.insertText(`<center> </center>`)
  }

  return (
    <div
      onClick={handleClick}
      title="Center"
      className="flex items-center justify-center cursor-pointer text-xl hover:text-[#212121]"
    >
      <RxTextAlignCenter />
    </div>
  )
}

CenterPlugin.align = 'left'
CenterPlugin.pluginName = 'Center'

export default CenterPlugin
