import React, { useCallback, useState } from 'react'
import { Typography, Grid, InputAdornment, IconButton } from '@material-ui/core'
//import { useToast } from '@bit/totalsoft_oss.react-mui.kit.core'
import { useTranslation } from 'react-i18next'
import CustomTextField from '@bit/totalsoft_oss.react-mui.custom-text-field'
import KeyboardReturn from '@material-ui/icons/KeyboardReturn'
import { emptyString } from 'utils/constants'
import { useEmail } from 'hooks/useEmail'
import { validateEmail } from 'utils/functions'

function Welcome() {
  //const addToast = useToast()
  const { t } = useTranslation()
  //const [textFieldValue, setTextFieldValue] = useState(emptyString)
  const handleTextFieldValueChange = useCallback(event => setTextFieldValue(event.target.value), [])
  const [email, setEmail] = useEmail()
  const [textFieldValue, setTextFieldValue] = useState(email)
  // The handler for button click
  const handleButtonClick = useCallback(() => {
    const isEmailValid = validateEmail(textFieldValue)
    setEmail(isEmailValid ? textFieldValue : emptyString)
    setIsValid(isEmailValid)
  }, [setEmail, textFieldValue])
  const [isValid, setIsValid] = useState(true)
  // the handler for key down
  const handleKeyDown = useCallback(
    event => {
      if (event.keyCode === 13) {
        handleButtonClick()
      }
    },
    [handleButtonClick]
  )
  //addToast('This is my toast yay', 'success')

  return (
    <Grid container direction='column' alignItems='center' spacing={4}>
      <Grid item>
        <Typography variant='h3'>{t('LandingPage.Title')}</Typography>
      </Grid>

      <Grid container direction='column' alignItems='center' spacing={1} item xs={12}>
        <Grid item xs={6}>
          <Typography variant='h5'>{t('LandingPage.Subtitle')}</Typography>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            id='filled-basic'
            label='name@example.com'
            fullWidth
            variant='filled'
            endAdornment={
              <InputAdornment position='end'>
                <IconButton>
                  <KeyboardReturn fontSize='small' />
                </IconButton>
              </InputAdornment>
            }
            onKeyDown={handleKeyDown}
            debounceBy={0}
            value={textFieldValue}
            onChange={handleTextFieldValueChange}
            helperText={!isValid && t('LandingPage.BadEmail')}
            error={!isValid}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Welcome
