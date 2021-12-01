import GoogleMapReact from 'google-map-react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'

import styles, { mapStyles } from './styles'

const MapMarker = styled('div')`
  position: absolute;
  transform: translate(-50%, -50%);
  z-index: 1;

  :hover {
    z-index: 2;
  }

  & img {
    cursor: pointer;
  }
`

const Map = ({ weather, places, coordinates, setCoordinates, setBounds, setChildClicked }) => {
  const isDesktop = useMediaQuery('(min-width:600px)')

  return (
    <Box sx={styles.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: mapStyles
        }}
        onChange={(e) => {
          setCoordinates({
            lat: e.center.lat,
            lng: e.center.lng
          })
          setBounds({
            ne: e.marginBounds.ne,
            sw: e.marginBounds.sw
          })
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places?.map((place, index) => (
          <MapMarker
            key={index}
            sx={styles.markerContainer}
            lat={+place?.latitude}
            lng={+place?.longitude}
          >
            {!isDesktop ? (
              <LocationOnOutlinedIcon color='primary' fontSize='large' />
            ) : (
              <Paper elevation={3} sx={styles.paper}>
                <Typography variant='subtitle2' gutterBottom>{place?.name}</Typography>
                <img
                  src={place?.photo ? place?.photo.images?.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                  alt={place?.name}
                />
                <Rating size='small' value={+place?.rating} readOnly />
              </Paper>
            )}
          </MapMarker>
        ))}
        {weather?.list?.map((data, index) => (
          <div key={index} lat={data.coord.lat} lng={data.coord.lon}>
            <img height={100} src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="" />
          </div>
        ))}
      </GoogleMapReact>
    </Box>
  )
}

export default Map
