import React from 'react'
import HomeIcon from '@material-ui/icons/Home'
import Settings from '@material-ui/icons/Settings'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import { Event, EventNote } from '@material-ui/icons'

const menuItems = [
  { icon: <HomeIcon />, text: 'NavBar.Welcome', path: '/welcome', name: 'Welcome' },
  { icon: <Settings />, text: 'NavBar.Settings', path: '/settings', name: 'Settings' },
  { icon: <AccountBoxIcon />, text: 'NavBar.MyFirstMenu', path: '/helloWorld', name: 'MyFirstMenu' },
  { icon: <Event />, text: 'NavBar.Conference', path: '/conference', name: 'Conference' },
  { icon: <EventNote />, text: 'NavBar.MyConferences', path: '/myConferences', name: 'MyConferences' }
]

export default menuItems
