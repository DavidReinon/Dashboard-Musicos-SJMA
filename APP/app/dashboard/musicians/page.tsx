"use client";

import React, { useEffect, useState } from "react";
import { supabaseClient } from "@/src/services/supabase";
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

type Musician = {
    display_name: string;
    instrument: string;
};

const getIntrumentData = async () => {
    const { data, error } = await supabaseClient
        .from("musician")
        .select(`id, display_name, instrument(display_name)`)
        .order("display_name");
    if (error) {
        throw new Error();
    }
    return data;
};

const musiciansScreen = () => {
    const [musicians, setMusicians] = useState<Musician[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getIntrumentData();
                const adjustedData = data.map(
                    (item: {
                        id: string;
                        display_name: string;
                        instrument: { display_name: string } | null;
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
                title="Musicos"
                columns={columns}
                data={musicians}
                emptyContent="No se han podido cargar los musicos..."
            />
        </div>
    );
};

export default musiciansScreen;
