const container = document.querySelector(".container");
// Türkçe: Ana konteyneri seçer.
// English: Selects the main container.

const search = document.querySelector(".search-box button");
// Türkçe: Arama butonunu seçer.
// English: Selects the search button.

const weatherBox = document.querySelector(".weather-box");
// Türkçe: Hava durumu kutusunu seçer.
// English: Selects the weather box.

const weatherDetails = document.querySelector(".weather-details");
// Türkçe: Hava durumu detaylarını seçer.
// English: Selects the weather details section.

const error404 = document.querySelector(".not-found");
// Türkçe: Hata mesajı alanını seçer.
// English: Selects the error message section.

const cityHide = document.querySelector(".city-hide");
// Türkçe: Şehir adını gizlemek için kullanılan alanı seçer.
// English: Selects the hidden city name section.

search.addEventListener("click", () => {
  // Türkçe: Arama butonuna tıklanıldığında bir olay tetikler.
  // English: Triggers an event when the search button is clicked.

  const APIKey = "e3693853d41a30eb70923bac12096f4f";
  // Türkçe: OpenWeather API'den veri almak için kullanılan API anahtarı.
  // English: API key used to fetch data from the OpenWeather API.

  const city = document.querySelector(".search-box input").value;
  // Türkçe: Kullanıcının girdiği şehir adını alır.
  // English: Gets the city name entered by the user.

  if (city == "") return;
  // Türkçe: Şehir alanı boşsa işlemi durdurur.
  // English: Stops the process if the city field is empty.

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
  // Türkçe: OpenWeather API'den hava durumu verilerini çeker.
  // English: Fetches weather data from the OpenWeather API.

    .then((response) => response.json())
    // Türkçe: Gelen veriyi JSON formatına dönüştürür.
    // English: Converts the received data to JSON format.

    .then((json) => {
      if (json.cod == "404") {
        // Türkçe: API'den gelen yanıt kodu 404 ise, şehir bulunamadı demektir.
        // English: If the response code from the API is 404, the city was not found.

        cityHide.textContent = city;
        // Türkçe: Hata mesajında gösterilecek şehir adını saklar.
        // English: Stores the city name to display in the error message.

        container.style.height = "400px";
        // Türkçe: Konteynerin yüksekliğini hata mesajına göre ayarlar.
        // English: Adjusts the container height for the error message.

        weatherBox.classList.remove("active");
        weatherDetails.classList.remove("active");
        // Türkçe: Hava durumu kutusu ve detaylarını gizler.
        // English: Hides the weather box and details.

        error404.classList.add("active");
        // Türkçe: Hata mesajını görünür hale getirir.
        // English: Makes the error message visible.

        return;
      }

      const image = document.querySelector(".weather-box img");
      // Türkçe: Hava durumu görselini seçer.
      // English: Selects the weather condition image.

      const temperature = document.querySelector(".weather-box .temperature");
      // Türkçe: Sıcaklık değerini gösteren öğeyi seçer.
      // English: Selects the element displaying the temperature.

      const description = document.querySelector(".weather-box .description");
      // Türkçe: Hava durumu açıklama metnini seçer.
      // English: Selects the weather condition description.

      const humidity = document.querySelector(".weather-details .humidity span");
      // Türkçe: Nem bilgisini gösteren öğeyi seçer.
      // English: Selects the element displaying the humidity.

      const wind = document.querySelector(".weather-details .wind span");
      // Türkçe: Rüzgar hızını gösteren öğeyi seçer.
      // English: Selects the element displaying the wind speed.

      if (cityHide.textContent == city) {
        return;
        // Türkçe: Eğer şehir zaten ekranda gösteriliyorsa, işlem yapılmaz.
        // English: If the city is already displayed, no action is taken.
      } else {
        cityHide.textContent = city;
        // Türkçe: Yeni şehir adını saklar.
        // English: Stores the new city name.

        container.style.height = "555px";
        // Türkçe: Konteynerin yüksekliğini günceller.
        // English: Updates the container height.

        container.classList.add("active");
        weatherBox.classList.add("active");
        weatherDetails.classList.add("active");
        // Türkçe: Hava durumu bilgilerini görünür hale getirir.
        // English: Makes the weather information visible.

        error404.classList.remove("active");
        // Türkçe: Hata mesajını gizler.
        // English: Hides the error message.

        setTimeout(() => {
          container.classList.remove("active");
          // Türkçe: Konteynerin aktif animasyonunu kaldırır.
          // English: Removes the active animation of the container.
        }, 2500);

        switch (json.weather[0].main) {
          case "Clear":
            image.src = "images/clear.png";
            break;

          case "Clouds":
            image.src = "images/cloud.png";
            break;

          case "Rain":
            image.src = "images/rain.png";
            break;

          case "Snow":
            image.src = "images/snow.png";
            break;

          case "Mist":
          case "Haze":
            image.src = "images/mist.png";
            break;

          default:
            image.src = "images/cloud.png";
            break;
        }
        // Türkçe: API'den gelen hava durumuna göre görseli ayarlar.
        // English: Sets the image based on the weather condition from the API.

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)} km/h`;
        // Türkçe: Hava durumu bilgilerini HTML öğelerine ekler.
        // English: Populates the HTML elements with weather data.

        // Aşağıdaki bölümler klonlama işlemi ve dinamik eklemeler içindir.
        const infoWeather = document.querySelector(".info-weather");
        const infoHumidity = document.querySelector(".info-humidity");
        const infoWind = document.querySelector(".info-wind");

        const elCloneInfoWeather = infoWeather.cloneNode(true);
        const elCloneInfoHumidity = infoHumidity.cloneNode(true);
        const elCloneInfoWind = infoWind.cloneNode(true);
        // Türkçe: Nem, sıcaklık ve rüzgar bilgilerini klonlar.
        // English: Clones humidity, temperature, and wind information elements.

        elCloneInfoWeather.id = 'clone-info-weather';
        elCloneInfoHumidity.id = 'clone-info-humidity';
        elCloneInfoWind.id = 'clone-info-wind';
        // Türkçe: Klonlanmış öğelere yeni kimlikler verir.
        // English: Assigns new IDs to the cloned elements.

        elCloneInfoWeather.classList.add('active-clone');
        elCloneInfoHumidity.classList.add('active-clone');
        elCloneInfoWind.classList.add('active-clone');
        // Türkçe: Klonlanan öğelere 'active-clone' sınıfı ekler.
        // English: Adds the 'active-clone' class to the cloned elements.

        setTimeout(() => {
          infoWeather.insertAdjacentElement('afterend', elCloneInfoWeather);
          infoHumidity.insertAdjacentElement('afterend', elCloneInfoHumidity);
          infoWind.insertAdjacentElement('afterend', elCloneInfoWind);
          // Türkçe: Klonlanmış bilgileri orijinal öğelerin yanına ekler.
          // English: Appends cloned information next to the original elements.
        }, 2200);

        const cloneInfoWeather = document.querySelectorAll('.info-weather.active-clone');
        const cloneInfoHumidity = document.querySelectorAll('.info-humidity.active-clone');
        const cloneInfoWind = document.querySelectorAll('.info-wind.active-clone');
        // Türkçe: Tüm klonlanmış öğeleri seçer.
        // English: Selects all cloned elements.

        const cloneInfoWeatherfirst = cloneInfoWeather[0];
        const cloneInfoHumidityfirst = cloneInfoHumidity[0];
        const cloneInfoWindfirst = cloneInfoWind[0];
        // Türkçe: İlk klonlanmış öğeleri seçer.
        // English: Selects the first cloned elements.

        if (cloneInfoWeather.length > 0) {
          cloneInfoWeatherfirst.classList.remove('active-clone');
          cloneInfoHumidityfirst.classList.remove('active-clone');
          cloneInfoWindfirst.classList.remove('active-clone');
          // Türkçe: İlk klonlanmış öğelerin 'active-clone' sınıfını kaldırır.
          // English: Removes the 'active-clone' class from the first cloned elements.

          setTimeout(() => {
            cloneInfoWeatherfirst.remove();
            cloneInfoHumidityfirst.remove();
            cloneInfoWindfirst.remove();
            // Türkçe: Eski klonlanmış öğeleri DOM'dan kaldırır.
            // English: Removes old cloned elements from the DOM.
          }, 2200);
        }
      }
    });
});
