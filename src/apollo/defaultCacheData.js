// Here you define the default values for local apollo state (@client only values)
// https://www.apollographql.com/docs/react/local-state/local-state-management/

import { emailKey } from './cacheKeyFunctions'

const emailValue = { email: 'admin23@totalsoft.ro' }

export const defaults = {
  [emailKey]: emailValue
}
