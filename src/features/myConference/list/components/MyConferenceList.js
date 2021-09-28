import { Grid } from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'
import ConferenceItem from './MyConferenceItem'

const MyConferenceList = props => {
  const { conferences } = props

  return (
    <Grid container spacing={2}>
      {conferences.map(conference => (
        <Grid item spacing={2} key={conference.id} xs={6}>
          <ConferenceItem conference={conference} key={conference.id} />
        </Grid>
      ))}
    </Grid>
  )
}

MyConferenceList.propTypes = {
  conferences: PropTypes.array
}

export default MyConferenceList
