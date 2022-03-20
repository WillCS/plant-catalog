const express = require("express");
const disk    = require("diskusage");
const { Sequelize, DataTypes, STRING, INTEGER } = require("sequelize");

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

app.get("/plant/:plant_id", (req, res) => {
  Plant.findByPk(req.params.plant_id).then(result => {
    if(result) {
      res.send(result.toJSON());
    } else {
      res.sendStatus(404);
    }
  }).catch(err => {
    res.sendStatus(404);
  });
});

app.put("/plant/:plant_id", () => {});

app.delete("/plant/:plant_id", (req, res) => {
  Plant.destroy({ where: { plant_id: req.params.plant_id }}).then(result => {
    res.sendStatus(200);
  }).catch(err => {
    res.sendStatus(404);
  });
});

app.get("/plant/:plant_id/images", () => {});

app.post("/plant/:plant_id/image", () => {});

app.get("/plant/:plant_id/image/:image_id?", () => {});

app.delete("/plant/:plant_id/image/:image_id", () => {});

const LightLevelEnum = DataTypes.ENUM('indirect', 'partial', 'full');
const AcidityEnum    = DataTypes.ENUM('basic', 'slightly_basic', 'neutral', 'slightly_acidic', 'acidic');

const Plant = sequelize.define("Plant", {
  plant_id: {
    type:          DataTypes.INTEGER,
    primaryKey:    true,
    autoIncrement: true
  },
  species:              { type: DataTypes.STRING(128) },
  colloquial_name:      { type: DataTypes.STRING(128) },
  nickname:             { type: DataTypes.STRING(128) },
  watering_schedule_id: { type: INTEGER },
  light_needs:          { type: LightLevelEnum },
  feeding_schedule_id:  { type: INTEGER },
  ph_needs:             { type: AcidityEnum },
  help_url:             { type: DataTypes.STRING(128) },
  notes:                { type: DataTypes.STRING(1024) }
}, {
  tableName:  "plants",
  timestamps: false,
  validate: {
    isNamed() {
      if(!(this.nickname || this.species || this.colloquial_name)) {
        throw new Error("Plant must be named.")
      }
    }
  }
});

const Image = sequelize.define("Image", {
  image_id: {
    type:          DataTypes.INTEGER,
    primaryKey:    true,
    autoIncrement: true
  },
  plant_id: { type: DataTypes.INTEGER,     allowNull: false },
  filename: { type: DataTypes.STRING(256), allowNull: false },
  date:     { type: DataTypes.DATE,        allowNull: false }
}, {
  tableName:  "images",
  timestamps: false
});

const WateringSchedule = sequelize.define("WateringSchedule", {
  schedule_id: {
    type:          DataTypes.INTEGER,
    primaryKey:    true,
    autoIncrement: true
  },
  name:     { type: STRING(128), allowNull: false },
  filename: { type: STRING(256), allowNull: false }
}, {
  tableName:  "watering_schedules",
  timestamps: false
});

const FeedingSchedules = sequelize.define("FeedingSchedule", {
  schedule_id: {
    type:          DataTypes.INTEGER,
    primaryKey:    true,
    autoIncrement: true
  },
  name:     { type: STRING(128), allowNull: false },
  filename: { type: STRING(256), allowNull: false }
}, {
  tableName:  "feeding_schedules",
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
