//imr import React from 'react';
//imrd import ReactDOM from 'react-dom';
//17. dakikada kaldım
//37.58de kaldım
//1:14:18 de kaldım

import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core'; //CssBaseline padding margin, bgcolor düzenleyip normale çekiyor

import { getPlacesData } from './api';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

const App = () => {

    const [places, setPlaces] = useState([]);

    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState({});
    // useState içerisine null yerine {} geçtim, çünkü hata vermeyip beyaz ekranda bırakıyordu ref stackoverflow

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            //console.log(latitude,longitude);
            setCoordinates({ lat: latitude, lng: longitude });
        })
    }, []);// boş array olunca sadece ilk yüklemede çalışıyor. ilk yüklediğimizde kendi lokasyonumuzu alsın diye kullandık

    useEffect(() => {
        // console.log(coordinates,bounds); bununla başta görebilcek mi kendi lokasyonumuzu diye baktık

        getPlacesData(bounds.sw, bounds.ne)
            .then((data) => {
                setPlaces(data);
            })
    }, [coordinates, bounds]);

    return (
        <>
            <CssBaseline />
            <Header />
            <Grid container spacing={3} style={{ width: '100%' }}>
                {/* style içine obje aldığı için width'i böyle çift parantezle verdik */}
                {/* xs=12 ile mobil cihazlarda full ekran görüntülenecek demiş olduk */}
                {/* md=4 ile daha büyük cihazlarda görüntülenecek alanı belirttik */}
                <Grid item xs={12} md={4}>
                    <List places={places}/>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={places}
                    />
                </Grid>
            </Grid>
        </>
    );
}

export default App;