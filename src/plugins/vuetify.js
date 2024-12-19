// src/plugins/vuetify.js
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import { VListItemGroup, VListItem, VListItemContent, VListItemTitle } from 'vuetify/components';


const vuetify = createVuetify({
  components: {
    VListItemGroup,
    VListItem,
    VListItemContent,
    VListItemTitle,
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#90CAF9',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
          addnew: '#4CAF50',
          search: '#2196F3',
          logout: '#1B5E20',
        },
      },
      dark: {
        colors: {
          primary: '#1976D2',
          secondary: '#1E1E1E',
          accent: '#FF4081',
          error: '#D50000',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
          addnew: '#D32F2F',
          search: '#0D47A1',
          logout: 'rgba(170, 30, 41, 0.8)',
        },
      },
    },
  },
})

export default vuetify