const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
// require('./db/mongoose')


const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('imagefetch')
})

// app.get('/help', (req, res) => {
//     res.render('help', {
//         helpText: 'This is some helpful text.',
//         title: 'Help',
//         name: 'Andrew Mead'
//     })
// })

// app.get('/weather', (req, res) => {
//     if (!req.query.address) {
//         return res.send({
//             error: 'You must provide an address!'
//         })
//     }

//     geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
//         if (error) {
//             return res.send({ error })
//         }

//         forecast(latitude, longitude, (error, forecastData) => {
//             if (error) {
//                 return res.send({ error })
//             }

//             res.send({
//                 forecast: forecastData,
//                 location,
//                 address: req.query.address
//             })
//         })
//     })
// })

// app.get('/products', (req, res) => {
//     if (!req.query.search) {
//         return res.send({
//             error: 'You must provide a search term'
//         })
//     }

//     console.log(req.query.search)
//     res.send({
//         products: []
//     })
// })


app.get('/getdata', (req, res) => {
    res.render('datab')
})


app.get('/database', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

   



    MongoClient.connect(connectionURL, {useUnifiedTopology: true, useNewUrlParser: true }, (error, client) => {
        if (error) {
            return console.log('Unable to connect to database!')
        }
    
        const db = client.db(databaseName)
       // console.log(db)
    
          var a = req.query.address
          var b= req.query.data
          var c =  req.query.email
          var d =req.query.password
        //   var b=parseInt(req.query.)
        console.log(a)
        console.log(b)
        console.log(c)
        console.log(d)  
    
        // db.collection('hiteshk').find({age:a}).toArray((error,documents)=>{


        //     console.log(req.query.address)
        //     if (error){
        //             console.log('please provide other number',undefined)
        //     }
        //     else {
        //         //var a=documents[1]
        //         //console.log(a)
        //        // console.log(documents[1].name)
        //        console.log("doc======>",documents)
        //        console.log(typeof documents)
        //     //    var b=String(documents)
        //         // var b=JSON.parse(documents)
                
        //         res.send({documents})
        //     }
            
            
        // }
        
        db.collection('number').insertOne({
            name:a,
            age:b,
            email:c,
            password:d
        },(error,result)=>{
            if(error){
                console.log('please provide other number',undefined)
            }
            console.log(undefined,'everything is fine')
        })
        
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
