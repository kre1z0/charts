import { Color } from "../../utils/Color";
import { getGuid } from "../../utils/utils";

const NS = "http://www.w3.org/2000/svg";

export class SvgRender {
  _getPathNode(properties) {
    if (properties.fillImage) {
      var defs = document.createElementNS(NS, "defs");
      var pattern = document.createElementNS(NS, "pattern");
      var id = getGuid();
      pattern.setAttribute("id", id);
      pattern.setAttribute("patternUnits", "userSpaceOnUse");
      pattern.setAttribute("x", properties.x);
      pattern.setAttribute("y", properties.y);
      pattern.setAttribute("width", properties.fillImage.width);
      pattern.setAttribute("height", properties.fillImage.height);

      var image = document.createElementNS(NS, "image");
      image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", properties.fillImage.src);
      image.setAttribute("width", properties.fillImage.width);
      image.setAttribute("height", properties.fillImage.height);

      pattern.appendChild(image);
      defs.appendChild(pattern);
    }

    var path = document.createElementNS(NS, "path");
    var svgAttributes = setAttributes(path, properties);
    var svg = this._getSvgBase(svgAttributes);

    if (properties.fillImage) {
      svg.setAttribute("xmlns", NS);
      svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");

      path.setAttribute("fill", "url(#" + id + ")");
      svg.appendChild(defs);
    }

    svg.appendChild(path);

    return svg;
  }

  _getCircle(properties) {
    var circle = document.createElementNS(NS, "circle");
    var svgAttributes = setAttributes(circle, properties);
    var svg = this._getSvgBase(svgAttributes);

    svg.appendChild(circle);

    return svg;
  }

  _getSvgBase(properties) {
    var svg = document.createElementNS(NS, "svg");
    setAttributes(svg, properties);
    svg.setAttribute("style", "pointerEvents: none;");

    return svg;
  }
}

const svgAttributes = ["width", "height", "viewBox"];

function setAttributes(element, attributes) {
  var isSvg = element instanceof SVGSVGElement;
  var notSet = {};
  for (var i in attributes) {
    if (attributes.hasOwnProperty(i) && i !== "fillImage" && attributes[i] !== undefined) {
      if (!isSvg && svgAttributes.indexOf(i) !== -1) {
        notSet[i] = attributes[i];
        continue;
      }

      if (i === "stroke" || i === "fill") {
        var color = new Color(attributes[i]);
        if (color.a < 255 || color.format === "rgba") {
          element.setAttribute(i, color.toString("rgb"));
          if (color.a < 255) element.setAttribute(i + "-opacity", color.a / 255);
          continue;
        }
      }
      element.setAttribute(i, attributes[i]);
    }
  }

  return notSet;
}
