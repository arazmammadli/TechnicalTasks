import { useEffect, useState } from 'react';
import './App.css';
import CurrentWeather from './components/currentWeather/CurrentWeather';
import Forecast from './components/forecast/Forecast';
import Highlight from './components/today/Highlight';
import TodayAt from './components/today/TodayAt';
import Header from './layout/Header';
import axios from 'axios';
import { ICurrentWeather } from './api/type';
import { url } from './api/api';

export type IUser = {
  latitude: number;
  longitude: number
}

function App() {
  const [currentWeather, setCurrentWeather] = useState<ICurrentWeather | null>(null);
  const [userLocation, setUserLocation] = useState<IUser | null>(null);
  const [openTab, setOpenTab] = useState<number>(1)

  const getWeatherData = async (location: IUser) => {
    const { latitude, longitude } = location;
    const response = await axios.get(url.currentWeather(latitude, longitude, openTab === 1 ? "metric" : "imperial"));
    setCurrentWeather(response.data);
  };

  useEffect(() => {
    (async () => {
      try {
        if (!userLocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ latitude, longitude });
          });
        }
      } catch (error) {
        console.error('Konum alınamadı:', error);
        setCurrentWeather(null);
      }
    })();

  }, [])

  useEffect(() => {
    if (userLocation) {
      getWeatherData(userLocation);
    }
  }, [userLocation, openTab])

  if (!currentWeather) return;

  return (
    <>
      <Header openTab={openTab} openTabSet={setOpenTab} userLocationSet={setUserLocation} />
      <main>
        <div className="max-w-[1490px] mx-auto p-3">
          <div className="flex flex-row gap-5">
            <div className="grid grid-cols-[minmax(0,1fr)] flex-[0_0_25%] gap-5">
              <CurrentWeather data={currentWeather} openTab={openTab} />
              <div className="block w-full">
                <h2 className='mb-3 pl-1 font-medium'>Weekly Forecast</h2>
                <Forecast user={userLocation} openTab={openTab} />
              </div>
            </div>
            <div className="grid grid-cols-[minmax(0,1fr)] flex-[0_0_75%]">
              <Highlight data={currentWeather} openTab={openTab} />
              <TodayAt user={userLocation} openTab={openTab} />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default App;
