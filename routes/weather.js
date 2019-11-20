const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
const cityIDs = require("../city.list.json");
const keyJSON = require("../config/keys.json");
const router = express.Router();

const corsOptions = {
  origin: ['http://localhost:3000'],
  allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Methods", "Access-Control-Request-Headers"],
  credentials: true,
  enablePreflight: true
}

router.use(cors(corsOptions));
router.options('*', cors(corsOptions))
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post("/", (req, res) => {

  const location = req.body.city;

  //format location string
  String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
  };

  function getCodeByCity(city) {
    return cityIDs.filter(
      function (data) {
        return data.name == city;
      }
    );
  }

  const cityCode = getCodeByCity(location.toProperCase());
  const url = "https://api.openweathermap.org/data/2.5/weather?id=" + cityCode[0].id + "&APPID=" + keyJSON.apiKey;
  axios.get(url)
    .then(response => {
      //need to toString() because can't res.send() int values (treats as status code)
      res.send(response.data.main.temp.toString());
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
