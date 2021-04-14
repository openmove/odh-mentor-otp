import BaseMap from "../../base-map/src";
import PropTypes from "prop-types";
import React from "react";
import { action } from "@storybook/addon-actions";
import { withA11y } from "@storybook/addon-a11y";
import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";
import { Cat, Dog } from "@styled-icons/fa-solid";

import EndpointsOverlay from ".";

import "../../../node_modules/leaflet/dist/leaflet.css";

// BaseMap props
const center = [45.5215, -122.686202];
const zoom = 16;

// EndpointsOverlay props
const clearLocation = action("clearLocation");
const forgetPlace = action("forgetPlace");
const fromLocation = {
  lat: 45.522497,
  lon: -122.676029,
  name: "Portland City Grill",
  type: "work"
};
const rememberPlace = action("rememberPlace");
const setLocation = action("setLocation");
const toLocation = {
  lat: 45.521049,
  lon: -122.693724,
  name: "Portland Towers",
  type: "home"
};
const locations = [fromLocation, toLocation];

function CatDogIcon({ type }) {
  return type === "from" ? <Cat size={40} color="orange" /> : <Dog size={40} />;
}

CatDogIcon.propTypes = {
  type: PropTypes.string.isRequired
};

storiesOf("EndpointsOverlay", module)
  .addDecorator(withA11y)
  .addDecorator(withInfo)
  .add("EndpointsOverlay", () => (
    <BaseMap center={center} zoom={zoom}>
      <EndpointsOverlay
        fromLocation={fromLocation}
        setLocation={setLocation}
        toLocation={toLocation}
        visible
      />
    </BaseMap>
  ))
  .add("EndpointsOverlay with user settings", () => (
    <BaseMap center={center} zoom={zoom}>
      <EndpointsOverlay
        clearLocation={clearLocation}
        forgetPlace={forgetPlace}
        fromLocation={fromLocation}
        locations={locations}
        rememberPlace={rememberPlace}
        setLocation={setLocation}
        showUserSettings
        toLocation={toLocation}
        visible
      />
    </BaseMap>
  ))
  .add("EndpointsOverlay with custom map markers", () => (
    <BaseMap center={center} zoom={zoom}>
      <EndpointsOverlay
        fromLocation={fromLocation}
        MapMarkerIcon={CatDogIcon}
        setLocation={setLocation}
        toLocation={toLocation}
        visible
      />
    </BaseMap>
  ))
  .add("EndpointsOverlay with intermediate place", () => (
    <BaseMap center={center} zoom={zoom}>
      <EndpointsOverlay
        fromLocation={fromLocation}
        intermediatePlaces={[
          {
            lat: 45.523193,
            lon: -122.681538,
            name: "Powell's City of Books",
            type: "intermediate-place-1"
          }
        ]}
        setLocation={setLocation}
        toLocation={toLocation}
        visible
      />
    </BaseMap>
  ));