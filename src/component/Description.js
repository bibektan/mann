import React from "react";

export default function Description({ setDescription, deci }) {

  function descriptionChanged(e){
    console.log('from description')
    console.log(e.target.value)
    setDescription(e.target.value)
  }

  return (
    <>
      <div className="description">
        <textarea
          onChange={descriptionChanged}
          value={deci}
          rows="5"
          cols="43"
          className="description-box"
          placeholder="Description"
        />
      </div>
    </>
  );
}
