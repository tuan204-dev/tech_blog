import React from 'react'

interface InputProps {
  label: string
  type: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
}

const Input: React.FC<InputProps> = ({
  label,
  onChange,
  placeholder,
  type = 'text',
  value,
  disabled = false,
}) => {
  return (
    <div>
      {label && <span>{label}</span>}
      <input
        disabled={disabled}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="
          w-full
          p-4 
          text-lg 
          bg-white 
          dark:bg-neutral-800
          border-2
          border-[#DCDCE4]
          dark:border-dark-border
          rounded-md
          outline-none
          text-[#666687]
          dark:text-white
          focus:border-2
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
        "
      />
    </div>
  )
}

export default Input
