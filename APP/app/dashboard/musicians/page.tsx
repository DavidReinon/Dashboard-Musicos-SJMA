//Musicos
"use client";

import React from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    getKeyValue,
} from "@nextui-org/table";

const rows = [
    {
        key: "1",
        display_name: "Tony Reichert",
        instrument: "CEO",
        id: "12",
    },
    {
        key: "2",
        display_name: "Zoey Lang",
        instrument: "Technical Lead",
        id: "24",
    },
    {
        key: "3",
        display_name: "Jane Fisher",
        instrument: "Senior Developer",
        id: "15",
    },
    {
        key: "4",
        display_name: "William Howard",
        instrument: "Community Manager",
        id: "8",
    },
];

const columns = [
    {
        key: "display_name",
        label: "NAME",
    },
    {
        key: "instrument",
        label: "INSTRUMENT",
    },
    {
        key: "id",
        label: "ID",
    },
];

const musiciansScreen = () => {
    return (
        <div>
            <Table aria-label="Example table with dynamic content">
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.key}>
                            {column.label}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={rows}>
                    {(item) => (
                        <TableRow key={item.key}>
                            {(columnKey) => (
                                <TableCell>
                                    {getKeyValue(item, columnKey)}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default musiciansScreen;
