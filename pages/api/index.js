import axios from "axios"

export const getPlacesData = async (type,sw, ne) => {
  try {
    const {
      data: { data },
    } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: {
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
        'X-RapidAPI-Key': '65c624f1c7msh721e524031b4371p19f0cfjsnf5557b81837e'
      },

    });
    console.log(data)
    return data;
  } catch (error) {
    console.log('Fetch Data Error :${error}')
  }
}
