import React, { useEffect, useState } from "react";
import { CameraIcon } from "../Public/Asset/Icons/CostumIcon";

export default function UploadPhoto({ imgState, imgSetState, imageFile, setImageFile }) {
  // let [images, setImages] = useState([]);

  const captureImg = () => {
    console.log("first");
    let input = document.querySelector("#Camera-Acces");
    input.click();
  };

  const imageSelected = (event) => {
    let fileArray = event.target.files
    console.log('top')
    console.log(fileArray)

    let filesOnlyArr = []
    let urlOnlyArr = []

    Object.entries(fileArray).map(file=>{
      console.log(file[1])

      let img = file[1];
      if (img) {
        filesOnlyArr.push(img)
        //set image file
        // setImageFile([...imageFile, img])
  
        const imagUrl = URL.createObjectURL(img);
        urlOnlyArr.push(imagUrl)

        // console.log('url of img')
        // console.log(imagUrl)
        // const newStateImage = [...imgState, imagUrl];
        // imgSetState(newStateImage);
        // console.log(setImages);
      }

    })

    console.log('out of loop')
    // console.log(filesOnlyArr)
    // console.log(urlOnlyArr)

    setImageFile([...imageFile, ...filesOnlyArr])
    imgSetState([...imgState, ...urlOnlyArr])
  };

  return (
    <>
      <div className="Photo-box-outline" style={{ cursor: 'pointer' }}>
        <input
          // enctype='multipart/form-data'
          onChange={imageSelected}
          id="Camera-Acces"
          type="file"
          name="files[]"
          accept="image/*"
          capture="environment"
          multiple
          className="file-choose-btn"
        />

        <div onClick={captureImg} className="Photo-box-inner">
          <div className="container-inner">
            <div className="eclipse">
              <CameraIcon />
            </div>
            <h3>Add Photos</h3>
          </div>
        </div>
        <list className="photos-grid">
          {imgState.length > 0
            ? imgState.map((v, key) => (
                <li key={key}>
                  <img src={v} alt="" />
                </li>
              ))
            : ""}
        </list>
      </div>
    </>
  );
}
