const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const pass = 'hxhxsrRJooXPNG$R';
const uri = "mongodb+srv://tushartd:hxhxsrRJooXPNG$R@cluster0.lq9rh.mongodb.net/organicdb?retryWrites=true&w=majority";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// First product
// const honey = {
//   name: "Honey",
//   price: 300,
//   quantity: 20
// };


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const productCollection = client.db("organicdb").collection("open");

  // Read something from the database
  app.get('/products', (req, res) => {
    productCollection.find({})
    .toArray( (err, documents) => {
      res.send(documents);
    } )
  })


  // Create or add something in the database

  // collection.insertOne(honey)
  // .then(res => {
  //   console.log('one product added')
  // })

  app.post('/addProduct', (req, res) => {
    const product = req.body;
    productCollection.insertOne(product)
    .then(result => {
      console.log('data added successfully');
      res.send('success');
    })
  });

  console.log('DB Connected');
  // perform actions on the collection object
  // client.close();
});


app.listen(3000);