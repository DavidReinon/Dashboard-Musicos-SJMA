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
        key: "order",
        label: "ORDEN",
    },
];

type InstrumentData = {
    display_name: string;
    order: number;
};

const getIntrumentData = async () => {
    const { data, error } = await supabaseClient
        .from("instrument")
        .select(`id, display_name, order`)
        .order("order");
    if (error) {
        throw new Error();
    }
    return data;
};

const instrumentsScreen = () => {
    const [instruments, setInstruments] = useState<InstrumentData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getIntrumentData();
                setInstruments(data);
            } catch (error) {
                console.error("Error fetching instruments data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <DataTable
                title="Instrumentos"
                columns={columns}
                data={instruments}
                emptyContent="No se han podido cargar los instrumentos..."
            />
        </div>
    );
};

export default instrumentsScreen;
