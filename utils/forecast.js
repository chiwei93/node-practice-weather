const axios = require('axios');

const key = '4360b80c00e818bbba07dce10171c8a4';

const getData = async coordinates => {
  try {
    const { lat, lng } = coordinates;

    const response = await axios.get('http://api.weatherstack.com/forecast', {
      params: {
        access_key: key,
        query: `${lat},${lng}`,
        units: 'f',
      },
    });

    if (response.data.error) {
      throw new Error('Location not found.');
    }

    const { weather_descriptions } = response.data.current;

    const { name } = response.data.location;

    return {
      location: name,
      forecast: weather_descriptions[0],
    };
  } catch (err) {
    throw Error(err.message);
  }
};

module.exports = getData;
