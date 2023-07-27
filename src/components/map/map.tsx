import ReactMapGL, { Marker } from 'react-map-gl'

import Pin from '@/components/map/pin'
import { handleNightClick } from '@/utils/ra'
import { config } from '@/utils/config'

interface MapProps {
  markers: {
    latitude: number
    longitude: number
    raId: number
  }[]
}

const Map: React.FC<MapProps> = ({ markers }) => {
  return (
    <div>
      <style jsx global>{`
        .mapboxgl-ctrl-attrib-inner {
          display: none;
        }
      `}</style>
      <ReactMapGL
        style={{ width: '100%', height: '80vh' }}
        initialViewState={{
          latitude: 51.5074,
          longitude: -0.1278,
          zoom: 10,
        }}
        mapboxAccessToken={config.MAPBOX_ACCESS_TOKEN}
        mapStyle="mapbox://styles/behlock/cljr22vwz011s01pjgtfedqtc"
        onRender={(event) => event.target.resize()}
      >
        {markers.map((marker, index) => (
          <Marker key={index} longitude={marker.longitude} latitude={marker.latitude}>
            <Pin 
              size={20}
              onClick={handleNightClick}  
              raId={marker.raId}
              />
          </Marker>
        ))}
      </ReactMapGL>
    </div>
  )
}

export default Map
