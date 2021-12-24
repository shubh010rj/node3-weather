const request = require('request')
const forecast = (latitude,longitude,callback) => {
 const url = 'http://api.weatherstack.com/current?access_key=2c37e6b7cfd17ec0c24647b1afcc8780&query=' + latitude +',' + longitude + '&units=f'

request({url: url,json: true},(error,response) => {
        if(error){
            callback('unable to connect to weather service',undefined)
        }else if(response.body.error){
            callback('unable to get weather for the location',undefined)
        }else{
            callback(undefined,response.body)
        }
    })
}
module.exports = forecast