//Moment js variables

var x = moment()
var date = moment().format('MMMM Do YYYY')
  
// Display current date on top of scheduler

function todaysDate() {
     document.getElementById("currentDay").innerHTML = date
}
todaysDate()