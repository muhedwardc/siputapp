import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

import {VToolbar, VToolbarSideIcon, VToolbarTitle, VToolbarItems} from 'vuetify/es5/components/VToolbar'
import {VContainer, VContent, VFlex, VLayout, VSpacer} from 'vuetify/es5/components/VGrid'
import {VList, VListGroup, VListTile, VListTileAction, VListTileActionText, VListTileAvatar, VListTileContent, VListTileSubTitle, VListTileTitle} from 'vuetify/es5/components/VList'
import {VDatePicker, VDatePickerTitle, VDatePickerHeader, VDatePickerDateTable, VDatePickerMonthTable, VDatePickerYears} from 'vuetify/es5/components/VDatePicker'
import {VTimePicker, VTimePickerClock, VTimePickerTitle} from 'vuetify/es5/components/VTimePicker'

import VNavigationDrawer from 'vuetify/es5/components/VNavigationDrawer/VNavigationDrawer'
import VTextField from 'vuetify/es5/components/VTextField/VTextField'
import VBtn from 'vuetify/es5/components/VBtn/VBtn'
import VIcon from 'vuetify/es5/components/VIcon/VIcon'
import VSnackbar from 'vuetify/es5/components/VSnackbar/VSnackbar'
import VCheckbox from 'vuetify/es5/components/VCheckbox/VCheckbox'
import VAvatar from 'vuetify/es5/components/VAvatar/VAvatar'
import VTextarea from 'vuetify/es5/components/VTextarea/VTextarea'
import VTabs from 'vuetify/es5/components/VTabs/VTabs'
import VProgressCircular from 'vuetify/es5/components/VProgressCircular/VProgressCircular'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#1996F5'
  },
  components: {
    VToolbar, VToolbarSideIcon, VToolbarTitle, VToolbarItems,
    VContainer, VContent, VFlex, VLayout, VSpacer,
    VList, VListGroup, VListTile, VListTileAction, VListTileActionText, VListTileAvatar, VListTileContent, VListTileSubTitle, VListTileTitle,
    VDatePicker, VDatePickerTitle, VDatePickerHeader, VDatePickerDateTable, VDatePickerMonthTable, VDatePickerYears,
    VTimePicker, VTimePickerClock, VTimePickerTitle,
    VNavigationDrawer, VTextField, VBtn, VIcon, VSnackbar, VCheckbox, VAvatar,
    VTextarea,
    VTabs,
    VProgressCircular,
  }
})
