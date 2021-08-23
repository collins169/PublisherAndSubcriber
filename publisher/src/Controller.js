require("dotenv").config();
const Database = require("./Database");
const db = new Database();
const axios = require("axios");

exports.publish = async (req, res) => {
  try {
    //let deconstruct the request paramas
    const { topic } = req.params;

    //Let confim if the request body is an object and also has value
    if (req.body.constructor === Object && Object.values(req.body).length === 0) {
      return res.status(400).json({
        error: "request body is invalid",
      });
    }

    const payload = {
      topic,
      data: req.body,
    };

    //Let find all subscribed servers on a topic
    let servers = await db.findAll({
      topic,
    });

    //Let map the array of server and get only the urls
    const urls = servers.map((server) => server.url);

    //let loop through each urls and publish the message to each of them
    for (const url of urls) {
      try {
          //Making a http post request to the url
        await axios.post(url, payload);
      } catch (e) {
          //Let verify if the http status was successfully else let return and http response with the status
        if (![200, 201].includes(e?.response?.status)) {
          return res.status(e?.response?.status).json({
            error: `Failed to publish to ${url} status code: ${e?.response?.status}`,
          });
        }
      }
    }
    return res.status(201).json();
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
};

//Exporting the Subscribe function
exports.subscribe = async (req, res) => {
  try {
      //Deconstructing the request params
    const { topic } = req.params;
    //Deconstructing the request body
    const { url } = req.body;

    //Let construct a new payload
    const formData = {
      topic,
      url,
    };

    //Let add item to the list
    await db.create(formData);

    return res.status(201).json({
      url,
      topic,
    });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
};
