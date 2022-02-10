import axios from "axios";
//api calları için bu js'i oluşturduk
// axios ile api call yapacağız

export const getPlacesData = async (type, sw, ne) => {
  try {
    // axios olduğundan metod get olur dedi ve yukarıdaki(artık aşağıdaki :)) parametrelerden get'i çıkardık
    // ` şununla beraber stringi template stringe çevirdik ve type'ı içerisine parametrik olarak verebildik

    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: {
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_WEATHER_API_KEY
      }
    });

    return data;
  } catch (error) {
    console.log(error);
  }
}

export const getWeatherData = async (lat, lng) => {
  try {
    const { data } = await axios.get('https://community-open-weather-map.p.rapidapi.com/weather', {
      params: {
        lon: lng,
        lat: lat,
      },
      headers: {
        'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_TRAVEL_API_KEY
      }
    });

    return data;
  } catch (error) {
    console.log(error);
  }
}