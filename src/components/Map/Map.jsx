import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
// useMediaQuery mobile responsive yapmamıza yarayacak
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'
import Rating from '@material-ui/lab';
// bazı meterial-ui importları hala geliştirilmekte olduğundan(Rating gibi) /core'dan değil /lab'den aldık

import useStyles from './styles';

const Map = () => {
    const classes = useStyles();
    const isMobile = useMediaQuery('(min-width:600px)');

    const coordinates = { lat: 0, lng: 0 };

    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyCpJBNkbTcv-qFNGSFeKXz_NFiEN5ZiLi4' }}
                defaultCenter={ coordinates }
                center={ coordinates }
                defaultZoom={14}
                margin={[50,50,50,50]}
                options={''}
                onChange={''}
                onChildClick={''}
                >

            </GoogleMapReact>

        </div>
    );
}

export default Map;
