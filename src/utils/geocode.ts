const MAPBOX_BATCH_GEOCODING_API_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places-permanent/';

export interface GeoCoords {
  latitude: number;
  longitude: number;
}

const getGeoCoordsFromAddresses = async (addresses: string[], accessToken: string): Promise<GeoCoords[]> => {
  try {
    const encodedAddresses = addresses.map((address) => encodeURIComponent(address)).join(';');
    const response = await fetch(`${MAPBOX_BATCH_GEOCODING_API_URL}${encodedAddresses}.json?access_token=${accessToken}`);

    if (!response.ok) {
      throw new Error('Failed to fetch location data.');
    }

    const data = await response.json();

    if (data && data.features && data.features.length > 0) {
      const geoCoordsList: GeoCoords[] = data.features.map((feature: any) => {
        const [longitude, latitude] = feature.center;
        return { latitude, longitude };
      });
      return geoCoordsList;
    } else {
      throw new Error('Location(s) not found.');
    }
  } catch (error) {
    throw new Error('Error fetching location coordinates.');
  }
};

export default getGeoCoordsFromAddresses;
