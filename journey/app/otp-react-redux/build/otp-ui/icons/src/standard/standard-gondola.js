"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const StandardGondola = ({
  title,
  ...props
}) => /*#__PURE__*/_react.default.createElement("svg", _extends({
  version: "1.1",
  viewBox: "0 0 32 32",
  height: "100%",
  width: "100%"
}, props), /*#__PURE__*/_react.default.createElement("path", {
  d: "M24.9,17.2c-1.7-0.6-5.9-0.9-8-1.1V6.7l12.4,4.5V9.5l-7.7-2.8l0-1.3l-11.2-4l0,1.3L2.7,0v1.6l11.9,4.2v10.2L10,16 c0,0-3.8,0.4-6,3c-2.2,2.6-2.3,4.1-2.3,5.7c0,1.5,1.3,4.1,3.2,5.2c1.9,1.1,4.3,1.3,4.3,1.3L19.5,32c0,0,4.9-0.1,7.1-1.4 c1.6-1,3.7-2.5,3.7-6.3C30.3,20.5,27.8,18.2,24.9,17.2z M10.5,26.3H4.1c0,0-0.8-2.8,0.3-4.5c1.1-1.7,2-2.4,2-2.4l4.1,0.1V26.3z M18.9,26.3h-6.2v-6.9h6.2V26.3z M28.2,26.3h-7.1v-6.9h4.8c0,0,1,0.6,2,2.3C29,23.5,28.2,26.3,28.2,26.3z"
}));

var _default = StandardGondola;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=standard-gondola.js