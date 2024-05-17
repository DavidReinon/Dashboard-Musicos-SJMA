"use client";

import React, { useEffect, useState } from "react";
import { fetchInstrumentsTable } from "@/src/services/supabaseDBQuerys";
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

const instrumentsScreen = () => {
    const [instruments, setInstruments] = useState<InstrumentData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchInstrumentsTable();
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
                columns={columns}
                data={instruments}
                emptyContent="No se han podido cargar los instrumentos..."
            />
        </div>
    );
};

export default instrumentsScreen;