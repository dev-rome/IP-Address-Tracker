import { useEffect } from "react";

import { Marker, Popup, useMap } from "react-leaflet";
import MarkerIcon from "../node_modules/leaflet/dist/images/marker-icon.png";

const MarkerContainer = ({ data }) => {
  const position = [data.location.lat, data.location.lng];
  const map = useMap();

  useEffect(() => {
    map.flyTo(position, 13, {
      animate: true,
    });
  }, [map, position]);

  return (
    <Marker
      position={position}
      icon={
        new L.Icon({
          iconUrl: MarkerIcon.src,
          iconRetinaUrl: MarkerIcon.src,
        })
      }
    >
      <Popup>A sample marker popup.</Popup>
    </Marker>
  );
};

export default MarkerContainer;
