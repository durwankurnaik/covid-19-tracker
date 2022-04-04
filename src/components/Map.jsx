import React from "react";
import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";
import "../styles/Map.css";

function Map({ center, zoom }) {
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile-{s}.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
      </LeafletMap>
    </div>
  );
}

export default Map;
