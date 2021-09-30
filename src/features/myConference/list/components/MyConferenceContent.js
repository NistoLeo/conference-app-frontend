import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Grid, Typography } from '@material-ui/core'
import Button from '@bit/totalsoft_oss.react-mui.button'
import { useHistory } from 'react-router'

const MyConferenceContent = props => {
  const { conference } = props
  const { startDate, endDate, type, category, id } = conference
  const { t } = useTranslation()
  const history = useHistory()

  const handleEditClick = useCallback(() => history.push(`/myConferences/${id}`), [history, id])

  const startDateFormatted = t('DATE_FORMAT', { date: { value: startDate, format: 'DD-MM-YYYY HH:mm' } })
  const endDateFormatted = t('DATE_FORMAT', { date: { value: endDate, format: 'DD-MM-YYYY HH:mm' } })

  return (
    <Grid container item lg={12}>
      <Grid item xs={12}>
        <Typography>{`${startDateFormatted} - ${endDateFormatted}`}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>{`${type?.name}, ${category?.name}`}</Typography>
      </Grid>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          {
            <Button right color='danger' size={'sm'}>
              {t('MyConferences.Delete')}
            </Button>
          }
          {
            <Button right color='info' size={'sm'} onClick={handleEditClick}>
              {t('MyConferences.Edit')}
            </Button>
          }
        </Grid>
      </Grid>
    </Grid>
  )
}

MyConferenceContent.propTypes = {
  conference: PropTypes.object.isRequired
}

export default MyConferenceContent
