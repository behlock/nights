const MAPBOX_API_BASE_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';

interface GeoCoords {
  latitude: number;
  longitude: number;
}

const getGeoCoordsFromAddress = async (address: string, accessToken: string): Promise<GeoCoords> => {
  try {
    const encodedAddress = encodeURIComponent(address);
    const response = await fetch(`${MAPBOX_API_BASE_URL}${encodedAddress}.json?access_token=${accessToken}`);

    if (!response.ok) {
      throw new Error('Failed to fetch location data.');
    }

    const data = await response.json();

    if (data && data.features && data.features.length > 0) {
      const [longitude, latitude] = data.features[0].center;
      return { latitude, longitude };
    } else {
      throw new Error('Location not found.');
    }
  } catch (error) {
    throw new Error('Error fetching location coordinates.');
  }
};

export default getGeoCoordsFromAddress;
