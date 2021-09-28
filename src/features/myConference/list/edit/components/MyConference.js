import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import IconCard from '@bit/totalsoft_oss.react-mui.icon-card'
import { Face, Info, LocationOn } from '@material-ui/icons'
import CardTitle from '@bit/totalsoft_oss.react-mui.card-title'
import AddButton from '@bit/totalsoft_oss.react-mui.add-button'
import MyConferenceInfo from './MyConferenceInfo'
import MyConferenceSpeakers from './MyConferenceSpeakers'
import MyConferenceLocation from './MyConferenceLocation'

const MyConference = props => {
  const { types, categories, countries, counties, cities, conference, dispatch } = props
  //const {conference, dispatch } = props

  const { t } = useTranslation()
  return (
    <>
      <IconCard
        icon={Info}
        title={t('Conferences.Info')}
        content={<MyConferenceInfo types={types} categories={categories} conference={conference} dispatch={dispatch} />}
      />
      <IconCard
        icon={LocationOn}
        title={t('Conferences.Location')}
        content={<MyConferenceLocation countries={countries} counties={counties} cities={cities} />}
      />
      <IconCard
        content={<MyConferenceSpeakers />}
        icon={Face}
        title={<CardTitle title={t('Conferences.Speakers')} actions={[<AddButton key='addSpeaker' title={t('Buttons.AddSpeaker')} />]} />}
      />
    </>
  )
}
MyConference.propTypes = {
  types: PropTypes.array,
  categories: PropTypes.array,
  countries: PropTypes.array,
  counties: PropTypes.array,
  cities: PropTypes.array,
  conference: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default MyConference
