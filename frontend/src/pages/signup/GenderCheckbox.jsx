

// eslint-disable-next-line react/prop-types
const GenderCheckbox = ({handleCheckboxChange,selectedGender}) => {
  return (
    <div className="flex">
        <div className="form-control">
            <label className="label gap-2 cursor-pointer">
                <span className="label-text">Male</span>
              <input type="checkbox" className="checkbox border-slate-900"
                checked={selectedGender === "male"}
                onChange={()=>{ handleCheckboxChange("male")}}
              />
            </label>
        </div>
        <div>
            <label className="label gap-2 cursor-pointer">
                <span className="label-text">Female</span>
                <input type="checkbox" className="checkbox border-slate-900"
                checked={selectedGender==="female"}
                  onChange={()=>{handleCheckboxChange("female")}}
                />
            </label>
        </div>
    </div>
  )
}

export default GenderCheckbox