import BaseMap from '../../otp-ui/base-map'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { withNamespaces } from "react-i18next";

import {
  bikeRentalQuery,
  carRentalQuery,
  vehicleRentalQuery
} from '../../actions/api'
import { updateOverlayVisibility } from '../../actions/config'
import {
  setLocation,
  setMapPopupLocation,
  setMapPopupLocationAndGeocode
} from '../../actions/map'
import BoundsUpdatingOverlay from './bounds-updating-overlay'
import EndpointsOverlay from './connected-endpoints-overlay'
import ParkAndRideOverlay from './connected-park-and-ride-overlay'
import RouteViewerOverlay from './connected-route-viewer-overlay'
import StopViewerOverlay from './connected-stop-viewer-overlay'
import StopsOverlay from './connected-stops-overlay'
import TransitiveOverlay from './connected-transitive-overlay'
import TripViewerOverlay from './connected-trip-viewer-overlay'
import VehicleRentalOverlay from './connected-vehicle-rental-overlay'
import ElevationPointMarker from './elevation-point-marker'
import PointPopup from './point-popup'
import TileOverlay from './tile-overlay'
import ZipcarOverlay from '../../otp-ui/zipcar-overlay'
import ParkingOverlay from '../../otp-ui/parking-overlay'

const MapContainer = styled.div`
  height: 100%;
  width: 100%;

  .map {
    height: 100%;
    width: 100%;
  }

  * {
    box-sizing: unset;
  }
`

class DefaultMap extends Component {
  constructor(props) {
    super(props)

    this.state = {
      forceRefresh: false
    }
  }
  /**
   * Checks whether the modes have changed between old and new queries and
   * whether to update the map overlays accordingly (e.g., to show rental vehicle
   * options on the map).
   */
  _handleQueryChange = (oldQuery, newQuery) => {
    const { overlays } = this.props
    if (overlays && oldQuery.mode) {
      // Determine any added/removed modes
      const oldModes = oldQuery.mode.split(',')
      const newModes = newQuery.mode.split(',')
      const removed = oldModes.filter(m => !newModes.includes(m))
      const added = newModes.filter(m => !oldModes.includes(m))
      const overlayVisibility = {}
      for (const oConfig of overlays) {
        if (!oConfig.modes || oConfig.modes.length !== 1) continue
        // TODO: support multi-mode overlays
        const overlayMode = oConfig.modes[0]

        if (
          (
            overlayMode === 'CAR_RENT' ||
            overlayMode === 'CAR_HAIL' ||
            overlayMode === 'MICROMOBILITY_RENT'
          ) &&
          oConfig.companies
        ) {
          // Special handling for company-based mode overlays (e.g. carshare, car-hail)
          const overlayCompany = oConfig.companies[0] // TODO: handle multi-company overlays
          if (added.includes(overlayMode)) {
            // Company-based mode was just selected; enable overlay iff overlay's company is active
            if (newQuery.companies.includes(overlayCompany)) overlayVisibility[oConfig.name] = true
          } else if (removed.includes(overlayMode)) {
            // Company-based mode was just deselected; disable overlay (regardless of company)
            overlayVisibility[oConfig.name] = false
          } else if (newModes.includes(overlayMode) && oldQuery.companies !== newQuery.companies) {
            // Company-based mode remains selected but companies change
            overlayVisibility[oConfig.name] = newQuery.companies.includes(overlayCompany)
          }
        } else { // Default handling for other modes
          if (added.includes(overlayMode)) overlayVisibility[oConfig.name] = true
          if (removed.includes(overlayMode)) overlayVisibility[oConfig.name] = false
        }
      }
      // Only trigger update action if there are overlays to update.
      if (Object.keys(overlayVisibility).length > 0) {
        this.props.updateOverlayVisibility(overlayVisibility)
      }
    }
  }

  onMapClick = (e) => {
    this.props.setMapPopupLocationAndGeocode(e)
  }

  onPopupClosed = () => {
    this.props.setMapPopupLocation({ location: null })
  }

  onSetLocationFromPopup = (payload) => {
    const { setLocation, setMapPopupLocation } = this.props
    setMapPopupLocation({ location: null })
    setLocation(payload)
  }

  componentDidUpdate (prevProps) {
    // Check if any overlays should be toggled due to mode change
    this._handleQueryChange(prevProps.query, this.props.query)

    if (this.props.lng!== prevProps.lng) {
      this.setState({ forceRefresh: true })
      setTimeout(() => {
        this.setState({ forceRefresh: false })
      }, 50)
    }
  }

  render () {
    const {
      bikeRentalQuery,
      bikeRentalStations,
      carRentalQuery,
      carRentalStations,
      mapConfig,
      mapPopupLocation,
      vehicleRentalQuery,
      vehicleRentalStations,
      t
    } = this.props

    const center = mapConfig && mapConfig.initLat && mapConfig.initLon
      ? [mapConfig.initLat, mapConfig.initLon]
      : null

    const popup = mapPopupLocation && {
      contents: (
        <PointPopup
          mapPopupLocation={mapPopupLocation}
          onSetLocationFromPopup={this.onSetLocationFromPopup}
        />
      ),
      location: [mapPopupLocation.lat, mapPopupLocation.lon]
    }

    return (
      <>
        { !this.state.forceRefresh &&
            <MapContainer>
              <BaseMap
                baseLayers={mapConfig.baseLayers}
                center={center}
                maxZoom={mapConfig.maxZoom}
                onClick={this.onMapClick}
                popup={popup}
                zoomControl={false}
                //TODO zoomControl from config
                onPopupClosed={this.onPopupClosed}
                zoom={mapConfig.initZoom || 13}
                onLoad={() => {
                  document.querySelectorAll('.leaflet-control-layers-base label span').forEach(item => {
                    item.setAttribute('id', `${item.textContent.toLowerCase().trim().split(' ').join('-')}-layer-image`);
                  })
                }}
              >
                {/* The default overlays */}
                <BoundsUpdatingOverlay />
                <EndpointsOverlay />
                <RouteViewerOverlay />
                <StopViewerOverlay />
                <TransitiveOverlay />
                <TripViewerOverlay />
                <ElevationPointMarker />

                {/* The configurable overlays */}
                {mapConfig.overlays && mapConfig.overlays.map((overlayConfig, k) => {
                  switch (overlayConfig.type) {
                    case 'bike-rental': return (
                      <VehicleRentalOverlay
                        key={k}
                        {...overlayConfig}
                        name={t(overlayConfig.name)}
                        refreshVehicles={bikeRentalQuery}
                        stations={bikeRentalStations}
                      />
                    )
                    case 'car-rental': return (
                      <VehicleRentalOverlay
                        key={k}
                        {...overlayConfig}
                        name={t(overlayConfig.name)}
                        refreshVehicles={carRentalQuery}
                        stations={carRentalStations}
                      />
                    )
                    case 'park-and-ride':
                      return <ParkAndRideOverlay key={k} {...overlayConfig} name={t(overlayConfig.name)} />
                    case 'stops': return <StopsOverlay key={k} {...overlayConfig} name={t(overlayConfig.name)}/>
                    case 'tile': return <TileOverlay key={k} {...overlayConfig} name={t(overlayConfig.name)}/>
                    case 'micromobility-rental': return (
                      <VehicleRentalOverlay
                        key={k}
                        {...overlayConfig}
                        name={t(overlayConfig.name)}
                        refreshVehicles={vehicleRentalQuery}
                        stations={vehicleRentalStations}
                      />
                    )
                    case 'zipcar': return <ZipcarOverlay key={k} {...overlayConfig} name={t(overlayConfig.name)}/>
                    case 'parking': return <ParkingOverlay key={k} {...overlayConfig} name={t(overlayConfig.name)}/>
                    default: return null
                  }
                })}
              </BaseMap>
            </MapContainer>
        }
      </>
    )
  }
}

// connect to the redux store

const mapStateToProps = (state, ownProps) => {
  const overlays = state.otp.config.map && state.otp.config.map.overlays
    ? state.otp.config.map.overlays
    : []
  return {
    bikeRentalStations: state.otp.overlay.bikeRental.stations,
    carRentalStations: state.otp.overlay.carRental.stations,
    mapConfig: state.otp.config.map,
    mapPopupLocation: state.otp.ui.mapPopupLocation,
    overlays,
    query: state.otp.currentQuery,
    vehicleRentalStations: state.otp.overlay.vehicleRental.stations
  }
}

const mapDispatchToProps = {
  bikeRentalQuery,
  carRentalQuery,
  setLocation,
  setMapPopupLocation,
  setMapPopupLocationAndGeocode,
  updateOverlayVisibility,
  vehicleRentalQuery
}

export default withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(DefaultMap))
