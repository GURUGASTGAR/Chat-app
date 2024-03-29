

// eslint-disable-next-line react/prop-types
const InputBox = ({label,placeholder,onChange,type}) => {
  return (
    <div>
     
        <label className="label p-2">
            <span className="text-base label-text">{label}</span>
        </label>
        <input  onChange={onChange} type={type} placeholder={placeholder} className="w-full input input-bordered h-10" />
    </div>
  )
}

export default InputBox;