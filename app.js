const app = require("express")()
const cors = require('cors');
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


// const { MongoClient } = require('mongodb');

// const url = "mongodb://localhost:27017/person"
// const port = 3000;
// const app = express()

// const client = new MongoClient('mongodb://localhost:27017');
// await client.connect();
// const db = client.db('my_database');
// const collection = db.collection('my_collection');
// await client.close();

// mongoose.connect(url,{})
// .then(result => console.log("Connected to MongoDB" ))
// .catch(err => console.log(err)) 

// app.get('/', (req,res)=> {
//     res.send("<h1>Hello  </h1>")
// }) 



// app.listen(port,() => {
//     console.log("server is running at port"+ port )
// })
    











app.use(cors());

let port = process.env.PORT || 6000;

mongoose.Promise = global.Promise;
const dbURI = 'mongodb://localhost:27017/WPSS';

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database', error)
    }else {
        return console.log('Successfully connected to database')
    }
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send("Welcome to API!");
});


let v1 = require('./api/routes');

app.use('/api', v1.router);

app.use(function(req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
});

app.listen(port, () => {
    console.log(`API server started on: ${port}`);
});