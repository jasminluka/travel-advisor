import { useState, useEffect } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'

import Header from './components/Header/Header'
import List from './components/List/List'
import Map from './components/Map/Map'
import { getWeatherData, getPlacesData } from './api'

const App = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [weather, setWeather] = useState([])
  const [places, setPlaces] = useState([])
  const [filteredPlaces, setFilteredPlaces] = useState([])
  const [coordinates, setCoordinates] = useState({})
  const [bounds, setBounds] = useState({})
  const [childClicked, setChildClicked] = useState(null)
  const [type, setType] = useState('restaurants')
  const [rating, setRating] = useState(0)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({
        lat: latitude,
        lng: longitude
      })
    })
  }, [])

  useEffect(() => {
    const filteredPlaces = places?.filter((place) => place?.rating > rating)

    setFilteredPlaces(filteredPlaces)
  }, [places, rating])

  useEffect(() => {
    if (bounds.ne && bounds.sw) {
      (async () => {
        const weather = await getWeatherData(coordinates)
        setWeather(weather)
      })()
    }
  }, [coordinates, bounds])

  useEffect(() => {
    if (bounds.ne && bounds.sw) {
      (async () => {
        setIsLoading(true)
        const places = await getPlacesData({ type, ...bounds })
        setPlaces(places?.filter((place) => place.name && place.num_reviews > 0))
        setFilteredPlaces([])
        setIsLoading(false)
      })()
    }
  }, [type, bounds])

  return (
    <>
      <CssBaseline />
      <Header {...{ setCoordinates }} />
      <Grid container spacing={3} sx={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List {...{
            isLoading,
            places: filteredPlaces?.length ? filteredPlaces : places,
            childClicked,
            type,
            setType,
            rating,
            setRating
          }} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map {...{
            weather,
            places: filteredPlaces?.length ? filteredPlaces : places,
            coordinates,
            setCoordinates,
            setBounds,
            setChildClicked
          }} />
        </Grid>
      </Grid>
    </>
  )
}

export default App
