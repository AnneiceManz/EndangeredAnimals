import React, { useEffect, useState } from "react";
import SightingRow from "./SightingRow";
import { Table } from "semantic-ui-react";


function Sightings() {
  const [sightings, setSightings] = useState([]);

  const getSightings = () => {
    fetch("http://localhost:8080/api/sightings")
      .then((response) => response.json())
      .then((sightings) => {
        setSightings(sightings);
      });
  };

  const [species, setSpecies] = useState(null)
  const getSpecies=() => {
      fetch(`http://localhost:8080/api/species/${sightings[0].species}`)
      .then((response) => response.json())
      .then((species) => {
          setSpecies(species);
          console.log(species)
      })
  }
  
  
  //http://localhost:8080/api/user/13
  const [user, setUser] = useState(null)
  const getuser=() => {
      fetch(`http://localhost:8080/api/user/${sightings[0].submitted_by}`)
      .then((response) => response.json())
      .then((user) => {
          setUser(user);
          console.log(user)
      })
  }

  useEffect(() => {
    getSightings();
    // getuser();
    // getSpecies();
  }, []);

  const handleSpecies = () => {
    getSpecies();
  }

  const handleUser = () => {
    getuser();
  }

  return (
    <div className="sightingsTable">
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Nickname</Table.HeaderCell>
            <Table.HeaderCell onClick={handleSpecies}>Species</Table.HeaderCell>
            <Table.HeaderCell>Date Seen</Table.HeaderCell>
            <Table.HeaderCell>Time Seen</Table.HeaderCell>
            <Table.HeaderCell>Longitude</Table.HeaderCell>
            <Table.HeaderCell>Latitude</Table.HeaderCell>
            <Table.HeaderCell>Healthy</Table.HeaderCell>
            <Table.HeaderCell onClick={handleUser}>Submitted By</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sightings.map((sighting) => (
            <SightingRow
              key={sighting.sighting_id}
              nickname={sighting.nickname}
              species={ !species ? "TBD" : species.common_name}
              date={sighting.date}
              time={sighting.time}
              longitude={sighting.longitude}
              latitude={sighting.latitude}
              healthy={sighting.healthy}
              submitted_by={!user ? "TBD" : user.username}
            />
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default Sightings;
