import React, { Fragment, useCallback, useEffect, useState } from 'react'
import SearchIcon from '@material-ui/icons/Search'
import { Grid } from '@material-ui/core'
import DateTime from '@bit/totalsoft_oss.react-mui.date-time'
import Button from '@bit/totalsoft_oss.react-mui.button'
import IconCard from '@bit/totalsoft_oss.react-mui.icon-card'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { generateDefaultFilters } from 'utils/functions'

function ConferenceFilters(props) {
  const { filters, onApplyFilters } = props
  const [startDate, setStartDate] = useState(filters?.startDate)
  const [endDate, setEndDate] = useState(filters?.endDate)
  const { t } = useTranslation()
  const handleApplyClick = useCallback(() => onApplyFilters({ startDate, endDate }), [endDate, onApplyFilters, startDate])
  const handleResetClick = useCallback(() => onApplyFilters(generateDefaultFilters()), [onApplyFilters])
  const handleKeyPressed = useCallback(event => event.keyCode === 13 && handleApplyClick(), [handleApplyClick])

  useEffect(() => {
    setStartDate(filters?.startDate)
    setEndDate(filters?.endDate)
  }, [filters])

  return (
    <>
      <IconCard
        icon={SearchIcon}
        iconColor='theme'
        content={
          <Fragment>
            <Grid container spacing={2} onKeyDown={handleKeyPressed}>
              <Grid item xs={12} lg={3}>
                <DateTime label={t('Conferences.Filters.StartDate')} clearable value={startDate} onChange={setStartDate} />
              </Grid>
              <Grid item xs={12} lg={3}>
                <DateTime label={t('Conferences.Filters.EndDate')} clearable value={endDate} onChange={setEndDate} />
              </Grid>
              <Grid item xs={12} lg={5} spacing={5}>
                <Button size={'md'} color={'primary'} right={true} onClick={handleResetClick}>
                  {t('Buttons.ResetFilters')}
                </Button>
                <Button size={'md'} color={'primary'} right={true} onClick={handleApplyClick}>
                  {t('Buttons.ApplyFilters')}
                </Button>
              </Grid>
            </Grid>
          </Fragment>
        }
      />
    </>
  )
}
ConferenceFilters.propTypes = {
  filters: PropTypes.object,
  onApplyFilters: PropTypes.func
}

export default ConferenceFilters
