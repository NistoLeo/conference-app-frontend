import React, { useCallback, useEffect, useState } from 'react'
import MyConferenceFilters from 'features/myConference/list/components/MyConferenceFilters'
//import conferences from 'utils/mocks/attendeeList'

import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text'
import { extractPager, generateDefaultFilters } from 'utils/functions'
import { useFooter, useHeader } from 'providers/AreasProvider'

import { useTranslation } from 'react-i18next'
import { AddButton } from '@bit/totalsoft_oss.react-mui.kit.core'
import { useHistory } from 'react-router'
import { useQueryWithErrorHandling } from 'hooks/errorHandling'
import { CONFERENCE_LIST_QUERY } from 'features/conference/gql/queries/ConferenceListQuery'
import { useEmail } from 'hooks/useEmail'
import Pagination from '@bit/totalsoft_oss.react-mui.pagination'
import MyConferenceHeader from '../edit/components/MyConferenceHeader'
import MyConferenceList from './MyConferenceList'

function MyConferenceListContainer() {
  const [filters, setFilters] = useState(generateDefaultFilters())
  const [pager, setPager] = useState({ totalCount: 25, page: 0, pageSize: 3 })
  const [, setHeader] = useHeader()

  const { t } = useTranslation()
  const history = useHistory()
  const [email] = useEmail()
  const [, setFooter] = useFooter()

  const { data, loading, refetch } = useQueryWithErrorHandling(CONFERENCE_LIST_QUERY, {
    variables: {
      pager: extractPager(pager),
      filters: { ...filters, organizerEmail: email },
      email
    }
  })

  const handleAddClick = useCallback(() => {
    history.push('myConferences/new')
  }, [history])

  useEffect(() => {
    return () => {
      setHeader(null), setFooter(null)
    }
  }, [setFooter, setHeader])

  useEffect(() => {
    setHeader(
      <MyConferenceHeader
        title={t('NavBar.MyConferences')}
        actions={<AddButton key='addButton' title={t('Buttons.AddConference')} onClick={handleAddClick} />}
      />
    )
  }, [handleAddClick, setHeader, t])

  const handleRowsPerPageChange = useCallback(pageSize => {
    setPager(state => ({ ...state, pageSize: parseInt(pageSize) }))
  }, [])

  const handlePageChange = useCallback(page => setPager(state => ({ ...state, page })), [])

  useEffect(() => {
    setFooter(
      <Pagination
        totalCount={pager.totalCount}
        page={pager.page}
        pageSize={pager.pageSize}
        rowsPerPageOptions={[3, 6, 12, 24, 100]}
        onRowsPerPageChange={handleRowsPerPageChange}
        onPageChange={handlePageChange}
        onRefresh={refetch}
      />
    )
  }, [handlePageChange, handleRowsPerPageChange, pager, setFooter, refetch])

  const handleApplyFilters = useCallback(value => {
    setFilters(value)
  }, [])

  if (loading || !data) {
    return <LoadingFakeText lines={10} />
  }

  return (
    <>
      <MyConferenceFilters filters={filters} onApplyFilters={handleApplyFilters} />
      <MyConferenceList conferences={data?.conferenceList?.values} />
    </>
  )
}
export default MyConferenceListContainer
