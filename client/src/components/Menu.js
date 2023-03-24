import React from 'react';
import { Grid } from 'semantic-ui-react'
import NewSighting from './NewSighting';
import NewUser from './NewUser';

function MenuBar() {
    return (
        <Grid columns='equal'>
            <Grid.Column>
                <NewUser  />
            </Grid.Column>
            <Grid.Column>
                <NewSighting />
            </Grid.Column>
            <Grid.Column>
                New Animal
            </Grid.Column>
            <Grid.Column>
                New Species
            </Grid.Column>
        </Grid>
    );
}

export default MenuBar;