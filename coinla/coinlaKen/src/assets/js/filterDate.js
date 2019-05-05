import Vue from 'vue'

function filterDate (value) {
  let date = new Date(value)
  let month = date.getMonth()
  let day = date.getDate()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let val = `${month}-${day} ${hour}:${minute}`
  return val
}
Vue.filter('filterDate', filterDate)

