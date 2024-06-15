export function Input ({ label, placeholder, name, value, type, onChange }) {
  return (
    <div>
      <div className='text-sm font-medium text-left py-2'>{label}</div>
      <input
        name={name}
        value={value}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        className='w-full px-2 py-1 border-none'
      />
    </div>
  )
}
