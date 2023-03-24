import React from 'react';
import { Menu } from 'semantic-ui-react'

function MenuBar() {
    return (
        <Menu>
            <Menu.Item>
                New User
            </Menu.Item>
            <Menu.Item>
                New Sighting
            </Menu.Item>
            <Menu.Item>
                New Animal
            </Menu.Item>
            <Menu.Item>
                New Species
            </Menu.Item>
        </Menu>
    );
}

export default MenuBar;