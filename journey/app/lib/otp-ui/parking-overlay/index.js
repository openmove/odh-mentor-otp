import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { FeatureGroup, MapLayer, Marker, Popup, withLeaflet } from 'react-leaflet'
import { divIcon } from 'leaflet'
import { withNamespaces } from "react-i18next";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { setLocation } from '../../actions/map'
import { parkingLocationsQuery } from '../../actions/parking'

import BadgeIcon from "../icons/badge-icon";
import MarkerParking from "../icons/modern/MarkerParking";
import ReactDOMServer from "react-dom/server";
import Parking from "../icons/modern/Parking";
import FromToLocationPicker from '../from-to-location-picker'

import config from '../../config.yml';

const overlayParkingConf = config.map.overlays.filter(item => item.type === 'parking')[0]

class ParkingOverlay extends MapLayer {
  static propTypes = {
    api: PropTypes.string,
    locations: PropTypes.array,
    parkingLocationsQuery: PropTypes.func,
    setLocation: PropTypes.func
  }

  _startRefreshing () {
    // ititial station retrieval
    this.props.parkingLocationsQuery(this.props.api)

    // set up timer to refresh stations periodically
    this._refreshTimer = setInterval(() => {
      this.props.parkingLocationsQuery(this.props.api)
    }, 30000) // defaults to every 30 sec. TODO: make this configurable?*/
  }

  _stopRefreshing () {
    if (this._refreshTimer) clearInterval(this._refreshTimer)
  }

  componentDidMount () {
    this.props.registerOverlay(this)
  }

  onOverlayAdded = () => {
    this._startRefreshing()
  }

  onOverlayRemoved = () => {
    this._stopRefreshing()
  }

  componentWillUnmount () {
    this._stopRefreshing()
  }

  componentDidUpdate (prevProps) {
    if (!prevProps.visible && this.props.visible) {
      this._startRefreshing()
    } else if (prevProps.visible && !this.props.visible) {
      this._stopRefreshing()
    }
  }

  createLeafletElement () {}

  updateLeafletElement () {}

  render () {
    const { locations, t } = this.props
    if (!locations || locations.length === 0) return <FeatureGroup />

    const markerIcon = (data) => {
      let badgeType = 'default';
      let badgeCounter = data.free || 0;

      if (data.capacity === data.free) {
        badgeType = 'success';
        badgeCounter = null;
      } else if (data.free < data.capacity) {
        badgeType = 'default';
        badgeCounter = data.free
      }

      if (data.free === 0 ) {
        badgeType = 'danger';
        badgeCounter = null;
      }

      return divIcon({
        className: "",
        iconSize: [overlayParkingConf.iconWidth, overlayParkingConf.iconHeight],
        popupAnchor: [0, -overlayParkingConf.iconHeight / 2],
        html: ReactDOMServer.renderToStaticMarkup(
          <BadgeIcon counter={badgeCounter} type={badgeType} width={overlayParkingConf.iconWidth}>
            <MarkerParking
              width={overlayParkingConf.iconWidth}
              height={overlayParkingConf.iconHeight}
              iconColor={overlayParkingConf.iconColor}
              markerColor={overlayParkingConf.iconMarkerColor}
            />
          </BadgeIcon>
        )
      });;
    }


    const bulletIconStyle = {
      color: 'gray',
      fontSize: 12,
      width: 15
    }

    return (
      <FeatureGroup>
        {locations.map((location) => {
          return (
            <Marker
              icon={markerIcon(location)}
              key={location.name}
              position={[location.lat, location.lon]}
            >
              <Popup>
                <div className="otp-ui-mapOverlayPopup">
                  <div className="otp-ui-mapOverlayPopup__popupHeader">
                    <Parking width={24} height={20} />&nbsp;{t('parking')}
                  </div>

                  <div className="otp-ui-mapOverlayPopup__popupTitle">{location.name}</div>

                  <div className="otp-ui-mapOverlayPopup__popupAvailableInfo">
                    <CircularProgressbar
                      value={location.free}
                      minValue={0}
                      maxValue={location.capacity}
                      text={location.free}
                      className="otp-ui-mapOverlayPopup__popupAvailableInfoProgress"
                    />
                    <div className="otp-ui-mapOverlayPopup__popupAvailableInfoTitle">{t('capacity')}: {location.capacity}</div>
                  </div>

                  <div className='popup-row'>
                    <FromToLocationPicker
                      location={location}
                      setLocation={this.props.setLocation}
                    />
                  </div>
                </div>
              </Popup>
            </Marker>
          )
        })}
      </FeatureGroup>
    )
  }
}

// connect to the redux store

const mapStateToProps = (state, ownProps) => {
  return {
    locations: state.otp.overlay.parking && state.otp.overlay.parking.locations
  }
}

const mapDispatchToProps = {
  setLocation,
  parkingLocationsQuery
}

export default withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(withLeaflet(ParkingOverlay)))
