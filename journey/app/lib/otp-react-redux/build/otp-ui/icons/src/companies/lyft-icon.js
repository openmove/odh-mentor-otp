"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const LyftIcon = ({
  title,
  ...props
}) => /*#__PURE__*/_react.default.createElement("svg", _extends({
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 512 512",
  height: "100%",
  width: "100%"
}, props), title ? /*#__PURE__*/_react.default.createElement("title", null, title) : null, /*#__PURE__*/_react.default.createElement("path", {
  d: "M0 81.1h77.8v208.7c0 33.1 15 52.8 27.2 61-12.7 11.1-51.2 20.9-80.2-2.8C7.8 334 0 310.7 0 289V81.1zm485.9 173.5v-22h23.8v-76.8h-26.1c-10.1-46.3-51.2-80.7-100.3-80.7-56.6 0-102.7 46-102.7 102.7V357c16 2.3 35.4-.3 51.7-14 17.1-14 24.8-37.2 24.8-59v-6.7h38.8v-76.8h-38.8v-23.3c0-34.6 52.2-34.6 52.2 0v77.1c0 56.6 46 102.7 102.7 102.7v-76.5c-14.5 0-26.1-11.7-26.1-25.9zm-294.3-99v113c0 15.4-23.8 15.4-23.8 0v-113H91v132.7c0 23.8 8 54 45 63.9 37 9.8 58.2-10.6 58.2-10.6-2.1 13.4-14.5 23.3-34.9 25.3-15.5 1.6-35.2-3.6-45-7.8v70.3c25.1 7.5 51.5 9.8 77.6 4.7 47.1-9.1 76.8-48.4 76.8-100.8V155.1h-77.1v.5z"
}));

var _default = LyftIcon;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=lyft-icon.js