$( document ).ready(function() {
    if ("geolocation" in navigator){ //check if geolocation is available at all
        //try to get user current location using getCurrentPosition() method
        navigator.geolocation.getCurrentPosition(function(position){
            update_weather_prediction(position.coords.latitude, position.coords.longitude);
        }, function (){
            console.log("Geolocation lookup failed, using Wuppertal as default");
            update_weather_prediction();
        });
    }else{
        console.log("Browser doesn't support geolocation, using Wuppertal as default");
        update_weather_prediction();
    }
});

function update_weather_prediction(user_latitude = 51.2562, user_longitude = 7.1508){
    console.log("User location: Lat "+user_latitude+" Long "+ user_longitude);
    let current_time = new Date();
    //current_time.setHours(new Date().getHours()-38);
    let current_date = current_time.toISOString().slice(0, 10);
    $.getJSON("https://api.brightsky.dev/weather?lat="+user_latitude+"&lon="+user_longitude+"&date="+current_date, function(data) {
        //console.log(data.weather)
        let danger = false;
        let danger_begin = new Date(current_time).setMinutes(current_time.getMinutes()-30);
        let danger_end = new Date(current_time).setHours(current_time.getHours() + 2);
        $.each(data.weather, function( index, value ) {
            let forecast_time = new Date(value.timestamp);
            if(forecast_time >= danger_begin && forecast_time <= danger_end){
                console.log( forecast_time.toISOString() + ": " + value.precipitation );
                if (value.precipitation > 0.5){
                    // It's raining!
                    danger = true;
                }
            }
        });
        update_danger_button(danger);
        $.each(data.weather, function( index, value ) {
            let forecast_time = new Date(value.timestamp);
            if(forecast_time >= current_time){
                update_weather_icon(value.icon);
                return false;
            }
        });
    });
}

function update_danger_button(danger=true){
    if(danger){
        $(".weather-danger").show();
        $(".weather-nodanger").hide();
    }else{
        $(".weather-nodanger").show();
        $(".weather-danger").hide();
    }
}

function update_weather_icon(icon=""){
    console.log(icon);
    let icon_mapping = new Map([
        ["clear-day", $(".weather-clear")],
        ["clear-night", $(".weather-clear-night")],
        ["partly-cloudy-day", $(".weather-few-clouds")],
        ["partly-cloudy-night", $(".weather-few-clouds-night")],
        ["cloudy", $(".weather-overcast")],
        ["fog", $(".weather-severe-alert")],
        ["wind", $(".weather-severe-alert")],
        ["rain", $(".weather-showers")],
        ["sleet", $(".weather-snow")],
        ["snow", $(".weather-snow")],
        ["hail", $(".weather-snow")],
        ["thunderstorm", $(".weather-storm")],
    ]);
    //$(".weather-icon").hide();
    icon_mapping.get(icon).show();
}