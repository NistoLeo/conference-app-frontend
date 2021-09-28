import React, { useCallback, useState } from 'react'
import ConferenceFilters from './ConferenceFilters'
import conferences from 'utils/mocks/attendeeList'
import ConferenceList from './ConferenceList'
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text'
import { generateDefaultFilters } from 'utils/functions'

function ConferenceListContainer() {
  const { data, loading } = { data: conferences, loading: false }
  const [filters, setFilters] = useState(generateDefaultFilters())
  const handleApplyFilters = useCallback(value => setFilters(value), [])

  if (loading) {
    return <LoadingFakeText lines={10} />
  }

  return (
    // <Grid container direction="row" alignItems='center' spacing={4}>
    //     <Grid item >
    <>
      <ConferenceFilters filters={filters} onApplyFilters={handleApplyFilters}></ConferenceFilters>
      <ConferenceList conferences={data}></ConferenceList>
    </>
    //     </Grid>
    //     {/* <Grid item container /> */}
    // </Grid>
  )
}

export default ConferenceListContainer
