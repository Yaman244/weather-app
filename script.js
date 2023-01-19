let buttonForLocation = document.getElementById('location');

buttonForLocation.addEventListener('click', () => {
    loading(false)
    //geolocation success and error 
    let success = (position) => {
        let x = position.coords.latitude
        let y = position.coords.longitude
        getWEather(x, y);
    }
    let errr = () => {
        document.getElementById('notification').innerHTML = `<div> can't get your geolocation. try to use VPN</div>`;
        loading(true);
    }


    let position = navigator.geolocation.getCurrentPosition(success,errr);
    

    setTimeout(() => {
        document.getElementById('notification').innerHTML = ``;
    }, 8000 )


})



//get the weather
async function getWEather (latitude , longitude) {
    let fetchWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=15618ec3bfd91bffd509d645515bd453`)
    .then(re => {
        loading(true)
        return re.json()
    }).then(data => {
        changeContent(data.weather[0], data.main, data.name)
    }).catch( err => {
    loading(false);
    document.querySelector('.wrapper').innerHTML = `<h1 id="error"> check your network connection <h4> ${err.message}</h4></h1>`;
    loading(true)
    })
}






//loading state 
function loading (loadState) {
    let loader = document.getElementById('loader')
    if (loadState) {
        loader.style.display = 'none';
    } else {
        loader.style.display = 'flex';

    }
}





let wrapper = document.querySelector('.wrapper');

function changeContent(data, tempreature, areaName) {
    let location = localStorage.getItem('cityname')
    document.querySelector('.wrapper').innerHTML = `
    <div class="main-weather"> 
        <img src = "http://openweathermap.org/img/wn/${data.icon}@2x.png">
        <h1> ${data.description}</h1>
        <h3> ${areaName} </h3>
    </div>
    <div class="details"> 
        <div class="temp"> tempreature: ${Math.floor(tempreature.temp - 273.15)} Cْ </div> 
        <div class="humid">humidity: ${tempreature.humidity  } %</div> 
    </div>
    `;
}


