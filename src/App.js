//imr import React from 'react';
//imrd import ReactDOM from 'react-dom';
// imrs→	import React, { useState } from 'react'
// imrse→	import React, { useState, useEffect } from 'react'
// Kullanılan paketler
// npm install @material-ui/core @material-ui/icons @material-ui/lab @react-google-maps/api axios google-map-react

import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core'; //CssBaseline padding margin, bgcolor düzenleyip normale çekiyor

import { getPlacesData, getWeatherData } from './api';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

const App = () => {

    const [places, setPlaces] = useState([]);
    const [weatherData, setWeatherData] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]);

    const [childClicked, setChildClicked] = useState(null);

    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState({});
    // useState içerisine null yerine {} geçtim, çünkü hata vermeyip beyaz ekranda bırakıyordu ref stackoverflow, videoda da böyle ilerledi

    const [isLoading, setIsLoading] = useState(false);
    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            //console.log(latitude,longitude);
            setCoordinates({ lat: latitude, lng: longitude });
        })
    }, []);// boş array olunca sadece ilk yüklemede çalışıyor. ilk yüklediğimizde kendi lokasyonumuzu alsın diye kullandık

    useEffect(() => {
        const filteredPlaces = places.filter((place) => place.rating > rating);

        setFilteredPlaces(filteredPlaces);
    }, [rating])

    useEffect(() => {
        if (bounds.sw && bounds.ne) {
            // console.log(coordinates,bounds); bununla başta görebilcek mi kendi lokasyonumuzu diye baktık
            setIsLoading(true);

            getWeatherData(coordinates.lat,coordinates.lng)
                .then((data) => setWeatherData(data));

            getPlacesData(type, bounds.sw, bounds.ne)
                .then((data) => {
                    setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
                    setFilteredPlaces([]);
                    setIsLoading(false);
                })
        }
    }, [type, bounds]);

    return (
        <>
            <CssBaseline />
            <Header setCoordinates={setCoordinates} />
            <Grid container spacing={3} style={{ width: '100%' }}>
                {/* style içine obje aldığı için width'i böyle çift parantezle verdik */}
                {/* xs=12 ile mobil cihazlarda full ekran görüntülenecek demiş olduk */}
                {/* md=4 ile daha büyük cihazlarda görüntülenecek alanı belirttik */}
                <Grid item xs={12} md={4}>
                    <List
                        places={filteredPlaces.length ? filteredPlaces : places}
                        childClicked={childClicked}
                        isLoading={isLoading}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={filteredPlaces.length ? filteredPlaces : places}
                        setChildClicked={setChildClicked}
                        weatherData={weatherData}
                    />
                </Grid>
            </Grid>
        </>
    );
}

export default App;