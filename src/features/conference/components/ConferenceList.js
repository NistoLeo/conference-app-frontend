import { Grid } from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'
import ConferenceItem from './ConferenceItem'

const ConferenceList = props => {
  const { conferences, onAttend } = props

  return (
    <Grid container spacing={2}>
      {conferences.map(conference => (
        <Grid item spacing={2} xs={6} key={conference.id}>
          <ConferenceItem conference={conference} key={conference.id} onAttend={onAttend} />
        </Grid>
      ))}
    </Grid>
  )
}

ConferenceList.propTypes = {
  conferences: PropTypes.array,
  onAttend: PropTypes.func.isRequired
}

export default ConferenceList
