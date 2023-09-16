const { Configuration, OpenAIApi } = require("openai");
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mariadb = require('mariadb');
const axios = require('axios');
require('dotenv').config();
//Prompt
const prompt_engi = `You are an expert agricultural scientist. You will carefully analyze the dirt and crop information from the given input from the user including NPK values, Humidity value in %, and the crop they would like to grow.
After digest the info, you must return the answer in a JSON format for the user. The keys to the JSON format includes recommended N, P, K values (in mg/kg) to grow the crop, recommended water amount to add in ml if needed to increase the Humidity (if not return 0), recommendations to improve the soil to match that requirement (separately recommend for each nutrient), other recommendations .

(Example Input)

input -> N: 48,
 P: 119, 
 K: 107,
 crop: Corn
Humidity: 59.12%


the output you will give must be in this JSON format:

(Example Output) * Make sure it is in JSON format only, do not return anything other than the JSON file *

{ "crop": "Corn",
 "current_amount": {
	"N": 48,
	"P": 119,
	"K": 407,
	"Humidity": 59.12
 },
  "recommended_amount": {
 "N": 135,
 "P": 37.5,
 "K": 100
  },
"recommended_water": "50",
  "nutrient_improvement_recommendations": {
 "N": "Apply a nitrogen-rich fertilizer such as ammonium nitrate.",
 "P": "Add a phosphorus-rich fertilizer such as superphosphate.",
 "K": "Use a potassium-rich fertilizer like potassium chloride."
  },
  "other_recommendations": [
 "Ensure proper drainage to avoid waterlogging.",
 "Test the soil pH and adjust if necessary.",
 "Practice crop rotation to prevent nutrient depletion."
  ]
}


`

// Open AI Configuration
const configuration = new Configuration({

	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Express Configuration
const app = express()
const port = 3080

app.use(bodyParser.json())
app.use(cors())
app.use(require('morgan')('dev'))


// Routing 

// Primary Open AI Route
app.post('/', async (req, res) => {
	const { message, currentModel, temperature } = req.body;
	const response = await openai.createCompletion({
		model: `${currentModel}`,// "text-davinci-003",
		prompt: `${message}`,
		max_tokens: 3000,
		temperature,
	});
	res.json({
		message: response.data.choices[0].text,
	})
});


app.get('/data', async (req, res) => {
	pool.getConnection()
	  .then(async (conn) => {
		// Random NPK Values
		const N = (Math.random() * 1999 + 1).toFixed(2);
		const P = (Math.random() * 1999 + 1).toFixed(2);
		const K = (Math.random() * 1999 + 1).toFixed(2);
		const sensor_data = await axios.get(`https://magellan.ais.co.th/asgardpullmessagesapis/api/listen/thing?Key=${process.env.MAGELLAN_API_KEY}`);
		const Humidity = sensor_data.data.Sensor.Humidity;
  
		await conn.query(`INSERT INTO sensor_data(N, P, K, Humidity) VALUES
		  (${N},
		  ${P},
		  ${K},
		  ${Humidity});
		`);
  
		conn.release();
  
		// input
		const npk_input = `N: ${N}, P: ${P}, K: ${K}, crop: Thai Jasmine Rice, Humidity: ${Humidity}`;
  
		axios.post('http://localhost:3080/', {
		  message: prompt_engi + npk_input,
		  currentModel: 'text-davinci-003',
		  temperature: 0.8
		})
		.then(response_models => {
		  res.json(response_models.data);
		})
		.catch(err => {
		  console.error('Error posting to localhost:', err);
		  res.status(500).json({ error: 'Error posting to localhost' });
		});
	  })
	  .catch(err => {
		console.error('Error getting connection:', err);
		res.status(500).json({ error: 'Error getting connection' });
	  });
  });
  

// Database connection configuration
const pool = mariadb.createPool({
	host: 'localhost',
	password: '',
	user: 'root',
	database: 'Gundam',
	connectionLimit: 5, // Adjust the connection limit as needed
});

// Test the database connection
pool.getConnection()
	.then(conn => {
		console.log('Connected to MariaDB');
		conn.release();
	})
	.catch(err => {
		console.error('Error connecting to MariaDB:', err);
	});



// Start the server
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
});