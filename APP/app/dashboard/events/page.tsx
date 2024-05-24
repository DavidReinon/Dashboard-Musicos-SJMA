"use client";

import React, { useState } from "react";
import DataTable from "@/src/components/DataTable";
import { supabaseClient } from "@/src/services/supabase";
import { useToast, type ToastType } from "@/src/components/ui/use-toast";
import { useMount } from "react-use";
import { Tables } from "@/src/types/supabase";
import { Spinner } from "@nextui-org/react";

type Event = Tables<"event">;

// Define las columnas fuera del componente
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

const EventsScreen = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useMount(async () => setEvents(await getEventData(toast)));

    const getEventData = async (toast: ToastType): Promise<Event[]> => {
        const { data, error } = await supabaseClient
            .from("event")
            .select(`id, display_name, date`)
            .order("date", { ascending: false });

        if (error) {
            toast({
                title: "Error.",
                description: "No se han podido cargar los ensayos...",
            });
            setLoading(false);
            return [];
        }

        setLoading(false);
        return data || [];
    };

    return (
        <>
            {loading ? (
                <Spinner size="lg" />
            ) : (
                <DataTable title="Ensayos" columns={columns} data={events} />
            )}
        </>
    );
};

export default EventsScreen;
