import React from 'react';
import { Grid } from 'semantic-ui-react'
import NewUser from './NewUser';

function MenuBar() {
    return (
        <Grid columns='equal'>
            <Grid.Column>
                <NewUser  />
            </Grid.Column>
            <Grid.Column>
                New Sighting
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