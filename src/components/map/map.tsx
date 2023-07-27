import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

interface MapProps {
  center: [number, number];
}

const Map: React.FC<MapProps> = ({ center }) => {
  useEffect(() => {
    // Set Mapbox access token
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || '';

    // Create a new map instance
    const map = new mapboxgl.Map({
      container: 'map', // The HTML container element ID where the map will be displayed
      style: 'mapbox://styles/mapbox/streets-v11', // The map style URL
      center: center, // The initial center of the map [longitude, latitude]
      zoom: 12, // Initial zoom level
    });

    // Add map controls, markers, layers, etc. as needed

    // Clean up on component unmount
    return () => map.remove();
  }, [center]);

  return <div id="map" style={{ width: '100%', height: '400px' }} />;
};

export default Map;
