import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import CustomTextField from '@bit/totalsoft_oss.react-mui.custom-text-field'
import DateTime from '@bit/totalsoft_oss.react-mui.date-time'
import Autocomplete from '@bit/totalsoft_oss.react-mui.autocomplete'

import { onTextBoxChange } from 'utils/propertyChangeAdapters'
const MyConferenceInfo = props => {
  const { types, categories, conference, dispatch } = props

  const { t } = useTranslation()
  const { name, startDate, endDate, type, category } = conference

  const handleDispatch = actionType => value => dispatch({ type: actionType, payload: value })

  return (
    <Grid container spacing={3}>
      <Grid item container lg={9} spacing={3}>
        <Grid item xs={12} sm={6} lg={4}>
          <CustomTextField label={t('Conferences.Name')} fullWidth value={name} onChange={onTextBoxChange(handleDispatch('name'))} />
        </Grid>
      </Grid>
      <Grid item container lg={12} spacing={3}>
        <Grid item xs={12} sm={6} lg={3}>
          <DateTime label={t('Conferences.StartDate')} showTime={true} value={startDate} onChange={handleDispatch('startDate')} />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <DateTime label={t('Conferences.EndDate')} showTime={true} value={endDate} onChange={handleDispatch('endDate')} />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Autocomplete
            label={t('Conferences.Type')}
            createdLabel='Conferences.Type'
            fullWidth
            isClearable
            options={types}
            value={type}
            onChange={handleDispatch('type')}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Autocomplete
            label={t('Conferences.Category')}
            createdLabel='Conferences.Category'
            fullWidth
            isClearable
            options={categories}
            value={category}
            onChange={handleDispatch('category')}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

MyConferenceInfo.propTypes = {
  types: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  conference: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default MyConferenceInfo
