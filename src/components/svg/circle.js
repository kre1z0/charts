import React from "react";
import PropTypes from "prop-types";

export const Circle = ({ size, ...props }) => {
  return (
    <circle
      width={size}
      height={size}
      cx={size / 2}
      cy={size / 2}
      viewBox={[0, 0, size, size].join(" ")}
      {...props}
    />
  );
};

Circle.propTypes = {
  size: PropTypes.number,
};
