import React from "react";
import PropTypes from "prop-types";

import { browser } from "../../utils/utils";

const isIE11 = browser === "IE 11";

export const Svg = ({ children, responsive, size, offSet = 0 }) => {
  return (
    <svg
      style={{ flex: isIE11 ? "0 1 auto" : "1 1" }}
      width={responsive && !isIE11 ? "100%" : size}
      height={responsive && !isIE11 ? "100%" : size}
      viewBox={[0, 0, size + offSet, size + offSet].join(" ")}
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
