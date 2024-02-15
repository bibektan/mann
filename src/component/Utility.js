import React, { useState } from "react";
import {
  CameraIconBlue,
  MediaIc,
  GpsIc,
  ThreeDots,
} from "../Public/Asset/Icons/CostumIcon";

function Utility({ imgState, imgSetState, setLatitude, setLongitude, imageFile, setImageFile, lati, longi }) {
  let [latitude, setlatitude] = useState(null);
  let [longitude, setlongitude] = useState(null);
  let [imageFiles, setImageFiles] = useState([]);
  let [images, setImages] = useState([]);

  function getgps() {
    navigator.geolocation.getCurrentPosition((post) => {
      setlatitude((p) => post.coords.latitude);
      setlongitude((p) => post.coords.longitude);

      // parent set
      setLatitude(post.coords.latitude)
      setLongitude(post.coords.longitude)
    });
  }
  // console.log(latitude + "," + longitude);
  const captureImg = () => {
    let input = document.querySelector("#captureImgInput");
    input.click();
  };

  const capturemnaishImg = () => {
    let input = document.querySelector("#mediaAccess");
    input.click();
  };

  const imageSelected = (event) => {
    let fileArray = event.target.files
    console.log('top')
    console.log(fileArray)

    let filesOnlyArr = []
    let urlOnlyArr = []

    Object.entries(fileArray).map(file => {
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
      <div className="cam-gps-access">
        <h3>Add To Your Sighting</h3>
        <list className="icons-list">
          {/* capture image */}

          <input
            onChange={imageSelected}
            id="captureImgInput"
            type="file"
            name="files"
            accept="image/*"
            capture="environment"
            multiple
            className="file-choose-btn"
          />

          <input
            onChange={imageSelected}
            id="mediaAccess"
            type="file"
            name="files"
            accept="image/*"
            multiple
            className="file-choose-btn"
          />

          <li onClick={captureImg}>
            <CameraIconBlue style={{cursor: 'pointer'}} />
          </li>
          <li onClick={capturemnaishImg}>
            <MediaIc style={{ cursor: 'pointer' }} />
          </li>
          {/* gps */}
          <li onClick={getgps}>
            <GpsIc style={{ cursor: 'pointer' }} />
          </li>
          <li>
            <ThreeDots style={{ cursor: 'pointer' }} />
          </li>
        </list>
      </div>
      <div className="gps-access">
        {/* <li onClick={getgps}>
          <GpsIc />
        </li> */}
        <h3>Location Address</h3>
          {
            lati !== 0 && longi !== 0
            ?
            <p className="location-p">{lati},{longi}</p>
            :
            ''
            
          }
      </div>
    </>
  );
}
export default Utility;
