const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db/db-connection.js');

const app = express();

const PORT = 8080;
app.use(cors());
app.use(express.json());

// creates an endpoint for the route /api
app.get('/', (req, res) => {
  res.json({ message: 'Hello from My template ExpressJS' });
});

// GET all species request
app.get('/api/species', cors(), async (req, res) => {
  try {
    const allSpecies = await db.query('SELECT * FROM species');
    res.send(allSpecies.rows);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

// POST species request
app.post('/api/species', cors(), async (req, res) => {
  const newSpecies = {
    common_name: req.body.common_name,
    scientific_name: req.body.scientific_name,
    num_in_wild: req.body.num_in_wild,
    conservation_stat: req.body.conservation_stat
  };
  console.log([newSpecies.common_name, newSpecies.scientific_name, newSpecies.num_in_wild, newSpecies.conservation_stat]);
  const result = await db.query(
    'INSERT INTO species(common_name, scientific_name, num_in_wild, conservation_stat) VALUES($1, $2, $3, $4) RETURNING *',
    [newSpecies.common_name, newSpecies.scientific_name, newSpecies.num_in_wild, newSpecies.conservation_stat],
  );
  console.log(result.rows[0]);
  res.json(result.rows[0]);
});

//GET all individuals of one species
app.get('/api/individual_animals/:species_id', cors(), async (req, res) => {
  try {
    const species_id=req.params.species_id
    const allIndividualofSpecies = await db.query('SELECT * FROM individual_animals JOIN species ON species=species_id WHERE species_id=$1', [species_id]);
    res.send(allIndividualofSpecies.rows);
  } catch (e) {
    return res.status(400).json({ e });
  }
});



//GET sightings of one individual animal
app.get('/api/individual_animals/:individual_id', cors(), async (req, res) => {
  try {
    const indi_id=req.params.individual_id
    const allIndividualSightings = await db.query('SELECT sightings_id, species, sighted_by,date, time, longitude, latitude, healthy FROM sightings JOIN individual_animals ON individual=individual_id WHERE individual_id=$1', [indi_id]);
    res.send(allIndividualSightings.rows);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

//GET all sightings of one user/sighter
app.get('/api/sightings/:sighter_id', cors(), async (req, res) => {
  try {
    const sighter_id=req.params.sighter_id
    const allSighterSightings = await db.query('SELECT * FROM sightings JOIN sighter ON sighted_by=sighter_id WHERE sighter_id=$1', [sighter_id]);
    res.send(allSighterSightings.rows);
  } catch (e) {
    return res.status(400).json({ e });
  }
});


//A put request - Update a student 
app.put('/api/students/:studentId', cors(), async (req, res) =>{
  console.log(req.params);


  //This will be the id that I want to find in the DB - the student to be updated
  const studentId = req.params.studentId
  const updatedStudent = { id: req.body.id, firstname: req.body.firstname, lastname: req.body.lastname}
  console.log("In the server from the url - the student id", studentId);
  console.log("In the server, from the react - the student to be edited", updatedStudent);


  // UPDATE students SET lastname = "something" WHERE id="16";
  const query = `UPDATE students SET lastname=$1, firstname=$2 WHERE id=${studentId} RETURNING *`;
  const values = [updatedStudent.lastname, updatedStudent.firstname];
  try {
    const updated = await db.query(query, values);
    console.log(updated.rows[0]);
    res.send(updated.rows[0]);

  }catch(e){
    console.log(e);
    return res.status(400).json({e})
  }
})

//endpoint for DELETE student request
app.delete('/api/students/:studentId', cors(), async (req, res) =>{
  // console.log(req.params)
  const studentId = req.params.studentId
  //DELETE FROM students WHERE id=id
  await db.query('DELETE FROM students WHERE id=$1', [studentId])
  res.status(200).end();
});


// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
