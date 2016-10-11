mydate = new Date
year = mydate.getYear()
if year < 1000
  year += 1900
day = mydate.getDay()
month = mydate.getMonth()
daym = mydate.getDate()
if daym < 10
  daym = '0' + daym
montharray = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December')
document.write '' + daym + ' ' + montharray[month] + ' ' + year + ''
