const HorizontalRulePlugin = (props: any) => {
  const handleClick = () => {
    props.editor.insertText(`***`)
    console.log(props.editor)
  }

  return (
    <div
      onClick={handleClick}
      title="Horizontal rule"
      className="flex items-center justify-center cursor-pointer"
    >
      <div className="w-4 h-[2px] bg-[#757575] hover:bg-[#212121] rounded-full"></div>
    </div>
  )
}

HorizontalRulePlugin.align = 'left'
HorizontalRulePlugin.pluginName = 'HorizontalRule'

export default HorizontalRulePlugin
