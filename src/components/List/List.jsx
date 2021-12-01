import { useState, useEffect, createRef } from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import PlaceDetails from '../PlaceDetails/PlaceDetails'
import styles from './styles'

const List = ({ isLoading, places, childClicked, type, setType, rating, setRating }) => {
  const [elRefs, setElRefs] = useState([])

  useEffect(() => {
    setElRefs(Array(places.length).fill().map(() => createRef()))
  }, [places])

  return (
    <Box sx={styles.container}>
      <Typography variant='h4'>Restaurants, Hotels & Attractions around you</Typography>
      {isLoading ? (
        <Box sx={styles.loading}>
          <CircularProgress size='5rem' />
        </Box>
      ) : (
        <>
          <FormControl sx={styles.formControl}>
            <InputLabel id='type'>Type</InputLabel>
            <Select
              labelId='type'
              label='Type'
              value={type}
              onChange={e => setType(e.target.value)}
            >
              <MenuItem value='restaurants'>Restaurants</MenuItem>
              <MenuItem value='hotels'>Hotels</MenuItem>
              <MenuItem value='attractions'>Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={styles.formControl}>
            <InputLabel id='rating'>Rating</InputLabel>
            <Select
              labelId='rating'
              label='Rating'
              value={rating}
              onChange={e => setRating(e.target.value)}
            >
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5 </MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} sx={styles.list}>
            {places?.map((place, index) => (
              <Grid ref={elRefs[index]} item key={index} xs={12}>
                <PlaceDetails
                  place={place}
                  selected={+childClicked === index}
                  refProp={elRefs[index]}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  )
}

export default List
