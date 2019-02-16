// This script helps to fetch data from a popular API source
// Only for personal use!
// P.S. Break or exit of process should be done manually (Ctr + C)
// Date: 17.02.19
// Author: Elmatsidis Paul
// Email: p.elmatsidis@gmail.com

const fetch = require("node-fetch");
var mysql = require("mysql2");
var id = 110;   // Start fetching ID
var url = `https://www.XXXXXXXXapi.com/api/0.3/?callback=?&cmd=getModel&model=75420&model=`;
var INTERVAL_DELAY = 1500;    // Extremely important in order to not be BLOCKED

var sql = `INSERT INTO cars_queryapi 
    (
      model_id, model_make_id, model_name, model_trim, model_year, model_body,
      model_engine_position, model_engine_cc, model_engine_cyl, model_engine_type, model_engine_valves_per_cyl, model_engine_power_ps, 
      model_engine_power_rpm, model_engine_torque_nm, model_engine_torque_rpm, model_engine_bore_mm, model_engine_stroke_mm, model_engine_compression,
      model_engine_fuel, model_top_speed_kph, model_0_to_100_kph, model_drive, model_transmission_type, model_seats,
      model_doors, model_weight_kg, model_length_mm, model_width_mm, model_height_mm, model_wheelbase_mm,
      model_lkm_hwy, model_lkm_mixed, model_lkm_city, model_fuel_cap_l, model_sold_in_us, model_co2,
      model_make_display, model_engine_l, model_engine_ci, model_engine_bore_in, model_engine_stroke_in, model_engine_valves,
      model_engine_power_hp, model_engine_power_kw, model_engine_torque_lbft, model_engine_torque_kgm, model_top_speed_mph, model_weight_lbs,
      model_length_in, model_width_in, model_height_in, model_wheelbase_in, model_mpg_hwy, model_mpg_city,
      model_mpg_mixed, model_fuel_cap_g, make_display, make_country, last_updated
  ) VALUES ?`;

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "rent_car"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to db!");

  setInterval(function(){
    id++;

    let result = getData(`${url}${id}`).then(jsonObj => {
      // If data exist
      if (jsonObj["model_id"]) {
        let values = [];
        let valuesFromObject = Object.values(jsonObj);
        
        // remove last two empty items
        valuesFromObject.splice(-1,1);
        valuesFromObject.splice(-1,1);        
        valuesFromObject.push(new Date().toISOString().slice(0, 19).replace("T", " "));
        values.push(valuesFromObject);
        
        con.query(sql, [values], function(err, result) {
          if (err) {
            // Catch if the value is not unique when storing in MySql 
            if (err["code"] === "ER_DUP_ENTRY") {
              console.log("Duplicate ID has found!");
            } 
          } else {
            // throw err;   // We don't want to stop fetching
          }

          console.log("Current ID: ", id);
        });
      }
    });
  }, INTERVAL_DELAY);
});

const getData = async url => {
  try {
    const response = await fetch(url);
    const json = await response.text();

    // Parse it cause we are getting not full json response
    let subst = json.substring(2, json.length - 2);

    // If any data
    if (subst.includes("model_id")) {
      let jsonObj = JSON.parse(subst);
      return jsonObj[0];
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};
