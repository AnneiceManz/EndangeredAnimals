import React, { useReducer } from "react";
import { Form, Grid, Label } from "semantic-ui-react";

const initialState = {
  date: "",
  time: null,
  individual: "",
  longitude: "",
  latitude: "",
  healthy: null,
  submitted_by: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "editDate":
      return { ...state, date: action.value };

    case "editTime":
      return { ...state, time: action.value };

    case "editIndividual":
      return { ...state, individual: action.value };

    case "editLongitude":
      return { ...state, longitude: action.value };

    case "editLatitude":
      return { ...state, latitude: action.value };

    case "editHealthy":
      return { ...state, healthy: action.value };

    case "editSubmitted_by":
      return { ...state, submitted_by: action.value };

    case "wipe":
      return { ...initialState };
    default:
      return state;
  }
}


function NewSighting(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = state;
      const response = await fetch("http://localhost:8080/api/sightings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
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
              label="Individual's Id#"
              type="number"
              required
              value={state.individual}
              onChange={(e) => {
                dispatch({ type: "editIndividual", value: e.target.value });
              }}
            />
          <Form.Input
            label="Date:"
            type="date"
            required
            value={state.date}
            onChange={(e) => {
              dispatch({ type: "editDate", value: e.target.value });
            }}
          />
          <Form.Input
            label="Time:"
            type="time"
            value={state.time}
            onChange={(e) => {
              dispatch({ type: "editTime", value: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            label="Longitude:"
            required
            value={state.longitude}
            onChange={(e) => {
              dispatch({ type: "editLongitude", value: e.target.value });
            }}
          />
          <Form.Input
            label="Latitude:"
            required
            value={state.latitude}
            onChange={(e) => {
              dispatch({ type: "editLatitude", value: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Group widths="equal">

          <Form.Input
            label="Healthy?"
            required
            value={state.healthy}
            onChange={(e) => {
              dispatch({ type: "editHealthy", value: e.target.value });
            }} />

          <Form.Input
            label="Submitted By:"
            required
            type="number"
            value={state.submitted_by}
            onChange={(e) => {
              dispatch({ type: "editSubmitted_by", value: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Button id="submitUser" type="submit" content="Submit" />
      </Form>
    </Grid.Row>
  );
}

export default NewSighting;
