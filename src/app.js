const path = require('path')
const express = require('express')
const geocode  = require('./utils/geocode')
const forecast = require('./utils/forecast')
const hbs = require('hbs')

const { hasSubscribers } = require('diagnostics_channel')
//console.log(path.join(__dirname,'/../public'))
const app = express()
const port = process.env.PORT || 3000

const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(path.join(__dirname,'/../public')))
app.get('',(req,res) =>{
    res.render('index',{
        title: 'Weather App',
        name: 'Shubham'
    })
}
)

app.get('/about',(req,res) =>{
    res.render('about',{
        title: 'About',
        name: 'Shubhamr'
    })
})

app.get('/help',(req,res) =>{
    res.render('help',{
        title: 'Help',
        helpText : ' this is help page',
        name: 'SHubham'
    })
})
app.get('/weather',(req,res) =>{
    if(!req.query.address){
        return res.send({
            error: 'you must enter address'
        })
    }

    geocode(req.query.address,(error,data) => {
        if(error){
            return res.send({
                error: error
            })
        }
        else{
            forecast(data.latitude,data.longitude, (error, foreCastdata) =>{
            if(error){
                return res.send({
                    error: error
                })
            }
            res.send({
                location: data.location,
                foreCast: foreCastdata 
            })
        })
       }
    })


    // res.send({
    //     address: req.query.address
    // })
})
app.get ('/help/*',(req,res) =>{
    res.render('404',{
        title:'404',
        name:'Shubham',
        errorMsg:'Help article not found'
    })
})

app.get('*',(req,res) =>{
    res.render('404',{
        title: '404',
        name:'Shubham',
        errorMsg: 'page not found'
    })
})

app.listen(port,() =>{
    console.log('server is up ' + port)
})