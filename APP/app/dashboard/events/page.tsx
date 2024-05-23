"use client";

import React, { useEffect, useState } from "react";
import DataTable from "@/src/components/DataTable";
import { supabaseClient } from "@/src/services/supabase";
import { ToastAction } from "@/src/components/ui/toast";
import { useToast } from "@/src/components/ui/use-toast";

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

type Event = Awaited<ReturnType<typeof getEventData>>[number];

const getEventData = async () => {
    const { data, error } = await supabaseClient
        .from("event")
        .select(`id, display_name, date`)
        .order("date", { ascending: false });
    if (error) {
        throw new Error();
    }
    return data;
};

//Events = Ensayos
const eventsScreen = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const toast = useToast();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getEventData();
                setEvents(data);
            } catch (error) {
                toast({
                    id: 'error',
                    title: "Error.",
                    description: "No se han podido cargar los ensayos...",
                });
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <DataTable
                title="Ensayos"
                columns={columns}
                data={events}
                emptyContent="No se han podido cargar los ensayos..."
            />
        </div>
    );
};

export default eventsScreen;
