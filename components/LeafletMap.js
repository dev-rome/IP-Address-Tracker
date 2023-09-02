import { MapContainer, TileLayer } from "react-leaflet";
import MarkerContainer from "./MarkerContainer";

const LeafletMap = ({ data }) => {
  const position = [data.location.lat, data.location.lng];

  return (
    <div className=" z-10 flex flex-grow items-center justify-center">
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MarkerContainer data={data} />
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
