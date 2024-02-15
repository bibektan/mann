import * as React from "react";

const CameraIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <path fill="#616770" d="M21 17a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z" />
    <path
      fill="#616770"
      d="M4 8a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4h24a4 4 0 0 0 4-4V12a4 4 0 0 0-4-4h-2.343a4 4 0 0 1-2.829-1.172l-1.656-1.656A4 4 0 0 0 18.343 4h-4.686a4 4 0 0 0-2.829 1.172L9.172 6.828A4 4 0 0 1 6.343 8H4Zm1 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm18 5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
    />
  </svg>
);

const CameraIconBlue = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <path fill="#1A77F2" d="M21 17a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z" />
    <path
      fill="#1A77F2"
      d="M4 8a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4h24a4 4 0 0 0 4-4V12a4 4 0 0 0-4-4h-2.343a4 4 0 0 1-2.829-1.172l-1.656-1.656A4 4 0 0 0 18.343 4h-4.686a4 4 0 0 0-2.829 1.172L9.172 6.828A4 4 0 0 1 6.343 8H4Zm1 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm18 5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
    />
  </svg>
);

const MediaIc = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <path fill="#46BD62" d="M9.003 18a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path
        fill="#616770"
        d="M28.003 26a4 4 0 0 1-4 4h-20a4 4 0 0 1-4-4V10A4 4 0 0 1 4 6a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v16a4 4 0 0 1-3.997 4ZM28 4H8a2 2 0 0 0-2 2h18.003a4 4 0 0 1 4 4v14A2 2 0 0 0 30 22V6a2 2 0 0 0-2-2ZM4.003 8a2 2 0 0 0-2 2v16l5.293-4.707a1 1 0 0 1 1.262-.125l5.318 3.545 7.42-7.42a1 1 0 0 1 1.154-.187L26.003 21V10a2 2 0 0 0-2-2h-20Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h32v32H0z" />
      </clipPath>
    </defs>
  </svg>
);

const GpsIc = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <path fill="#fff" d="M0 0h32v32H0z" />
    <path
      fill="#F5533D"
      d="M16 32s12-11.373 12-20c0-6.627-5.373-12-12-12S4 5.373 4 12c0 8.627 12 20 12 20Zm0-14a6 6 0 1 1 0-12 6 6 0 0 1 0 12Z"
    />
  </svg>
);

const ThreeDots = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <path
      fill="#616770"
      d="M6 19a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm10 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm10 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"
    />
  </svg>
);

const UserIc = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <g fill="#000" clipPath="url(#a)">
      <path d="M22 12a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z" />
      <path
        fillRule="evenodd"
        d="M0 16a16 16 0 1 1 32 0 16 16 0 0 1-32 0ZM16 2A14 14 0 0 0 5.064 24.74C6.484 22.452 9.61 20 16 20s9.514 2.45 10.936 4.74A14 14 0 0 0 16 2Z"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h32v32H0z" />
      </clipPath>
    </defs>
  </svg>
);

export { CameraIcon, CameraIconBlue, MediaIc, GpsIc, ThreeDots, UserIc };
