const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.use((req,res, next) => {

  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);

  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log('Unable to append server log');
    }
  });

  next();
});

app.get('/', (req, res) => {

//  res.send('<h2>Hello express!!!</h2>');
res.send({
  name:'Khan',
  likes:['Biking','Hiking']
});

});

app.get('/about', (req, res) => {

res.render('about.hbs',{
  pageTitle: 'About page',
  currentear:new Date().getFullYear()
});

});




app.listen(port, () => {
  console.log(`Server is up in port ${port}`);
});
