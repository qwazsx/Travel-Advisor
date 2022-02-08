import axios from "axios";
//api calları için bu js'i oluşturduk
// axios ile api call yapacağız

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';

export const getPlacesData = async (sw, ne) => {
  try {
    // axios olduğundan metod get olur dedi ve yukarıdaki(artık aşağıdaki :)) parametrelerden get'i çıkardık

    const { data: { data } } = await axios.get(URL, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: {
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
        'x-rapidapi-key': '71bd949779mshdef02ead95339a8p14dc1cjsn41ceb8e4ca82'
      }
    });

    return data;
  } catch (error) {
    console.log(error);
  }
}