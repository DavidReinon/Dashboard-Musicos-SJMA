import {
    createClient,
    SupabaseClient,
    PostgrestResponse,
    QueryData,
} from "@supabase/supabase-js";
import { Database } from "../types/supabase";

const supabase: SupabaseClient = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROL_KEY as string
);

const fetchMusicianTable = async () => {
    const { data, error } = await supabase.from("musician").select(`
        id,
        display_name,
        instrument (
            display_name
        )`);
    if (error) {
        throw new Error(`Error fetching data from musician: ${error.message}`);
    }
    return data;
};

const fetchEventsTable = async () => {
    const { data, error } = await supabase.from("event").select("*");
    if (error) {
        throw new Error(`Error fetching data from event: ${error.message}`);
    }
    return data;
};

const fetchSelectionsTable = async () => {
    const { data, error } = await supabase.from("selection").select("*");
    if (error) {
        throw new Error(`Error fetching data from selection: ${error.message}`);
    }
    return data;
};

const fetchInstrumentsTable = async () => {
    const { data, error } = await supabase.from("instrument").select("*");
    if (error) {
        throw new Error(`Error fetching data from instrument: ${error.message}`);
    }
    return data;
};

// Function to fetch data from a table
const fetchFromTable = async (tableName: string) => {
    const { data, error } = await supabase.from(tableName).select("*");
    if (error) {
        throw new Error(
            `Error fetching data from ${tableName}: ${error.message}`
        );
    }
    return data;
};

// Function to insert data into a table
async function insertIntoTable(tableName: string, data: any) {
    const { data: insertedData, error } = await supabase
        .from(tableName)
        .insert(data);
    if (error) {
        throw new Error(
            `Error inserting data into ${tableName}: ${error.message}`
        );
    }
    return insertedData;
}

// Function to update data in a table
async function updateTable(
    tableName: string,
    data: any,
    condition: any
): Promise<PostgrestResponse<any>> {
    const { data: updatedData, error } = await supabase
        .from(tableName)
        .update(data)
        .match(condition);
    if (error) {
        throw new Error(
            `Error updating data in ${tableName}: ${error.message}`
        );
    }
    return updatedData;
}

// Function to delete data from a table
async function deleteFromTable(
    tableName: string,
    condition: any
): Promise<PostgrestResponse<any>> {
    const { data: deletedData, error } = await supabase
        .from(tableName)
        .delete()
        .match(condition);
    if (error) {
        throw new Error(
            `Error deleting data from ${tableName}: ${error.message}`
        );
    }
    return deletedData;
}

export {
    fetchMusicianTable,
    fetchEventsTable,
    fetchSelectionsTable,
    fetchInstrumentsTable,
    fetchFromTable,
    insertIntoTable,
    updateTable,
    deleteFromTable,
};
