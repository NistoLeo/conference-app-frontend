import attendeeStatus from 'constants/attendeeStatus'
import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Grid, Typography } from '@material-ui/core'
import Button from '@bit/totalsoft_oss.react-mui.button'

const ConferenceContent = props => {
  const { conference, onAttend, onWithdraw } = props
  const { status, startDate, endDate, type, category } = conference

  const { t } = useTranslation()

  const showJoin = status?.id === attendeeStatus.Attended
  const showWithdraw = status?.id === attendeeStatus.Attended || status?.id === attendeeStatus.Joined
  const showAttend = status?.id === attendeeStatus.Withdrawn || !status
  const noStatusSet = t('Conferences.StatusNotSet')

  const startDateFormatted = t('DATE_FORMAT', { date: { value: startDate, format: 'DD-MM-YYYY HH:mm' } })
  const endDateFormatted = t('DATE_FORMAT', { date: { value: endDate, format: 'DD-MM-YYYY HH:mm' } })
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant='subtitle1' color='error'>
          {status?.name || noStatusSet}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>{`${startDateFormatted} - ${endDateFormatted}`}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>{`${type?.name}, ${category?.name}`}</Typography>
      </Grid>
      <Grid container spacing={2}>
        <Grid container item xs={12} spacing={1} justifyContent='flex-end'>
          <Grid item>
            {showJoin && (
              <Button right color={'success'} size={'sm'}>
                {t('Conferences.Join')}
              </Button>
            )}
          </Grid>
          <Grid item>
            {showWithdraw && (
              <Button onClick={onWithdraw(conference?.id)} right color={'danger'} size={'sm'}>
                {t('Conferences.Withdraw')}
              </Button>
            )}
          </Grid>
          <Grid item>
            {showAttend && (
              <Button onClick={onAttend(conference?.id)} right color={'info'} size={'sm'}>
                {t('Conferences.Attend')}
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

ConferenceContent.propTypes = {
  conference: PropTypes.object.isRequired,
  onAttend: PropTypes.func.isRequired,
  onWithdraw: PropTypes.func.isRequired
}

export default ConferenceContent
