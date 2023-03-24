import React, { useReducer } from "react";
import { Form, Grid } from "semantic-ui-react";

const initialState = {
  nickname: "",
  species: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "editNickname":
      return { ...state, date: action.value };

    case "editSpecies":
      return { ...state, time: action.value };

    case "wipe":
      return { ...initialState };
    default:
      return state;
  }
}

function NewAnimal(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = state;
      const response = await fetch(
        "http://localhost:8080/api/individual_animals",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      dispatch({ type: "wipe", value: { initialState } });
      window.location = "/";
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Grid.Row>
      <h3>New Animal</h3>
      <Form
        id="userSubmission"
        action="#userSubmission"
        onSubmit={onSubmitForm}
      >
        <Form.Group widths="equal">
          <Form.Input
            label="Species Id#"
            type="number"
            required
            value={state.species}
            onChange={(e) => {
              dispatch({ type: "editSpecies", value: e.target.value });
            }}
          />
          <Form.Input
            label="Nickname"
            required
            value={state.nickname}
            onChange={(e) => {
              dispatch({ type: "editNickname", value: e.target.value });
            }}
          />
        </Form.Group>

        <Form.Button id="submitUser" type="submit" content="Submit" />
      </Form>
    </Grid.Row>
  );
}

export default NewAnimal;
