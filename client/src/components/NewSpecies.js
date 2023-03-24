import React, { useReducer } from "react";
import { Form, Grid } from "semantic-ui-react";

const initialState = {
  common_name: "",
  scientific_name: "",
  num_in_wild: "",
  conservation_stat: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "editCommon_name":
      return { ...state, date: action.value };

    case "editScientific_name":
      return { ...state, time: action.value };

    case "editNum_in_wild":
      return { ...state, date: action.value };

    case "editConservation_stat":
      return { ...state, time: action.value };

    case "wipe":
      return { ...initialState };
    default:
      return state;
  }
}

function NewSpecies(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = state;
      const response = await fetch(
        "http://localhost:8080/api/species",
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
      <h3>New Species</h3>
      <Form
        id="userSubmission"
        action="#userSubmission"
        onSubmit={onSubmitForm}
      >
        <Form.Group widths="equal">
          <Form.Input
            label="Common Name"
            required
            value={state.common_name}
            onChange={(e) => {
              dispatch({ type: "editCommon_name", value: e.target.value });
            }}
          />
          <Form.Input
            label="Scientific Name"
            required
            value={state.scientific_name}
            onChange={(e) => {
              dispatch({ type: "editScientific_name", value: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            label="Number In Wild"
            type="number"
            required
            value={state.num_in_wild}
            onChange={(e) => {
              dispatch({ type: "editNum_in_wild", value: e.target.value });
            }}
          />
          <Form.Input
            label="Conservation Status"
            required
            value={state.conservation_stat}
            onChange={(e) => {
              dispatch({ type: "editConservation_stat", value: e.target.value });
            }}
          />
        </Form.Group>

        <Form.Button id="submitUser" type="submit" content="Submit" />
      </Form>
    </Grid.Row>
  );
}

export default NewSpecies;
