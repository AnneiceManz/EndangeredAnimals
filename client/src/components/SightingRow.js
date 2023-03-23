import React from "react";
import { Table } from "semantic-ui-react";

function SightingRow(props) {
  //     const [species, setSpecies] = useState('')
  // const getSpecies=() => {
  //     fetch(`http://localhost:8080/api/species/${props.species}`)
  //     .then((response) => response.json())
  //     .then((species) => {
  //         setSpecies(species);
  //         // console.log(species)
  //     })
  // }

  // //http://localhost:8080/api/sighter/13
  // const [sighters, setSighters] = useState(null)
  // const getSighter=() => {
  //     fetch(`http://localhost:8080/api/sighter/${props.sighted_by}`)
  //     .then((response) => response.json())
  //     .then((sighter) => {
  //         setSighters(sighter);
  //         // console.log(sighter)
  //     })
  // }

  // useEffect(() => {
  //     getSpecies();
  //     getSighter();
  //   }, []);

  return (
    <Table.Row>
      <Table.Cell>{props.nickname}</Table.Cell>
      <Table.Cell>{props.species}</Table.Cell>
      <Table.Cell>{props.date}</Table.Cell>
      <Table.Cell>{props.time}</Table.Cell>
      <Table.Cell>{props.longitude}</Table.Cell>
      <Table.Cell>{props.latitude}</Table.Cell>
      <Table.Cell>{props.healthy ? "Healthy" : "Unhealthy"}</Table.Cell>
      <Table.Cell>{props.sighter ? props.sighter : null}</Table.Cell>
    </Table.Row>
  );
}

export default SightingRow;
