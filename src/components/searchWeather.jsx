import React, { useState, useEffect } from 'react';
import { FaCloudRain, FaRegSnowflake } from "react-icons/fa";
import { BsCloudsFill, BsCloudHazeFill } from "react-icons/bs";
import { MdSunny } from "react-icons/md";
import { GoSearch } from "react-icons/go";

const SearchWeather = () => {
    const API_KEY = '1c935991bce2fb305040859b94091dc2';
    
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState({});
    const [icon, setIcon] = useState('');

    const searchWeather = async () => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
        const data = await response.json();
        setWeather(data);
        console.log(data);
        await changeIcon(data.weather[0].main);
    };

    const changeIcon = async (value) => {
        const icons = [
            {name: 'Clouds', icon: 'clouds__icon' },
            {name: 'Haze', icon: 'haze__icon' },
            {name: 'Clear', icon: 'clear__icon' },
            {name: 'Rain', icon: 'rain__icon' },
            {name: 'Snow', icon: 'snow__icon' },
        ];
    
        const iconObject = icons.find(icon => icon.name === value);
    
        if (iconObject) {
            setIcon(iconObject.icon);
        } else {
            setIcon('');
        }
    };
    
    useEffect(() => {
        if (icon) {
            // Скрываем все иконки перед показом нужной
            document.querySelectorAll('.icon').forEach(i => {
                i.style.display = 'none';
            });
    
            const iconElement = document.querySelector(`.weather__app .info__box .weather__main__box .${icon}`);
            if (iconElement) {
                iconElement.style.display = 'flex';
            }
        }
    }, [icon]);
    
    return (
        <div className='weather__app'>
            <div className='search__box'>
                <input 
                    type="text" 
                    placeholder='Ваш город' 
                    onChange={(event) => setCity(event.target.value)}/>
                <button type='submit' onClick={searchWeather}><GoSearch /></button>
            </div>
            <div className='info__box'>
                {weather.name ? (
                    <>
                        <p className='weather__name'>Город:
                            <span>{weather.name} ({weather.sys.country})</span>
                        </p>
                        <p className='weather__temp'>Температура:
                            <span>{Math.floor(weather.main.temp - 273.15)}</span>°C
                        </p>
                        <div className="weather__main__box">
                            <p className='weather_main'>Погода: 
                                <span>{weather.weather[0].main}</span>
                            </p>
                            <FaCloudRain className='icon rain__icon'/>
                            <FaRegSnowflake className='icon snow__icon' />
                            <BsCloudsFill className='icon clouds__icon'/>
                            <MdSunny className='icon clear__icon'/>
                            <BsCloudHazeFill className='icon haze__icon'/>
                        </div>
                        
                    </>
                ) : null}
            </div>
        </div>
    );
};

export default SearchWeather;
