import React, { useReducer } from "react";
import { Form, Card } from "semantic-ui-react";

const initialState = {
  username: "",
  email: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "editUsername":
      return { ...state, username: action.value };

    case "editEmail":
      return { ...state, email: action.value };

    case "wipe":
      return { ...initialState };
    default:
      return state;
  }
}

function NewUser(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = state;
      const response = await fetch("http://localhost:8080/api/users", {
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
    <Card color="brown">
      <Card.Content>
        <Card.Header>New User</Card.Header>
        <Form
          id="userSubmission"
          action="#userSubmission"
          onSubmit={onSubmitForm}
        >
          <Form.Input
            label="Username"
            required
            value={state.username}
            onChange={(e) => {
              dispatch({ type: "editUsername", value: e.target.value });
            }}
          />
          <Form.Input
            label="Email"
            required
            value={state.email}
            onChange={(e) => {
              dispatch({ type: "editEmail", value: e.target.value });
            }}
          />

          <Form.Button id="submitUser" type="submit" content="Submit" />
        </Form>
      </Card.Content>
    </Card>
  );
}

export default NewUser;
