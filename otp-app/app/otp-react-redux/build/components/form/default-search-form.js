"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _connectedLocationField = _interopRequireDefault(require("./connected-location-field"));

var _tabbedFormPanel = _interopRequireDefault(require("./tabbed-form-panel"));

var _switchButton = _interopRequireDefault(require("./switch-button"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DefaultSearchForm = /*#__PURE__*/function (_Component) {
  _inherits(DefaultSearchForm, _Component);

  var _super = _createSuper(DefaultSearchForm);

  function DefaultSearchForm() {
    var _this;

    _classCallCheck(this, DefaultSearchForm);

    _this = _super.call(this);
    _this.state = {
      desktopDateTimeExpanded: false,
      desktopSettingsExpanded: false
    };
    return _this;
  }

  _createClass(DefaultSearchForm, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          mobile = _this$props.mobile,
          ModeIcon = _this$props.ModeIcon;
      var actionText = mobile ? "$_tap_$" : "$_click_$";
      return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
        className: "locations"
      }, /*#__PURE__*/_react.default.createElement(_connectedLocationField.default, {
        inputPlaceholder: "$_insert_departure_$ ".concat(actionText, " $_on_map_$..."),
        locationType: "from",
        showClearButton: true
      }), /*#__PURE__*/_react.default.createElement(_connectedLocationField.default, {
        inputPlaceholder: "$_insert_arrive_$ ".concat(actionText, " $_on_map_$..."),
        locationType: "to",
        showClearButton: !mobile
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: "switch-button-container"
      }, /*#__PURE__*/_react.default.createElement(_switchButton.default, {
        content: /*#__PURE__*/_react.default.createElement("i", {
          className: "fa fa-exchange fa-rotate-90"
        })
      }))), /*#__PURE__*/_react.default.createElement(_tabbedFormPanel.default, {
        ModeIcon: ModeIcon
      }));
    }
  }]);

  return DefaultSearchForm;
}(_react.Component);

exports.default = DefaultSearchForm;

_defineProperty(DefaultSearchForm, "propTypes", {
  mobile: _propTypes.default.bool,
  ModeIcon: _propTypes.default.elementType.isRequired
});

_defineProperty(DefaultSearchForm, "defaultProps", {
  showFrom: true,
  showTo: true
});

module.exports = exports.default;

//# sourceMappingURL=default-search-form.js