import React from "react";
import PropTypes from "prop-types";

import { isIE11 } from "../../utils/utils";

export const Svg = ({ children, responsive, size, width, height, offSet = 0, ...props }) => {
  const w = width || size;
  const h = height || size;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ flex: isIE11 ? "0 1 auto" : "1 1" }}
      width={responsive && !isIE11 ? "100%" : w}
      height={responsive && !isIE11 ? "100%" : h}
      viewBox={[0, 0, w + offSet, h + offSet].join(" ")}
      {...props}
    >
      {children}
    </svg>
  );
};

Svg.propTypes = {
  children: PropTypes.any,
  responsive: PropTypes.bool,
  size: PropTypes.number,
};
