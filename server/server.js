const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./db/db-connection.js");

const app = express();

const PORT = 8080;
app.use(cors());
app.use(express.json());

// creates an endpoint for the route /api
app.get("/", (req, res) => {
  res.json({ message: "Hello from My template ExpressJS" });
});

// GET all species request
app.get("/api/species", cors(), async (req, res) => {
  try {
    const allSpecies = await db.query("SELECT * FROM species");
    res.send(allSpecies.rows);
  } catch (e) {
    return res.status(400).json({ e });
  }
});


  
  //GET all individuals of one species
  app.get("/api/individual_animals/:species_id", cors(), async (req, res) => {
    try {
      const species_id = req.params.species_id;
      const allIndividualofSpecies = await db.query(
        "SELECT * FROM individual_animals JOIN species ON species=species_id WHERE species_id=$1",
        [species_id]
        );
        res.send(allIndividualofSpecies.rows);
      } catch (e) {
        return res.status(400).json({ e });
      }
    });
    
    //GET sightings of one individual animal
    app.get("/api/sightings/:individual_id", cors(), async (req, res) => {
      try {
        const indi_id = req.params.individual_id;
        const allIndividualSightings = await db.query(
          "SELECT sightings_id, nickname, species, sighted_by,date, time, longitude, latitude, healthy FROM sightings JOIN individual_animals ON individual=individual_id WHERE individual_id=$1",
          [indi_id]
          );
          res.send(allIndividualSightings.rows);
        } catch (e) {
          return res.status(400).json({ e });
        }
      });
      
      //GET all sighters/users
      app.get('/api/sighter', cors(), async (req, res) => {
        try {
          const allSighters = await db.query('SELECT * FROM sighter')
          res.send(allSighters.rows)
        } catch (error) {
          return res.status(400).json({ e })
        }
      })

      //GET all sightings of one user/sighter
app.get("/api/sightings/:sighter_id", cors(), async (req, res) => {
  try {
    const sighter_id = req.params.sighter_id;
    const allSighterSightings = await db.query(
      "SELECT * FROM sightings JOIN sighter ON sighted_by=sighter_id WHERE sighter_id=$1",
      [sighter_id]
    );
    res.send(allSighterSightings.rows);
  } catch (e) {
    return res.status(400).json({ e });
  }
});


      //POST new individual animal
app.post("/api/individual_animals", cors(), async (req, res) => {
  const newIndividual = {
    nickname: req.body.nickname,
    species: req.body.species,
  };
  console.log([newIndividual.nickname, newIndividual.species]);
  const result = await db.query(
    "INSERT INTO individual_animals(nickname, species) VALUES($1, $2) RETURNING *",
    [newIndividual.nickname, newIndividual.species]
  );
  console.log(result.rows[0]);
  res.json(result.rows[0]);
});


// POST species request
app.post("/api/species", cors(), async (req, res) => {
  const newSpecies = {
    common_name: req.body.common_name,
    scientific_name: req.body.scientific_name,
    num_in_wild: req.body.num_in_wild,
    conservation_stat: req.body.conservation_stat,
  };
  console.log([
    newSpecies.common_name,
    newSpecies.scientific_name,
    newSpecies.num_in_wild,
    newSpecies.conservation_stat,
  ]);
  const result = await db.query(
    "INSERT INTO species(common_name, scientific_name, num_in_wild, conservation_stat) VALUES($1, $2, $3, $4) RETURNING *",
    [
      newSpecies.common_name,
      newSpecies.scientific_name,
      newSpecies.num_in_wild,
      newSpecies.conservation_stat,
    ]
    );
    console.log(result.rows[0]);
    res.json(result.rows[0]);
  });



//POST new sighter/user
app.post("/api/sighter", cors(), async (req, res) => {
  const newSighter = {
    username: req.body.username,
    email: req.body.email,
  };
  console.log([newSighter.username, newSighter.email]);
  const result = await db.query(
    "INSERT INTO sighter(username, email) VALUES($1, $2) RETURNING *",
    [newSighter.username, newSighter.email]
  );
  console.log(result.rows[0]);
  res.json(result.rows[0]);
});

//POST new sighting
app.post("/api/sightings", cors(), async (req, res) => {
  const newSighting = {
    date: req.body.date,
    time: req.body.time,
    individual: req.body.individual,
    healthy: req.body.healthy,
    sighted_by: req.body.sighted_by,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
  };
  console.log([
    newSighting.date,
    newSighting.time,
    newSighting.individual,
    newSighting.healthy,
    newSighting.sighted_by,
    newSighting.longitude,
    newSighting.latitude,
  ]);
  const result = await db.query(
    "INSERT INTO sightings(date, time, individual, healthy, sighted_by, longitude, latitude) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
    [
      newSighting.date,
      newSighting.time,
      newSighting.individual,
      newSighting.healthy,
      newSighting.sighted_by,
      newSighting.longitude,
      newSighting.latitude,
    ]
  );
  console.log(result.rows[0]);
  res.json(result.rows[0]);
});

//A put request - Update a student
app.put("/api/students/:studentId", cors(), async (req, res) => {
  console.log(req.params);

  //This will be the id that I want to find in the DB - the student to be updated
  const studentId = req.params.studentId;
  const updatedStudent = {
    id: req.body.id,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };
  console.log("In the server from the url - the student id", studentId);
  console.log(
    "In the server, from the react - the student to be edited",
    updatedStudent
  );

  // UPDATE students SET lastname = "something" WHERE id="16";
  const query = `UPDATE students SET lastname=$1, firstname=$2 WHERE id=${studentId} RETURNING *`;
  const values = [updatedStudent.lastname, updatedStudent.firstname];
  try {
    const updated = await db.query(query, values);
    console.log(updated.rows[0]);
    res.send(updated.rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

//DELETE individual animal request
app.delete(
  "/api/individual_animals/:individual_id",
  cors(),
  async (req, res) => {
    // console.log(req.params)
    const indi_id = req.params.individual_id;
    //DELETE FROM students WHERE id=id
    await db.query("DELETE FROM individual_animals WHERE individual_id=$1", [
      indi_id,
    ]);
    res.status(200).end();
  }
);

//DELETE sighter/user
app.delete("/api/sighter/:sighter_id", cors(), async (req, res) => {
  const sighter_id = req.params.sighter_id;
  await db.query("DELETE FROM sighter WHERE sighter_id=$1", [sighter_id]);
  res.status(200).end();
});

//DELETE species
app.delete("/api/species/:species_id", cors(), async (req, res) => {
  const species_id = req.params.species_id;
  await db.query("DELETE FROM species WHERE species_id=$1", [species_id]);
  res.status(200).end();
});

//DELETE sighting
app.delete("/api/sightings/:sightings_id", cors(), async (req, res) => {
  const sightings_id = req.params.sightings_id;
  await db.query("DELETE FROM sightings WHERE sightings_id=$1", [sightings_id]);
  res.status(200).end();
});

// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
