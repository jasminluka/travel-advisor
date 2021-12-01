import { useState } from 'react'
import { Autocomplete } from '@react-google-maps/api'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'
import Box from '@mui/material/Box'
import SearchIcon from '@mui/icons-material/Search'

import styles from './styles'

const Header = ({ setCoordinates }) => {
  const [autocomplete, setAutocomplete] = useState(null)

  const onLoad = (autoComplete) => setAutocomplete(autoComplete)

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat()
    const lng = autocomplete.getPlace().geometry.location.lng()

    setCoordinates({ lat, lng })
  }
  
  return (
    <AppBar position='static'>
      <Toolbar sx={styles.toolbar}>
        <Typography variant='h5' sx={styles.title}>
          Travel Advisor
        </Typography>
        <Box display='flex' alignItems='center'>
          <Typography variant='h6' sx={styles.title}>
            Explore new places
          </Typography>
          <Autocomplete
            onLoad={onLoad}
            onPlaceChanged={onPlaceChanged}
          >
            <Box sx={styles.search}>
              <Box sx={styles.searchIcon}>
                <SearchIcon />
              </Box>
              <InputBase
                sx={styles.inputBase}
                placeholder='Search....'
              />
            </Box>
          </Autocomplete>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
