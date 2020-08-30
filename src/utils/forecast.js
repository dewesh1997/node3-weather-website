const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url ="http://api.weatherstack.com/current?access_key=e3d5fc530c1f2bafc21305a99ca38c30&query=" + encodeURIComponent(latitude) + "," + encodeURIComponent(longitude) + "&units=f";
    // console.log(url);

    request({url, json: true}, (error, { body } = {}) => {
        //const data = JSON.parse(response.body);
        //console.log(response.body.current);
        if(error){
            callback("Unable to Connect to internet", undefined);
        } else if(body.error){
            callback("Unable to find location", undefined);
        } else {
            
            callback(undefined, {
                temprature: body.current.temperature,
                rain: body.current.precip,
                location: body.location.name,
                line: "Wind speed: "+body.current.wind_speed
            });
          //  console.log(response.body.features[0].place_name);
        } 
        // else {
        //     console.log("It is currently "+ response.body.current.temperature +" degrees out. There is "+ response.body.current.precip + "% chance of rain");
        // }
    });

};



module.exports = forecast;