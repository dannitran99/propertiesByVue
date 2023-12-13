import moment from 'moment'
moment.locale('vi')

export const formatCurrency = (input) => {
  let formatter = Intl.NumberFormat('vi', { notation: 'compact',
    compactDisplay: 'long'
  })
  return formatter.format(input)
}

export const formatTimeHumanize = (input) => {
  return moment(input).fromNow()
}

export const formatTimeCalendar = (input) => {
  return moment(input).calendar(null, {
    lastDay: '[hôm qua]',
    sameDay: '[hôm nay]',
    nextDay: '[ngày mai]',
    lastWeek: 'dddd [tuần trước]',
    nextWeek: 'dddd',
    sameElse: '[vào] L'
  })
}

export const formatDateTime = (input) => {
  return moment(input).format('DD/MM/YYYY HH:mm')
}
