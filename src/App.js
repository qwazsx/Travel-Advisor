//imr import React from 'react';
//imrd import ReactDOM from 'react-dom';
//17. dakikada kaldım
//37.58de kaldım

import React from 'react';
import { CssBaseline,Grid } from '@material-ui/core'; //CssBaseline padding margin, bgcolor düzenleyip normale çekiyor


import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

const App = () => {

    return(
        <>
            <CssBaseline/>
            <Header/>
            <Grid container spacing={3} style={{ width: '100%'}}> 
            {/* style içine obje aldığı için width'i böyle çift parantezle verdik */}
                {/* xs=12 ile mobil cihazlarda full ekran görüntülenecek demiş olduk */}
                {/* md=4 ile daha büyük cihazlarda görüntülenecek alanı belirttik */}
                <Grid item xs={12} md={4}>
                    <List/>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map/>
                </Grid>
            </Grid>
        </>
    );
}

export default App;