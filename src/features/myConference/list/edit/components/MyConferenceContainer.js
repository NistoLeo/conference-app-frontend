import SaveButton from '@bit/totalsoft_oss.react-mui.save-button'
//import MyConferenceHeader from "features/myConference/list/components/MyConferenceHeader";

import { useHeader } from 'providers/AreasProvider'
import React, { useEffect, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text/dist/LoadingFakeText'
import { categories, cities, counties, countries, types } from 'utils/mocks/autoComplete'
import MyConference from './MyConference'
import { initialConference, reducer } from '../conferenceState'
import { conference as mockConference } from 'utils/mocks/myConference'
import { useRouteMatch } from 'react-router'
import MyConferenceHeader from './MyConferenceHeader'

const MyConferenceContainer = () => {
  const [, setHeader] = useHeader()
  const { t } = useTranslation()
  const [conference, dispatch] = useReducer(reducer, initialConference)
  const match = useRouteMatch()

  const conferenceId = match.params.id
  const isNew = conferenceId === 'new'

  useEffect(() => {
    if (!isNew) {
      dispatch({ type: 'resetConference', payload: mockConference })
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => setHeader(null), []) // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    setHeader(<MyConferenceHeader title={conference.name} actions={<SaveButton title={t('Buttons.Save')} />} />)
  }, [conference.name, setHeader, t])

  const { data, loading } = {
    loading: false,
    data: {
      typeList: types,
      categoryList: categories,
      countryList: countries,
      countyList: counties,
      cityList: cities
    }
  }
  if (loading) return <LoadingFakeText line={10} />
  return (
    <MyConference
      conference={conference}
      dispatch={dispatch}
      types={data?.typeList}
      categories={data?.categoryList}
      countries={data?.countryList}
      counties={data?.countyList}
      cities={data?.cityList}
    />
  )
}

export default MyConferenceContainer
