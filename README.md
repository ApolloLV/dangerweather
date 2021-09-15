# dangerweather
A simple weather app that displays whether it is going to rain in the next two hours, based on the DWD weather forecast and measurements.

## Forecast details
If there is more than 0.5 ml precipitation per hour for either the last measurement (not older than 30 minutes) or any future forecast (up to 2 hours), there is danger of rain. 
The displayed weather icon is based on the next forecast and determined by the Bright Sky API.

## How to run?
There is no server-side code involved, so this project can be simply hosted by a webserver and should run out-of-the-box.
