import React from "react";
import { Grid } from "semantic-ui-react";
import NewAnimal from "./NewAnimal";
import NewSighting from "./NewSighting";
import NewSpecies from "./NewSpecies";
import NewUser from "./NewUser";

function MenuBar() {
  return (
    <Grid columns="equal">
      <Grid.Column>
        <NewUser />
      </Grid.Column>
      <Grid.Column>
        <NewSighting />
      </Grid.Column>
      <Grid.Column>
        <NewAnimal />
      </Grid.Column>
      <Grid.Column>
        <NewSpecies />
      </Grid.Column>
    </Grid>
  );
}

export default MenuBar;
