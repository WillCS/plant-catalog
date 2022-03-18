const express = require("express");
const disk    = require("diskusage");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("postgres://postgres:postgress@localhost:5432/plant-catalog");

const app = express();
const port = 3000;

sequelize.authenticate().then(() => {
  console.log("it worked");
}).catch(err => {
  console.log(err);
});

/** ENDPOINTS
 *  GET    /plants/?query
 *  POST   /plant
 *  GET    /plant/:plant_id
 *  PUT    /plant/:plant_id
 *  DELETE /plant/:plant_id
 *  GET    /plant/:plant_id/images
 *  POST   /plant/:plant_id/image
 *  GET    /plant/:plant_id/image/:image_id
 *  DELETE /plant/:plant_id/image/:image_id
 */

app.get("/plants", (req, res) => {
  Plant.findAll({ where: req.query }).then(results => {
    res.send(results.map(r => r.toJSON()));
  });
});

app.post("/plant", (req, res) => {
  res.send(req.body);
  // Plant.create(req.body)
});

app.get("/plant/:plant_id", () => {});

app.put("/plant/:plant_id", () => {});

app.delete("/plant/:plant_id", () => {});

app.get("/plant/:plant_id/images", () => {});

app.post("/plant/:plant_id/image", () => {});

app.get("/plant/:plant_id/image/:image_id?", () => {});

app.delete("/plant/:plant_id/image/:image_id", () => {});

const Plant = sequelize.define("Plant", {
  plant_id: {
    type:          DataTypes.INTEGER,
    primaryKey:    true,
    autoIncrement: true
  },
  species: {
    type: DataTypes.STRING(128),
  },
  colloquial_name: {
    type: DataTypes.STRING(128)
  },
  nickname: {
    type: DataTypes.STRING(128)
  },
  help_url: {
    type: DataTypes.STRING(128)
  },
  notes: {
    type: DataTypes.STRING(1024)
  }
}, {
  tableName:  "plants",
  timestamps: false
});

const Image = sequelize.define("Image", {
  image_id: {
    type:          DataTypes.INTEGER,
    primaryKey:    true,
    autoIncrement: true
  },
  plant_id: {
    type:       DataTypes.INTEGER,
    allowNull: false
  },
  image_url: {
    type:      DataTypes.STRING(256),
    allowNull: false
  },
  image_date: {
    type:      DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName:  "images",
  timestamps: false
});

// app.get("/disk", (req, res) => {
//   disk.check("/").then(usage => {
//     const used = usage.total - usage.free;
//     res.send(`Used: ${100 * used / usage.total}%`);
//   });
// });

// app.get("/search/:query?", (req, res) => {
//   const query = req.params.query;

//   Plant.findAll({ where: { species: query }}).then(result => {
//     res.send(result.map(r => r.toJSON()));
//   }).catch(err => {
//     res.send(err);
//   });
// });

// app.get("/add/:species?", (req, res) => {
//   const species = req.params.species;
  
//   const newPlant = Plant.build({
//     species: species
//   });

//   newPlant.save().then(result => {
//     res.send(result.toJSON());
//   }).catch(err => {
//     res.send(err);
//   });
// });

app.listen(port, () => {
  console.log("We running!");
});
