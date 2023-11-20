import React, { useState } from 'react'
import SunnyLogo from '../../assets/sun.png'
import CloudyLogo from '../../assets/cloudy.png'
import CloudLogo from '../../assets/cloud.png'
import RainLogo from '../../assets/heavy-rain.png'
import SnowLogo from '../../assets/snowflake.png'
import ThanderLogo from '../../assets/thunder.png'
import MistLogo from '../../assets/Mist.png'

import WindLogo from '../../assets/wind.png'
import SunsetLogo from '../../assets/sunset.png'
import SunriseLogo from '../../assets/sunrise.png'
import PressureLogo from '../../assets/pressure-gauge.png'
import HumidityLogo from '../../assets/humidity.png'

const TimeFormat = (time)=>{
  const date = new Date(time*1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedHours = hours % 12 || 12;
  const formattedTime = `${formattedHours}:${minutes}`;
  return formattedTime;
}

const Weather = () => {

  const api_key = "20cca7fe0659cb5c68d3c063e2f4c8b0"
  const [status, setStatus] = useState('')
  const [weatherIcon, setWeatherIcon] = useState(SunnyLogo)
  const [temp, setTemp] = useState()
  const [location, setLocation] = useState('')
  const [country, setCountry] = useState('')
  const [sunrise, setSunrise] = useState()
  const [sunset, setSunset] = useState()
  const [humidity, setHumidity] = useState()
  const [windSpeed, setWindSpeed] = useState()
  const [pressure, setPressure] = useState()


  let SearchWeather = async(e)=>{
    e.preventDefault()
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${e.target.search.value}&units=Metric&appid=${api_key}`
    let response = await fetch(url)
    let data = await response.json()
    console.log(data)
    if (data && data.weather){
      setStatus(data.weather[0].description)
      setTemp(Math.floor(data.main.temp))
      setLocation(data.name)
      setCountry(data.sys.country)
      setSunrise(TimeFormat(data.sys.sunrise))
      setSunset(TimeFormat(data.sys.sunset))
      setHumidity(data.main.humidity)
      setWindSpeed(data.wind.speed)
      setPressure(data.main.pressure)
      if(data.weather[0].icon==='01d' || data.weather[0].icon==='01n'){
        setWeatherIcon(SunnyLogo)
      }else if(data.weather[0].icon==='03d' || data.weather[0].icon==='03n' || data.weather[0].icon==='04d' || data.weather[0].icon==='04n'){
        setWeatherIcon(CloudLogo)
      }else if(data.weather[0].icon==='02d' || data.weather[0].icon==='02n'){
        setWeatherIcon(CloudyLogo)
      }else if (data.weather[0].icon==='09d' || data.weather[0].icon==='09n' || data.weather[0].icon==='10d' || data.weather[0].icon==='10n'){
        setWeatherIcon(RainLogo)
      }
      else if(data.weather[0].icon==='11d' || data.weather[0].icon==='11n'){
        setWeatherIcon(ThanderLogo)
      }
      else if (data.weather[0].icon==='13d' || data.weather[0].icon==='13n'){
        setWeatherIcon(SnowLogo)
      }
      else if (data.weather[0].icon==='50d' || data.weather[0].icon==='50n'){
        setWeatherIcon(MistLogo)
      }
    }
  }


  return (
    <div className='h-[95vh]'>
      <div className='flex justify-center items-center'>
        <form className='w-[70vw]' onSubmit={SearchWeather}>   
            <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="search" name='search' id="search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="City/Location..." required/>
                <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
            </div>
        </form>
      </div>
      <div className='h-[90%] flex justify-center items-center'>
        <div className='w-[500px] min-h-[600px] p-4 border border-blue-300 rounded-xl bg-blue-800 text-white'>
          <h3 className='leading-6 text-xl text-center mt-2'>{status?status:"Status"}</h3>
          <div className='flex justify-center items-center my-4'>
            <img src={weatherIcon} width={120} alt='weather logo'/>
          </div>
          <div className='text-7xl text-center font-semibold'>{temp?temp:"0"}°C</div>
          <div className='text-center my-2 text-2xl'>{location?location:"Location"} {country?`, ${country}`:""}</div>
          <div className='my-4 mx-4 flex justify-between items-center'>
            <div className='flex flex-col justify-center items-center'>
              <img src={SunriseLogo} width={50} alt='sunrise'/>
              <p>{sunrise?`${sunrise} am`:"00:00 am"}</p>
            </div>
            <div className='flex flex-col justify-center items-center'>
              <img src={SunsetLogo} width={50} alt='sunrise'/>
              <p>{sunset?`${sunset} am`:"00:00 pm"}</p>
            </div>
          </div>
          <div className='my-4 mx-4 flex justify-between items-center'>
            <div className='flex flex-col justify-center items-center'>
              <img src={HumidityLogo} width={40} alt='sunrise'/>
              <p>{humidity? humidity:"0"} %</p>
            </div>
            <div className='flex flex-col justify-center items-center'>
              <img src={WindLogo} width={40} alt='sunrise'/>
              <p>{windSpeed? windSpeed: "0"} km/h</p>
            </div>
          </div>
          <div className='my-4 mx-4 flex justify-center items-center'>
            <div className='flex flex-col justify-center items-center'>
              <img src={PressureLogo} width={40} alt='sunrise'/>
              <p>{pressure?pressure:"0"} hPa</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather