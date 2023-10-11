const apiKey = "fa4360e8851cf156b50f1fea21fec6ba"

const nameCity = document.querySelector('#city');
const tempElement = document.querySelector('#temperature span')
const descElement = document.querySelector('#descricao-clima')
const iconClima = document.querySelector('#icon-clima')
const country = document.querySelector('#country')
const umidade = document.querySelector('#umidade span')
const vento = document.querySelector('#vento span')
const nuvem = document.querySelector('#nuvem span')
const sensacaoTermica = document.querySelector('#sensacao-termica span')
const tempMinima = document.querySelector('#temp-minima span')
const tempMaxima = document.querySelector('#temp-maxima span')


//Funções
const getApiWeather = async (city) => {
   const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`
   const res = await fetch(apiWeatherURL) 
   const data = await res.json()

   return data
}



const showCity = async (city) => {
	try {
		const data = await getApiWeather(city)

		if(data.cod !== 200) {
			throw new Error("Escreva a cidade corretamente")
		}

		nameCity.innerText = data.name
  		tempElement.innerText = parseInt(data.main.temp)
  		descElement.innerText = data.weather[0].description
  		iconClima.setAttribute('src',`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
  		const flagCode = data.sys.country
  		const flagCountry = `https://flagsapi.com/${flagCode}/flat/64.png`
  		country.setAttribute("src", flagCountry)

  		umidade.innerText = `${data.main.humidity}%`
  		vento.innerText = `${data.wind.speed}km/h`
  		nuvem.innerText = `${data.clouds.all}%`
  		sensacaoTermica.innerText = parseInt(data.main.feels_like)
  		tempMinima.innerText = parseInt(data.main.temp_min)
  		tempMaxima.innerText = parseInt(data.main.temp_max)
	}catch(error) {
		alert(`${error}`)
	}

	cancelar()

}

const cancelar = () => {
	inputCity.value = " "
}


//Evento
const inputCity = document.getElementById('input-city')
const btn = document.getElementById('btn')

btn.addEventListener('click', (e) => {
    e.preventDefault()
    const city = inputCity.value

    showCity(city)
})

inputCity.addEventListener('keyup', (e) => {
	if(e.code === 'Enter') {
		const city = e.target.value
		showCity(city)
	}

})
