import { filter, Flex } from '@chakra-ui/react'
import Header from '../components/Header'
import List from '../components/List'
import Map from '../components/Map'
import script from 'next/script'
import PlaceDetail from '../components/PlaceDetail'
import { useEffect, useState } from 'react'
import { getPlacesData } from './api'
import Head from "next/head";
const Home = () => {
  const [places, setplaces] = useState([])
  const [bounds, setBounds] = useState(null)
  const [coordinates, setcoordinates] = useState([])
  const [type, settype] = useState('restaurants')
  const [ratings, setratings] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const [filteredPlaces, setfilteredPlaces] = useState([])
  useEffect(() => {
    //Current Location

    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      console.log({ latitude, longitude })
      setcoordinates({ lat: latitude, lng: longitude })
    })
  }, [])
  useEffect(() => {
    const filteredData = places.filter((place) => place.rating > ratings);
    setfilteredPlaces(filteredData);
  }, [ratings])

  useEffect(() => {
    setIsLoading(true)

    getPlacesData(type, bounds?.sw, bounds?.ne).then((data) => {
      setplaces(data);
      setIsLoading(false);

    });
  }, [type, coordinates, bounds])

  return <Flex
    justifyContent={'center'}
    alignItems={'center'}
    width={'100vw'}
    height={'100vh'}
    maxWidth={'100vw'}
    maxHeight={'100vh'}
    position={'relative'}
  >
    <Head>
      <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAH7aCCqnZzcjtZUTddtKor6yybHTlT8ks"></script>
    </Head>
    <Header
      settype={settype}
      setratings={setratings}
      setcoordinates={setcoordinates}
    />

    <List places={filteredPlaces.length ? filteredPlaces : places} isLoading={isLoading} />

    <Map
      setcoordinates={setcoordinates}
      coordinates={coordinates}
      setBounds={setBounds}
      places={filteredPlaces.length ? filteredPlaces : places}
    />

  </Flex>
}
export default Home;