import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Chip from '@mui/material/Chip'
import Rating from '@mui/material/Rating'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhoneIcon from '@mui/icons-material/Phone'

import styles from './styles'

const PlaceDetails = ({ place, selected, refProp }) => {
  if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  
  return (
    <Card>
      <CardMedia
        sx={{ height: 350 }}
        image={place?.photo ? place?.photo.images?.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
        title={place?.name}
      />
      <CardContent>
        <Typography variant='h5' gutterBottom>{place?.name}</Typography>
        <Box display='flex' justifyContent='space-between'>
        <Rating value={Number(place?.rating)} readOnly />
          <Typography variant='subtitle1' gutterBottom>out of {place?.num_reviews}</Typography>
        </Box>
        <Box display='flex' justifyContent='space-between'>
          <Typography variant='subtitle1'>Price</Typography>
          <Typography variant='subtitle1' gutterBottom>{place?.price_level}</Typography>
        </Box>
        <Box display='flex' justifyContent='space-between'>
          <Typography variant='subtitle1'>Ranking</Typography>
          <Typography variant='subtitle1' gutterBottom>{place?.ranking}</Typography>
        </Box>
        {place?.awards?.map((award, index) => (
          <Box key={index} my={1} display='flex' justifyContent='space-between' alignItems='center'>
            <img src={award?.images.small} alt={award?.display_name} />
            <Typography variant='subtitle2' color='textSecondary'>{award?.display_name}</Typography>
          </Box>
        ))}
        {place?.cuisine?.map(({ name }) => (
          <Chip key={name} size='small' label={name} sx={styles.chip} />
        ))}
        {place?.address && (
          <Typography variant='subtitle2' color='textSecondary' sx={styles.subtitle} gutterBottom>
            <LocationOnIcon /> {place?.address}
          </Typography>
        )}
        {place?.phone && (
          <Typography variant='subtitle2' color='textSecondary' sx={styles.spacing} gutterBottom>
            <PhoneIcon /> {place?.phone}
          </Typography>
        )}
        <CardActions>
          <Button
            size='small'
            color='primary'
            onClick={() => window.open(place?.web_url, '_blank')}
          >
            Trip Advisor
          </Button>
          <Button
            size='small'
            color='primary'
            onClick={() => window.open(place?.website, '_blank')}
          >
            Website
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  )
}

export default PlaceDetails
