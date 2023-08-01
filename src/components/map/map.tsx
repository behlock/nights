import ReactMapGL, { Marker } from 'react-map-gl'
import { useTheme } from 'next-themes'

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
  const { theme } = useTheme()
  const mapStyle = theme === 'dark' ? config.MAPBOX_MAP_STYLE_DARK : config.MAPBOX_MAP_STYLE_LIGHT

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
        mapStyle={mapStyle}
        onRender={(event) => event.target.resize()}
      >
        {markers.map((marker, index) => (
          <Marker key={index} longitude={marker.longitude} latitude={marker.latitude}>
            <Pin size={20} color={theme === 'dark' ? '#000' : '#fff'} onClick={handleNightClick} raId={marker.raId} />
          </Marker>
        ))}
      </ReactMapGL>
    </div>
  )
}

export default Map
