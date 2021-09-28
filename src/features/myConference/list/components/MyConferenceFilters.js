import IconCard from '@bit/totalsoft_oss.react-mui.icon-card'
import { Grid } from '@material-ui/core'
import React, { Fragment, useCallback, useState } from 'react'
import SearchIcon from '@material-ui/icons/Search'
import { useTranslation } from 'react-i18next'
import Button from '@bit/totalsoft_oss.react-mui.button'
import DateTime from '@bit/totalsoft_oss.react-mui.date-time'
import PropTypes from 'prop-types'
import { generateDefaultFilters } from 'utils/functions'

const MyConferenceFilters = props => {
  const { filters, onApplyFilters } = props
  const [startDate, setStartDate] = useState(filters.startDate)
  const [endDate, setEndDate] = useState(filters.endDate)

  const handleApplyButton = useCallback(() => onApplyFilters({ startDate, endDate }), [onApplyFilters, endDate, startDate])
  const handleResetButton = useCallback(() => {
    const defaultFilters = generateDefaultFilters()
    setStartDate(defaultFilters.startDate)
    setEndDate(defaultFilters.endDate)
  }, [])
  const handleKeyPressed = useCallback(({ keyCode }) => keyCode === 13 && handleApplyButton(), [handleApplyButton])
  const { t } = useTranslation()

  return (
    <IconCard
      icon={SearchIcon}
      iconColor='theme'
      content={
        <Fragment>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={3}>
              <DateTime label={t('Conferences.Filters.StartDate')} clearable value={startDate} onChange={setStartDate} />
            </Grid>
            <Grid item xs={12} lg={3}>
              <DateTime label={t('Conferences.Filters.EndDate')} clearable value={endDate} onChange={setEndDate} />
            </Grid>
            <Grid item xs={12} lg={5} spacing={5}>
              <Button size={'md'} color={'primary'} right={true} onClick={handleResetButton}>
                {t('Buttons.ResetFilters')}
              </Button>
              <Button size={'md'} color={'primary'} right={true} onClick={(handleApplyButton, handleKeyPressed)}>
                {t('Buttons.ApplyFilters')}
              </Button>
            </Grid>
          </Grid>
        </Fragment>
      }
    />
  )
}
MyConferenceFilters.propTypes = {
  filters: PropTypes.object,
  onApplyFilters: PropTypes.func
}

export default MyConferenceFilters
