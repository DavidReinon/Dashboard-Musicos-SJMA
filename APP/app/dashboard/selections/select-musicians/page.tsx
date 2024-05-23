"use client";

import React, { useState, useEffect } from "react";
import { useSelection } from "@/src/contexts/selections/createSelectionContext";
import DataTable from "@/src/components/DataTable";
import { useMount } from "react-use";
import { supabaseClient } from "@/src/services/supabase";

type Musician = Awaited<ReturnType<typeof getData>>[number];

export const getData = async () => {
    const { data, error } = await supabaseClient
        .from("musician")
        .select(`id, display_name, instrument(display_name, order)`)
        .order("instrument(order)")
        .order("display_name");

    if (error) {
        //TODO: alert
        console.error(`Error fetching data from musician`);
        return [];
    }

    const parsedData = data.map((musician) => ({
        id: musician.id,
        display_name: musician.display_name,
        instrument: musician.instrument!.display_name,
    }));
    return parsedData;
};

const SelectMusiciansScreen: React.FC = () => {
    const { musiciansSelection, setMusiciansSelection } = useSelection();
    const [allMusicians, setAllMusicians] = useState<Musician[]>([]);

    useMount(async () => setAllMusicians(await getData()));

    return (
        <div>
            <h1 className="my-5 text-3xl font-bold text-left">
                Selecciona a los musicos
            </h1>
            <DataTable
                columns={[
                    { key: "display_name", label: "Nombre" },
                    { key: "instrument", label: "Instrumento" },
                ]}
                data={allMusicians}
                title="Musicos"
                emptyContent="No hay musicos disponibles"
                selectionMode="multiple"
                selectedKeys={musiciansSelection}
                onSelectionChange={(selection) =>
                    setMusiciansSelection(
                        selection === "all"
                            ? allMusicians.map((musician) => musician.id)
                            : (Array.from(selection) as string[])
                    )
                }
            />
        </div>
    );
};

export default SelectMusiciansScreen;
