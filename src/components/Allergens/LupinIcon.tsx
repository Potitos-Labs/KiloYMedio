import React from "react";
import PropTypes from "prop-types";
import SvgWrapper from "./SvgWrapper";

const LupinIcon = ({
  innerColor,
  outerColor,
  ...props
}: {
  innerColor: string;
  outerColor: string;
}) => {
  return (
    <SvgWrapper {...props}>
      <path
        style={{
          fill: outerColor,
        }}
        d="M215.65 107.61c0 59.51-48.49 107.61-108.01 107.61C48.11 215.22 0 167.12 0 107.61 0 48.08 48.11 0 107.64 0c59.52 0 108.01 48.08 108.01 107.61z"
      />
      <path
        style={{
          fill: innerColor,
        }}
        d="M97 106.81c0-20.89-16.96-37.84-37.85-37.84S21.3 85.92 21.3 106.81c0 20.9 13.4 28.38 33.91 31.93C78.47 142.69 97 127.71 97 106.81zm-8.29 7.89c0 10.64-12.22 21.69-35.09 17.74-15.77-2.36-24.44-7.09-24.44-17.74 0-1.58.4-3.16.79-4.73 1.58 5.92 3.55 13.41 24.44 14.58 19.32 1.19 31.54-3.54 34.3-9.85zM181.75 71.74c0-20.51-18.92-41.01-39.82-41.01s-37.46 24.06-37.46 44.95c0 20.89 18.54 33.9 39.43 33.9 20.9 0 37.85-16.95 37.85-37.84zm-8.28 3.55c0 16.16-13.01 28.77-29.56 28.77-16.56 0-31.54-9.07-31.54-24.84 0-2.36.39-4.73.79-6.7 1.57 8.68 9.07 21.69 29.96 23.26 19.31 1.57 27.59-11.04 30.35-20.49zM138.77 117.46c-17.74-6.69-33.51 1.59-40.59 19.72-7.1 18.13 1.18 38.62 18.93 45.72 17.35 6.7 37.85-8.67 44.93-26.8 7.09-18.53-5.91-31.55-23.27-38.64zm-8.66 1.97c-33.5 22.87-24.05 46.91-18.13 55.98-11.04-7.88-15.37-22.86-10.25-36.66 4.72-11.82 14.58-21.29 28.38-19.32z"
      />
      <path
        style={{
          fill: outerColor,
        }}
        d="M147.45 37.45c4.73.39 8.27-.4 8.67-1.59 0-1.17-3.55-2.36-8.28-2.36-4.73-.39-8.28 0-8.28 1.19-.39 1.17 3.56 2.36 7.89 2.76zM59.93 75.29c4.73 0 8.27-1.19 8.27-2.37 0-1.18-3.55-1.97-8.27-1.97s-8.27.79-8.27 1.97 3.54 2.37 8.27 2.37zM149.03 166.74c-2.77 3.55-4.34 7.09-3.55 7.89 1.18.78 3.94-1.58 6.7-5.13 2.77-3.94 4.34-7.5 3.55-8.28-1.18-.4-3.95 1.96-6.7 5.52z"
      />
    </SvgWrapper>
  );
};

LupinIcon.defaultProps = {
  outerColor: "#f6d24e",
  innerColor: "#fefefe",
};
LupinIcon.propTypes = {
  ...SvgWrapper.propTypes,
  outerColor: PropTypes.string,
  innerColor: PropTypes.string,
};

export default LupinIcon;
