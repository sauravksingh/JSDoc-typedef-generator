
const bodyParser = require('body-parser'),
    express = require('express'),
    forIn = require('lodash.forin');

const app = express()
const port = 3000


const convert = function(input){
    let jsdocs = ['/**', '* @typedef {Object} MyObject','* @type Object', '* '];      
    
    forIn(input, (value, prop) => {    
        jsdocs.push(`* @property {${typeof(value)}} ${prop}`);
    })
    
    jsdocs.push('**/');
    return jsdocs.join('\n');
}

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/definitions', (req, res) => {
    let output = {};
    try{
        output = convert(req.body);
    }catch(ex){
        console.log("Exception occurred: ", ex);
        output = ex;
    }
    res.status(201).json(output);
});

app.listen(port, () => console.log(`Typedef Generator Service listening on port ${port}`))