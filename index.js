function wheatherData() {
  let city = document.getElementById("city").value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=aeb2e8e67a323e70bae652830b434d64`;

  fetch(url)
    .then(function (resp) {
      // console.log(resp)
      return resp.json();
    })
    .then(function (resp) {
      console.log(resp);
      showd(resp);
      // append(data);
    });
  // document.getElementById("temp").outerHTML = "";
  let title = document.getElementById("title");
  if (city == "") {
    title.innerText = "City Name is Empty";
    title.style.color = "red";
    // document.getElementById("main").innerHTML = "";
  } else {
    title.innerHTML = "";
    function showd(data) {
      append(data);
    }
  }
}
function append(data) {
  console.log(data);

  let cityname = document.getElementById("cityname");
  cityname.innerText = data.name;
  let img = document.getElementById("city_img");
  img.src = "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png";

  let srct = `https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  let current_temp_img = document.getElementById("current_temp_img");
  current_temp_img.src =
    " https://ssl.gstatic.com/onebox/weather/48/rain_s_cloudy.png";

  let cuurent_temp = document.getElementById("current_temp");
  cuurent_temp.innerHTML = `Temp:- ${
    Math.round(data.main.feels_like) - 273
  }&deg;C`;

  let min_temp_img = document.getElementById("min_temp_img");
  min_temp_img.src = "https://cdn-icons-png.flaticon.com/512/1555/1555512.png";

  let mintemp = document.getElementById("min_temp");
  mintemp.innerHTML = `Min Temp:- ${Math.round(
    data.main.temp_min - 273
  )}&deg;C`;

  let max_temp_img = document.getElementById("max_temp_img");
  max_temp_img.src =
    "https://as2.ftcdn.net/v2/jpg/01/14/24/43/1000_F_114244345_zDnnHfT8Tytm1LNs1XN8duHWAsLXmAZc.jpg";
  let max_temp = document.getElementById("max_temp");
  max_temp.innerHTML = `Max Temp:- ${Math.round(
    data.main.temp_max - 273
  )}&deg;C`;

  let wind_img = document.getElementById("wind_img");
  wind_img.src =
    "https://visualpharm.com/assets/829/Windy%20Weather-595b40b85ba036ed117dae20.svg";
  let wind = document.getElementById("wind");
  wind.innerText = `Wind Speed:- ${data.wind.speed}KM/H`;

  let cloud_img = document.getElementById("cloud_img");
  cloud_img.src = "https://cdn-icons-png.flaticon.com/512/414/414927.png";
  let cloud = document.getElementById("cloud");
  cloud.innerText = `${data.clouds.all} Cloudy`;

  let ss = document.getElementById("gmap_canvas");
  ss.src = srct;
  getWeatherOnLocation(data.coord.lat, data.coord.lon);
}

function getWeatherOnLocation(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=caa620f79edc125308792d112d756d75`;
  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (res) {
      console.log("Amol ",res);
      append7Day(res);
    })
    .catch(function (err) {
      console.log(err);
    });
}

function append7Day(data) {
  console.log(data.list);
  let main = document.getElementById("weather_7day");
  main.innerHTML = "";
  let div1 = document.createElement("div");
  let date1 = document.createElement("p");
  date1.innerText = "sun";
  let img1 = document.createElement("img");
  data.list[2].weather.map(function (ele) {
    img1.src = `https://openweathermap.org/img/wn/${ele.icon}@2x.png`;
  });
  // console.log(Math.round(data.list[2].main.feels_like-273))
  let p = document.createElement("p");
  p.innerHTML = ` ${Math.round(data.list[2].main.feels_like - 273)}&deg;C`;
  div1.append(date1, img1, p);

  let div2 = document.createElement("div");
  let date2 = document.createElement("p");
  date2.innerText = "mon";
  let img2 = document.createElement("img");
  data.list[5].weather.map(function (ele) {
    img2.src = `https://openweathermap.org/img/wn/${ele.icon}@2x.png`;
  });
  let p1 = document.createElement("p");
  p1.innerHTML = ` ${Math.round(data.list[5].main.feels_like - 273)}&deg;C`;
  div2.append(date2, img2, p1);

  let div3 = document.createElement("div");
  let date3 = document.createElement("p");
  date3.innerText = "tue";
  let img3 = document.createElement("img");
  data.list[7].weather.map(function (ele) {
    img3.src = `https://openweathermap.org/img/wn/${ele.icon}@2x.png`;
  });
  let p2 = document.createElement("p");
  p2.innerHTML = ` ${Math.round(data.list[7].main.feels_like - 273)}&deg;C`;
  div3.append(date3, img3, p2);

  let div4 = document.createElement("div");
  let date4 = document.createElement("p");
  date4.innerText = "wed";
  let img4 = document.createElement("img");
  data.list[15].weather.map(function (ele) {
    img4.src = `https://openweathermap.org/img/wn/${ele.icon}@2x.png`;
  });
  let p3 = document.createElement("p");
  p3.innerHTML = ` ${Math.round(data.list[15].main.feels_like - 273)}&deg;C`;
  div4.append(date4, img4, p3);

  let div5 = document.createElement("div");
  let date5 = document.createElement("p");
  date5.innerText = "thu";
  let img5 = document.createElement("img");
  data.list[22].weather.map(function (ele) {
    img5.src = `https://openweathermap.org/img/wn/${ele.icon}@2x.png`;
  });
  let p4 = document.createElement("p");
  p4.innerHTML = ` ${Math.round(data.list[22].main.feels_like - 273)}&deg;C`;
  div5.append(date5, img5, p4);

  let div6 = document.createElement("div");
  let date6 = document.createElement("p");
  date6.innerText = "fri";
  let img6 = document.createElement("img");
  data.list[27].weather.map(function (ele) {
    img6.src = `https://openweathermap.org/img/wn/${ele.icon}@2x.png`;
  });
  let p5 = document.createElement("p");
  p5.innerHTML = ` ${Math.round(data.list[27].main.feels_like - 273)}&deg;C`;
  div6.append(date6, img6, p5);

  let div7 = document.createElement("div");
  let date7 = document.createElement("p");
  date7.innerText = "sat";
  let img7 = document.createElement("img");
  data.list[32].weather.map(function (ele) {
    img7.src = `https://openweathermap.org/img/wn/${ele.icon}@2x.png`;
  });
  let p6 = document.createElement("p");
  p6.innerHTML = ` ${Math.round(data.list[32].main.feels_like - 273)}&deg;C`;
  div7.append(date7, img7, p6);

  main.append(div1, div2, div3, div4, div5, div6, div7);
}

////////////*****************************get current location */
function getlocation() {
  navigator.geolocation.getCurrentPosition(success);

  function success(pos) {
    const crd = pos.coords;

    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    getWeatherOncurrentLocation(crd.latitude, crd.longitude);
  }
}

function getWeatherOncurrentLocation(lat1, lon1) {
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat1}&lon=${lon1}&appid=aeb2e8e67a323e70bae652830b434d64`;
  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (res) {
      console.log(res);
      append(res);
    })
    .catch(function (err) {
      console.log(err);
    });
}
