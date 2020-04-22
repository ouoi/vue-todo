export const dateDiff = (date1, date2) => {
  let _date1 = date1 instanceof Date ? date1 : new Date(date1)
  let _date2 = date2 instanceof Date ? date2 : new Date(date2)

  _date1 = new Date(_date1.getFullYear(), _date1.getMonth() + 1, _date1.getDate())
  _date2 = new Date(_date2.getFullYear(), _date2.getMonth() + 1, _date2.getDate())

  var diff = _date2.getTime() - _date1.getTime()
  return Math.ceil(diff / (24 * 60 * 60 * 1000))
}
