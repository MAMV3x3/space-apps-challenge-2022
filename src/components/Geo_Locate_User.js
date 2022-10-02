import { useState, useEffect } from "react";

//geolocate user
function Geo_Locate_User(){
    const [location, setLocation] = useState(null);

    useEffect(() => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function (position) {
                const { latitude, longitude } = position.coords;
                //console.log(latitude, longitude);
                setLocation({
                    lat: latitude,
                    lon: longitude
                })
            })
        }
        else {
            alert("You need to provide your location to use this app");
        }
    }, []);

    return location;
}

export default Geo_Locate_User;
