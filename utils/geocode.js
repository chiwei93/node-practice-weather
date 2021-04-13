const axios = require('axios');

const geoKey =
  'pk.eyJ1IjoiY2hpd2VpOTMiLCJhIjoiY2tuYnF5ZTd6MHVxNjJ1b28wdmZtdG5qZyJ9.EBD2B8FvNRVuEQHXNYMC2g';

const getGeoData = async location => {
  try {
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        location
      )}.json`,
      {
        params: {
          access_token: geoKey,
          limit: 1,
        },
      }
    );

    if (response.data.features.length === 0) {
      throw new Error('Location not found!');
    }

    const { center, place_name } = response.data.features[0];

    console.log(place_name);

    const [lng, lat] = center;

    return { lat, lng };
  } catch (err) {
    throw Error(err.message);
  }
};

module.exports = getGeoData;
