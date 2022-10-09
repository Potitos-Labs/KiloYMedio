import React from "react";
import PropTypes from "prop-types";
import SvgWrapper from "./SvgWrapper";

const GlutenIcon = ({
  innerColor,
  outerColor,
  ...props
}: {
  innerColor: string;
  outerColor: string;
}) => {
  const style = {
    fill: innerColor,
  };

  return (
    <SvgWrapper {...props}>
      <path
        d="M0 107.75c0 59.59 48.17 108.11 107.74 108.11 59.93 0 108.09-48.52 108.09-108.11C215.83 47.81 167.67 0 107.74 0 48.17 0 0 47.81 0 107.75z"
        fill={outerColor}
      />
      <path
        style={style}
        d="M57.08 165.55s14.63 19.98 40.31-30.32c0 0-39.96 15.69-40.31 30.32z"
      />
      <path
        style={style}
        d="M84.91 145.21s11.77-12.84 32.82-25.68C97.75 133.44 87.04 147 87.04 147l-2.13-1.79zM62.79 156.63s-23.9 5.72-10.7-49.23c0 0 19.97 37.81 10.7 49.23z"
      />
      <path
        style={style}
        d="M54.93 123.1s-.71-17.49-8.55-40.68c6.42 23.55 5.7 40.68 5.7 40.68h2.85zM67.78 134.51s13.21 17.84 36.39-27.11c0 0-35.68 13.55-36.39 27.11z"
      />
      <path
        style={style}
        d="M93.11 116.31s10.7-11.42 29.61-22.83c-17.84 12.49-27.47 24.62-27.47 24.62l-2.14-1.79zM73.84 128.8s-21.76 4.64-9.27-44.59c.01 0 17.84 34.25 9.27 44.59z"
      />
      <path
        style={style}
        d="M67.08 98.47s-.37-15.71-7.14-36.75c5.35 21.05 4.64 36.75 4.64 36.75h2.5zM79.2 107.4s11.06 16.41 33.17-22.84c0 0-32.1 10.71-33.17 22.84z"
      />
      <path
        style={style}
        d="M102.39 92.05s9.98-9.98 27.11-19.26c-16.42 10.34-25.33 20.69-25.33 20.69l-1.78-1.43zM84.19 100.26s-19.62 3.57-6.78-39.6c.01 0 14.63 31.04 6.78 39.6z"
      />
      <path
        style={style}
        d="M79.2 73.14s.36-13.91-4.99-32.82c3.91 19.27 2.49 32.82 2.49 32.82h2.5zM93.82 81.35s9.99 14.27 28.19-20.69c0 0-27.83 10.34-28.19 20.69z"
      />
      <path
        style={style}
        d="M113.45 67.43s8.2-8.92 23.18-17.49c-14.26 9.28-21.76 18.91-21.76 18.91l-1.42-1.42zM97.75 75.28s-16.76 3.56-6.78-34.62c0 .01 13.55 26.41 6.78 34.62z"
      />
      <path
        style={style}
        d="M92.76 51.38s-.36-12.13-5.35-28.54c3.92 16.77 3.2 28.9 3.2 28.9l2.15-.36zM108.45 58.51S116.29 71 134.13 42.1c0 0-24.61 7.49-25.68 16.41z"
      />
      <path
        style={style}
        d="M126.29 47.45s7.5-7.14 21.05-13.56c-12.85 7.5-19.98 15-19.98 15l-1.07-1.44zM112.37 53.52s-14.62 1.79-3.92-30.32c0 0 9.99 23.54 3.92 30.32z"
      />
      <path
        style={style}
        d="M109.52 32.82s.36-10.34-2.85-24.98c2.13 14.64 1.08 24.98 1.08 24.98h1.77zM124.51 36.03l2.85-1.78c-43.79 54-64.79 116.2-74.22 166.7-1.86-1.1-3.69-2.25-5.48-3.46C58.4 146.98 80.69 85.98 124.51 36.03zM86.69 193.02s5 16.42 32.83-10.7c-.01 0-29.26 1.43-32.83 10.7z"
      />
      <path
        style={style}
        d="M109.52 186.25s10.35-5.71 27.11-9.28c-16.42 4.65-26.39 11.07-26.39 11.07l-.72-1.79zM92.4 188.74s-17.13-1.79 4.28-34.62c0 .01 4.28 29.27-4.28 34.62zM106.31 170.91s1.43 15.34 31.03-3.57c.01 0-26.39-4.29-31.03 3.57z"
      />
      <path
        style={style}
        d="M127.71 168.77s10.35-3.22 25.33-3.22c-14.98 1.07-24.97 5-24.97 5l-.36-1.78zM111.66 169.47s-14.62-4.63 9.99-29.61c0 .01-1.43 26.41-9.99 29.61z"
      />
      <path
        style={style}
        d="M118.09 149.14s5.35-9.64 8.56-24.62c-4.28 14.63-10 23.55-10 23.55l1.44 1.07zM124.15 156.99s-.37 13.56 27.82.36c0 0-22.47-6.79-27.82-.36z"
      />
      <path
        style={style}
        d="M143.42 157.7s9.28-1.79 22.83 0c-13.55-.72-22.48 1.43-22.48 1.43l-.35-1.43zM129.85 154.85s-12.48-5.7 12.13-24.98c0 0-4.28 23.2-12.13 24.98z"
      />
      <path
        style={style}
        d="M137.7 137.72s5.72-7.84 10.35-20.33c-5.34 12.13-11.41 19.27-11.41 19.27l1.06 1.06zM142.34 146.28s-1.43 11.77 24.25 2.86c.01.01-18.89-7.85-24.25-2.86z"
      />
      <path
        style={style}
        d="M159.11 148.42s8.2-.35 19.98 2.5c-11.77-2.15-19.98-1.07-19.98-1.07v-1.43zM147.34 144.86s-9.99-6.06 13.2-20.33c0-.01-6.06 19.62-13.2 20.33z"
      />
      <path
        style={style}
        d="M156.26 130.58s5.7-6.06 11.06-16.76c-6.07 10.35-12.13 16.05-12.13 16.05l1.07.71zM164.11 138.44s-1.43 7.14 14.98 2.85c0 0-11.42-5.7-14.98-2.85z"
      />
      <path
        style={style}
        d="M174.45 140.57s4.99 0 12.12 2.15c-7.14-1.79-12.12-1.43-12.12-1.43v-.72zM167.32 138.08s-6.07-4.28 8.56-12.49c0 0-4.29 12.13-8.56 12.49z"
      />
      <path
        style={style}
        d="M173.02 129.51s3.92-3.57 7.49-9.99c-3.92 6.06-7.85 9.27-7.85 9.27l.36.72zM185.51 134.87c-64.21 8.47-94.58 59.16-103.52 77.88-2.31-.57-4.59-1.21-6.83-1.92 7.96-14.97 41.73-70.96 110.35-75.96z"
      />
    </SvgWrapper>
  );
};

GlutenIcon.defaultProps = {
  outerColor: "#ee7440",
  innerColor: "#fefefe",
};
GlutenIcon.propTypes = {
  ...SvgWrapper.propTypes,
  outerColor: PropTypes.string,
  innerColor: PropTypes.string,
};

export default GlutenIcon;
