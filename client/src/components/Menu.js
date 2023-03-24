import React from "react";
import { Card } from "semantic-ui-react";
import NewAnimal from "./NewAnimal";
import NewSighting from "./NewSighting";
import NewSpecies from "./NewSpecies";
import NewUser from "./NewUser";

function MenuBar() {
  return (
    <div className="formMenu">
      <Card.Group centered>
        <NewUser />
        <NewSighting />
        <NewAnimal />
        <NewSpecies />
      </Card.Group>
    </div>
  );
}

export default MenuBar;
