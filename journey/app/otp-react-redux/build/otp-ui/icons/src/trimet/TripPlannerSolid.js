"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const SvgTripplannersolid = ({
  title,
  ...props
}) => /*#__PURE__*/_react.default.createElement("svg", _extends({
  viewBox: "0 0 390 390"
}, props), title ? /*#__PURE__*/_react.default.createElement("title", null, title) : null, /*#__PURE__*/_react.default.createElement("path", {
  d: "M271.3 47.8v215.4c6-1 12-2.4 17.9-3.9l5.2 19.2c-7.6 2.1-15.3 3.7-23.1 4.9v105.9l115.3-47.8V0L271.3 47.8zm36.4 226.5l-6.5-18.8c11.9-4.1 23.4-9.4 34.4-15.8l10 17.2c-12.1 7-24.8 12.9-37.9 17.4zM103.7 131.2l-6.6-18.8c7.2-2.6 14.4-4.6 21.6-6.3V.8L3.4 48.6V390l115.3-47.8V126.7c-5 1.2-10 2.7-15 4.5zm-54.1 28.3l-11.5-16.3c14-9.9 28.6-18.2 43.4-24.7l8 18.2c-13.6 6.1-27 13.7-39.9 22.8zM229.5 267l14.3-13.8c2.4 2.4 4.9 4.4 7.8 6.2V47.8L138.2.8v105.3c8.4 2.2 16.3 4.8 23.4 7.9l-8 18.2c-4.7-2.1-9.8-3.9-15.3-5.5v215.6l113.4 47V281.4c-8.7-3.3-16-8.2-22.2-14.4zm-61.6-126.8l11.3-16.4c16.6 11.5 28.1 26.7 35.9 47.8l-18.6 7c-6.4-17.2-15.4-29.4-28.6-38.4zm37.4 70c-1.2-5-2.4-10.2-3.7-15.2l19.2-5.1c1.4 5.3 2.6 10.6 3.8 15.8 2.9 12.9 5.8 25 10.6 34.9l-17.9 8.7c-5.7-12-8.8-25.1-12-39.1z"
}));

var _default = SvgTripplannersolid;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=TripPlannerSolid.js