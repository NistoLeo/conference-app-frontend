import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import PermIdentityIcon from '@material-ui/icons/PermIdentity'
import { Grid, Typography } from '@material-ui/core'
import RoomIcon from '@material-ui/icons/Room'

const MyConferenceSubtitle = props => {
  const { speaker, location } = props
  const { t } = useTranslation()

  return (
    <Grid container item lg={12}>
      <Grid item xs={1}>
        <PermIdentityIcon />
      </Grid>
      <Grid item lg={11}>
        <Typography variant='h5'>
          {t('Conferences.Speakers')} {speaker?.name}
        </Typography>
      </Grid>
      <Grid item lg={1}>
        <RoomIcon />
      </Grid>
      <Grid item lg={11}>
        <Typography> {`${location?.city?.name}, ${location?.county?.name}, ${location?.country?.name}`}</Typography>
      </Grid>
    </Grid>
  )
}
MyConferenceSubtitle.propTypes = {
  speaker: PropTypes.object,
  location: PropTypes.object.isRequired
}
export default MyConferenceSubtitle
