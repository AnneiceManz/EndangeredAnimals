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

  // //http://localhost:8080/api/user/13
  // const [users, setusers] = useState(null)
  // const getuser=() => {
  //     fetch(`http://localhost:8080/api/user/${props.sighted_by}`)
  //     .then((response) => response.json())
  //     .then((user) => {
  //         setusers(user);
  //         // console.log(user)
  //     })
  // }

  // useEffect(() => {
  //     getSpecies();
  //     getuser();
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
      <Table.Cell>{props.submitted_by}</Table.Cell>
    </Table.Row>
  );
}

export default SightingRow;
