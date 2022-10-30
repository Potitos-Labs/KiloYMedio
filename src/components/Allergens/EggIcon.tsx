import PropTypes from "prop-types";
import React from "react";

import SvgWrapper from "./SvgWrapper";

const EggIcon = ({
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
        d="M215.84 107.75c0 59.59-48.17 108.11-108.09 108.11C48.17 215.86 0 167.34 0 107.75 0 47.81 48.17 0 107.75 0c59.92 0 108.09 47.81 108.09 107.75z"
        fill={outerColor}
      />
      <path
        style={style}
        d="M58.16 63.16c-17.84 1.79-28.9 35.68-26.75 58.15 2.13 22.48 18.19 34.26 35.68 32.82 17.84-1.78 31.03-16.77 28.89-39.24-2.15-22.48-19.99-53.52-37.82-51.73zm2.85 15.33s-8.56 4.63-10.34 17.48c-.36 1.79-1.78 3.22-3.57 3.22h-.71c-1.07 0-1.78-.72-2.5-1.43-.72-.72-1.07-1.79-.72-2.87 2.14-16.05 13.21-22.46 14.26-23.18 1.78-.71 4.28 0 5.35 1.79.72 1.78.01 4.29-1.77 4.99zM133.43 94.9c-22.48 2.51-34.25 18.56-32.11 36.41 2.14 17.84 17.13 30.33 39.6 27.83 22.47-2.51 53.16-21.06 51.01-38.53-2.14-17.85-36.39-28.56-58.5-25.71zm47.8 29.97c-.36.36-.72.71-1.43.71-1.42 0-2.85-.71-3.57-2.14-.35-.35-4.99-8.21-17.84-9.27a4.569 4.569 0 01-3.56-3.57v-.71c.35-2.15 2.14-3.57 4.28-3.57 16.77 1.78 23.18 12.84 23.55 13.55.35.37.35.72.71 1.08 0 1.79-.71 3.22-2.14 3.92zM129.15 86.35h1.07c5.35-.71 11.77-.35 18.19.36 1.43-22.13-8.56-53.17-25.33-55.66-14.27-1.79-30.31 19.61-37.09 39.24 6.78 8.55 13.19 20.33 16.4 30.68 6.41-6.78 15.34-13.2 26.76-14.62zm-27.13-26.77c5-16.05 17.13-20.33 17.84-20.69h1.43c1.42 0 2.85 1.08 3.21 2.5.72 2.14-.36 4.28-2.5 4.99 0 0-8.92 3.21-12.84 15.69-.37 1.43-1.43 2.5-3.21 2.5H104.52c-1.07-.35-1.78-1.07-2.14-1.77-.71-1.08-.71-2.14-.36-3.22z"
      />
    </SvgWrapper>
  );
};

EggIcon.defaultProps = {
  outerColor: "#f39339",
  innerColor: "#fefefe",
};
EggIcon.propTypes = {
  ...SvgWrapper.propTypes,
  outerColor: PropTypes.string,
  innerColor: PropTypes.string,
};

export default EggIcon;
