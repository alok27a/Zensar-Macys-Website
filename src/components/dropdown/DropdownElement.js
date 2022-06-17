import React from 'react'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

function DropdownElement() {
  const options = [
    'Low', 'Medium', 'High'
  ];
  const defaultOption = options[0];

  return (
    <>
      {/* onChange to be added */}
      <Dropdown options={options} value={defaultOption} placeholder="Select an option" />;
    </>
  )
}

export default DropdownElement