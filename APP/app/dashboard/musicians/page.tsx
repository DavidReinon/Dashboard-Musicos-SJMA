"use client";

import React, { useEffect, useState } from "react";
import { fetchMusicianTable } from "@/src/services/supabaseDBQuerys";
import DataTable from "@/src/components/DataTable";

const columns = [
    {
        key: "display_name",
        label: "NOMBRE",
    },
    {
        key: "instrument",
        label: "INSTRUMENTO",
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
    const [musicians, setMusicians] = useState<any[]>([]);

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
            <DataTable
                columns={columns}
                data={musicians}
                emptyContent="No se han podido cargar los musicos..."
            />
        </div>
    );
};

export default musiciansScreen;
