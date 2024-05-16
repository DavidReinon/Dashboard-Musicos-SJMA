"use client";

import React, { useEffect, useState } from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    getKeyValue,
} from "@nextui-org/table";
import { fetchMusicianTable } from "@/src/services/supabaseDBQuerys";

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

type MusicianData = {
    id: string;
    display_name: string;
    instrument: string;
};

const musiciansScreen = () => {
    const [musicians, setMusicians] = useState<MusicianData[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchMusicianTable();
                const adjustedData = data.map(
                    (item: {
                        id: any;
                        display_name: any;
                        instrument: any;
                    }) => ({
                        id: item.id,
                        display_name: item.display_name,
                        instrument: item.instrument?.display_name || "",
                    })
                );
                setMusicians(adjustedData);
            } catch (error) {
                console.error("Error fetching musicians data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            {musicians !== null ? (
                <Table  aria-label="Musicians table">
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn key={column.key}>
                                {column.label}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={musicians}>
                        {(item: any) => (
                            <TableRow key={item.id}>
                                {(columnKey) => (
                                    <TableCell>
                                        {getKeyValue(item, columnKey)}
                                    </TableCell>
                                )}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default musiciansScreen;
