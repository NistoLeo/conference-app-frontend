import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
//import { QueueMusicRounded } from '@material-ui/icons'
import { Grid, Typography } from '@material-ui/core'
import qrCode from 'assets/img/qrCode.png'

const ConferenceCodeModal = ({ code }) => {
  const { t } = useTranslation()
  return (
    <Grid container justifyContent='center'>
      <Grid item>
        <img src={qrCode} style={{ maxHeight: '400px' }} alt='QR' />
      </Grid>
      <Grid item>
        <Typography> {t('Conferences.QRCodeMessage', { code })}</Typography>
      </Grid>
    </Grid>
  )
}
ConferenceCodeModal.propTypes = {
  code: PropTypes.string.isRequired
}

export default ConferenceCodeModal
