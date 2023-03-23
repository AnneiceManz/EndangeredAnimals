import React, { useEffect, useState } from "react";
import SightingRow from "./SightingRow";
import { Table } from "semantic-ui-react";

function Sightings() {
  const [sightings, setSightings] = useState([]);

//   const getSightings = async () => {
//     try {
//       const response = await fetch("http://localhost:8080/api/sightings/");
//       const sightings = await response.json;
//       setSightings(sightings);
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

  const getSightings = () => {
    fetch("http://localhost:8080/api/sightings")
      .then((response) => response.json())
      .then((sightings) => {
        setSightings(sightings);
        console.log(sightings)
      });
  };

  useEffect(() => {
    getSightings();
  }, []);

  return (
    <div className="sightingsTable">
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Nickname</Table.HeaderCell>
            <Table.HeaderCell>Species</Table.HeaderCell>
            <Table.HeaderCell>Date Seen</Table.HeaderCell>
            <Table.HeaderCell>Time Seen</Table.HeaderCell>
            <Table.HeaderCell>Longitude</Table.HeaderCell>
            <Table.HeaderCell>Latitude</Table.HeaderCell>
            <Table.HeaderCell>Healthy</Table.HeaderCell>
            <Table.HeaderCell>Submitted By</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sightings.map((sighting) => (
            <SightingRow
              key={sighting.sighting_id}
              nickname={sighting.nickname}
              species={sighting.species}
              date={sighting.date}
              time={sighting.time}
              longitude={sighting.longitude}
              latitude={sighting.latitude}
              healthy={sighting.healthy}
              sighted_by={sighting.sighted_by}
            />
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default Sightings;
