"use client";

import React, { useEffect, useState } from "react";
import { fetchEventsTable } from "@/src/services/supabaseDBQuerys";
import DataTable from "@/src/components/DataTable";

const columns = [
    {
        key: "display_name",
        label: "NOMBRE",
    },
    {
        key: "date",
        label: "FECHA",
    },
];

type EventData = {
    display_name: string;
    date: Date;
};

//Events = Ensayos
const eventsScreen = () => {
    const [events, setEvents] = useState<EventData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchEventsTable() as EventData[];
                setEvents(data);
            } catch (error) {
                console.error("Error fetching events data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <DataTable
                columns={columns}
                data={events}
                emptyContent="No se han podido cargar los ensayos..."
            />
        </div>
    );
};

export default eventsScreen;
