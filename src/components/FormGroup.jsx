import React from "react";

function FormGroup({ label, type, placeholder, classes, name, onChange, value }) {
  return (
    <div className={classes}>
      {label && <label className="form-label">{label}</label>}
      <input
        className="form-control"
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange} 
        value={value} 
        min = "0"
      />
    </div>
  );
}

export default FormGroup;

