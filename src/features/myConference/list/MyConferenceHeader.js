import React from 'react'
import PropTypes from 'prop-types'
import { Grid, makeStyles } from '@material-ui/core'

import { emptyString } from 'utils/constants'
import Typography from '@bit/totalsoft_oss.react-mui.typography'

const useStyles = makeStyles(theme => ({ title: { ...theme.header.title, width: '100%' } }))

const MyConferenceHeader = props => {
  const { title, actions } = props
  const classes = useStyles()

  return (
    <Grid container justify='flex-start' alignItems='center'>
      <Grid
        item
        xs={6}
        sm={9}
        lg={9}
        container
        justify='flex-sta
            rt'
      >
        <Typography variant='subtitle1' className={classes.title}>
          {title || emptyString}
        </Typography>
      </Grid>
      <Grid item xs={3} sm={3} lg={3} container justify='flex-end' spacing={1}>
        {actions}
      </Grid>
    </Grid>
  )
}

MyConferenceHeader.propTypes = {
  title: PropTypes.string,
  actions: PropTypes.node
}

export default MyConferenceHeader
