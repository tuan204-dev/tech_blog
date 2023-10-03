import { Tooltip } from 'antd'
import Link from 'next/link'

interface SidebarItemProps extends ISidebarItem {
  isExpanded: boolean
}

const SidebarItem: React.FC<SidebarItemProps> = ({ href, icon, title, isExpanded }) => {
  const Icon = icon

  return (
    <Tooltip placement="right" title={!isExpanded && title}>
      <Link
        href={href}
        className="flex items-center h-12 w-full bg-transparent hover:bg-[#dcdee0] dark:hover:bg-[#2d323b] transition duration-[50ms]"
      >
        <span className={`text-2xl ${!isExpanded ? 'mx-auto' : 'px-2'}`}>
          <Icon />
        </span>
        {isExpanded && <p className="text-sm font-semibold">{title}</p>}
      </Link>
    </Tooltip>
  )
}

export default SidebarItem
