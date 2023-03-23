import React, { useState, useEffect } from 'react';
import { Table } from 'semantic-ui-react';

function SightingRow(props) {

    const [species, setSpecies] = useState([])
const getSpecies=() => {
    fetch(`http://localhost:8080/api/species/${props.species}`)
    .then((response) => response.json())
    .then((species) => {
        setSpecies(species);
        console.log(species)
    })
}

const [sighter, setSighter] = useState([])
const getSighter=() => {
    fetch(`http://localhost:8080/api/sighter/${props.sighted_by}`)
    .then((response) => response.json())
    .then((sighter) => {
        setSighter(sighter);
        console.log(sighter)
    })
}

useEffect(() => {
    getSpecies();
    getSighter();
  }, []);

  let username=sighter.username;
  let speciesName=species.common_name

    return (
        <Table.Row>
            <Table.Cell>{props.nickname}</Table.Cell>
            <Table.Cell>{speciesName}</Table.Cell>
            <Table.Cell>{props.date}</Table.Cell>
            <Table.Cell>{props.time}</Table.Cell>
            <Table.Cell>{props.longitude}</Table.Cell>
            <Table.Cell>{props.latitude}</Table.Cell>
            <Table.Cell>{props.healthy ? "Healthy" : "Unhealthy"}</Table.Cell>
            <Table.Cell>{username}</Table.Cell>
        </Table.Row>
    );
}

export default SightingRow;