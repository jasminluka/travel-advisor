import { alpha } from '@mui/material/styles'

const styles = {
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    display: {
      xs: 'none',
      md: 'block',
    }
  },
  search: {
    position: 'relative',
    width: {
      xs: '100%',
      sm: 'auto',
    },
    ml: {
      xs: 0,
      sm: 3,
    },
    mr: 2,
    bgcolor: theme => alpha(theme.palette.common.white, 0.15),
    borderRadius: 1,

    ':hover': {
      bgcolor: theme => alpha(theme.palette.common.white, 0.25),
    },
  },
  searchIcon: {
    height: '100%',
    py: 0,
    px: 2,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  },
  inputBase: {
    root: {
      color: 'inherit',
    },
    input: {
      width: {
        xs: '100%',
        md: '20ch',
      },
      pt: 1,
      pr: 1,
      pb: 1,
      pl: theme => `calc(1em + ${theme.spacing(4)})`,
      transition: theme => theme.transitions.create('width'),
    },
  },
}

export default styles
