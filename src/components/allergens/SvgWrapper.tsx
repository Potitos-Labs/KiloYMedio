import PropTypes from "prop-types";
import React from "react";

const SvgWrapper = ({
  width,
  height,
  wrapperStyle,
  children,
}: {
  width: number | undefined;
  height: number | undefined;
  wrapperStyle: any | undefined;
  children: JSX.Element | JSX.Element[] | undefined;
}) => {
  return (
    <div style={{ width, height, ...wrapperStyle }}>
      <svg viewBox={`0 0 216 216`}>{children}</svg>
    </div>
  );
};

SvgWrapper.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  children: PropTypes.node,
};

SvgWrapper.defaultProps = {
  width: 200,
  height: 200,
  wrapperStyle: {},
};

export default SvgWrapper;
