import SaveButton from '@bit/totalsoft_oss.react-mui.save-button'
//import MyConferenceHeader from "features/myConference/list/components/MyConferenceHeader";

import { useHeader } from 'providers/AreasProvider'
import React, { useCallback, useEffect, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text/dist/LoadingFakeText'
//import { categories, cities, counties, countries, types } from 'utils/mocks/autoComplete'
import MyConference from './MyConference'
import { initialConference, reducer } from '../conferenceState'
import { useRouteMatch } from 'react-router'
import MyConferenceHeader from './MyConferenceHeader'
import { useQueryWithErrorHandling } from 'hooks/errorHandling'
import { CONFERENCE_QUERY } from '../gql/queries/conferenceQuery'
import { UPDATE_CONFERENCE } from 'features/conference/gql/mutations/UpdateConference'
//import { DICTIONARY_QUERY } from '../gql/queries/DictionaryQuery'
import { useToast } from '@bit/totalsoft_oss.react-mui.kit.core'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { useError } from 'hooks/errorHandling'
import { useEmail } from 'hooks/useEmail'

const MyConferenceContainer = () => {
  const [, setHeader] = useHeader()
  const { t } = useTranslation()
  const [conference, dispatch] = useReducer(reducer, initialConference)
  const match = useRouteMatch()
  const addToast = useToast()
  const showError = useError()
  const conferenceId = match.params.id
  const isNew = conferenceId === 'new'
  const [email] = useEmail()
  const history = useHistory()

  const { data, loading: loadingConference } = useQueryWithErrorHandling(CONFERENCE_QUERY, {
    variables: { id: conferenceId, isNew },
    onCompleted: result => result?.conference && dispatch({ type: 'resetConference', payload: result.conference })
  })

  const [updateConference, { loading: saving }] = useMutation(UPDATE_CONFERENCE, {
    onCompleted: result => {
      addToast(t('Conferences.SuccessfullySaved'), 'success')
      if (isNew) {
        history.push(`/MyConferences/${result?.saveConference?.id}`)
      }
      result?.saveConference && dispatch({ type: 'resetConference', payload: result?.saveConference })
    },
    onError: showError
  })

  const handleSave = useCallback(() => {
    const { id, name, startDate, endDate, location, deletedSpeakers, type, category, speakers } = conference
    const { city, county, country, ...locationData } = location

    const input = {
      id,
      name,
      startDate,
      endDate,
      organizerEmail: email,
      deletedSpeakers,
      type,
      category,
      location: {
        ...locationData,
        cityId: city?.id,
        countyId: county?.id,
        countryId: country?.id
      },
      speakers
    }
    updateConference({ variables: { input } })
  }, [conference, email, updateConference])

  useEffect(() => () => setHeader(null), []) // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    setHeader(<MyConferenceHeader title={conference.name} actions={<SaveButton title={t('Buttons.Save')} onClick={handleSave} />} />)
  }, [conference.name, handleSave, setHeader, t])

  // const { data, loading } = useQueryWithErrorHandling(DICTIONARY_QUERY)

  if (loadingConference || saving) return <LoadingFakeText line={10} />

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
