let searchInp = document.getElementById("search")
let todayDay = document.getElementById("day")
let todayDate = document.getElementById("date")
let todayImg = document.getElementById("img-today")
let todayTemp = document.getElementById("temp-today")
let todayLoc = document.getElementById("loc-today")
let todayText = document.getElementById("text-today")
// ===============================
let nextDay = document.getElementsByClassName("day-next")
let nextImg = document.getElementsByClassName("img-next")
let nextTemp = document.getElementsByClassName("temp-next")
let nextTempAvg = document.getElementsByClassName("temp-avg")
let nextText = document.getElementsByClassName("text-next")
// ================================
async function getData(cityName){
   let responses = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=2c02bb1f6d874cdfb5a131033242306&q=${cityName}&days=3`)
   let data = await responses.json() 
   return data

}


function displayData(data){
   todayDay.innerHTML=new Date().toLocaleDateString("en-us",{weekday:"long"})
   todayDate.innerHTML=new Date().getDate()+new Date().toLocaleDateString("en-us",{month:"long"})
   todayImg.setAttribute("src","https:"+data.current.condition.icon)
   todayTemp.innerHTML=data.current.temp_c+"°C"
   todayLoc.innerHTML=data.location.name
   todayText.innerHTML=data.current.condition.text
}

function displayNextData(data){
   for(let i =0 ; i < 2 ; i++)
      {
         nextDay[i].innerHTML=new Date(data.forecast.forecastday[i+1].date).toLocaleDateString("en-us",{weekday:"long"})
         nextImg[i].setAttribute("src" ,"https:"+data.forecast.forecastday[i+1].day.condition.icon)
         nextTemp[i].innerHTML=data.forecast.forecastday[i+1].day.maxtemp_c+"°C"
         nextTempAvg[i].innerHTML=data.forecast.forecastday[i+1].day.mintemp_c+"°C"
         nextText[i].innerHTML=data.forecast.forecastday[i+1].day.condition.text
      }
}



async function startApp(city="cairo"){
   let data = await getData(city)
   displayData(data)
   displayNextData(data)
}
startApp()

searchInp.addEventListener("input" , function(){
   startApp(searchInp.value)
} )