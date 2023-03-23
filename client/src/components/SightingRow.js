import React from 'react';
import { Table } from 'semantic-ui-react'

function SightingRow(props) {
    return (
        <Table.Row>
            <Table.Cell>{props.nickname}</Table.Cell>
            <Table.Cell>{props.species}</Table.Cell>
            <Table.Cell>{props.date}</Table.Cell>
            <Table.Cell>{props.time}</Table.Cell>
            <Table.Cell>{props.longitude}</Table.Cell>
            <Table.Cell>{props.latitude}</Table.Cell>
            <Table.Cell>{props.healthy ? "Healthy" : "Unhealthy"}</Table.Cell>
            <Table.Cell>{props.sighted_by}</Table.Cell>
        </Table.Row>
    );
}

export default SightingRow;