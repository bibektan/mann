import React from "react";
import "../App.css";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";

// const center = { lat: 65.0112364, lng: 25.4999732 };

export default function Maped({lat, lng}) {

  let center = { lat: lat, lng: lng }

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  if (!isLoaded) {
    return <div className="loader"></div>;
  }

  return (
    <>
      <div className="map-box">
        <GoogleMap
          mapContainerStyle={{ height: "100%", width: "100%" }}
          zoom={13}
          center={center}
          options={{
            streetViewControl: false,
            scaleControl: true,
            mapTypeControl: true,
            panControl: true,
            rotateControl: true,
            fullscreenControl: false,
            styles: [
              {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }],
              },
            ],
          }}
        >
          <Marker position={center} />
        </GoogleMap>
      </div>
    </>
  );
}
