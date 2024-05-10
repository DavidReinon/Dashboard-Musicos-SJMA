"use client";

import { useEffect, useState } from "react";
import Papa from "papaparse";

const CSVImporter: React.FC = () => {
    const [data, setData] = useState<CsvData[] | null>(null);
    const [headers, setHeaders] = useState<string[] | null>(null);
    const [musicians, setMusicians] = useState<
        Array<{ id: string; display_name: string; instrument: string }>
    >([]);
    //REVIEW: Preguntar si se puede hacer un array de eventos, donde cada evento tiene un array de musicos
    /*
    Informacion de los eventos, y aparte la asistencia de cada musisco al avento,
    el cual será otro array, por lo cual array de eventos donde en cada evento dentro,
    hay array de objetos donde cada objeto es un musico con su asistencia(attendance);

    */
    const [events, setEvents] = useState<
        Array<{ fecha: string; titulo: string; musiciansAttendance: string[] }>
    >([]);

    useEffect(() => {
        extractMusiciansData();
        // extractEventsData();
        console.log(data);
    }, [data]);

    interface CsvData {
        [key: string]: string; // Suponiendo que todas las columnas del CSV son strings
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        Papa.parse<string[]>(file, {
            complete: (result: Papa.ParseResult<string[]>) => {
                setData(result.data as unknown as CsvData[]);
                setHeaders(result.meta.fields ?? null);
            },
            header: true, // Indicates that the CSV file has a header row
            delimiter: ";", // Sets the correct delimiter for your CSV
        });
    };

    const extractMusiciansData = () => {
        if (data && headers) {
            const musicianData: {
                id: string;
                display_name: string;
                instrument: string;
            }[] = [];
            const nameRow = data[0];
            const intrumentRow = data[1]; //Si no funciona => Object.create

            Object.entries(nameRow).forEach(([key, value]) => {
                //REVIEW: Preguntar si todos los IDS serán numeros, o si pueden contener letras
                //para hacer la comprobacion o no.
                const keyId = parseInt(key);
                if (!isNaN(keyId) && keyId >= 3) {
                    const musician: {
                        id: string;
                        display_name: string;
                        instrument: string;
                    } = {
                        id: key, // Usar el valor del encabezado como parte del id
                        display_name: value, // Obtener el valor del nombre del músico
                        instrument: intrumentRow[key], // Acceder al valor del instrumento basado en el key
                    };
                    musicianData.push(musician);
                }
            });

            setMusicians(musicianData);
        }
    };
    
    const extractEventsData = () => {
        if (data && headers) {
            const eventsData: {
                display_name: string;
                date: string;
            }[] = [];

            const musiciansAttendaceData: {
                musician_id: string;
                event_id: string;
                attendace: string;
            }[] = [];

            data.map((rowObject, indexRowObject) => {
                //Recorrecome cada fila del archivo CSV
                if (indexRowObject > 2) {
                    let fecha: string = "";
                    let titulo: string = "";
                    //Recorre cada columna de la fila
                    Object.entries(rowObject).forEach(([key, value]) => {
                        if (key === "Fecha") {
                            fecha = value;
                            return;
                        }
                        if (key === "Titulo") {
                            titulo = value;
                            return;
                        }
                        if (key === "Ensayo") {
                            return;
                        }

                        const musicianAttendace: {
                            musician_id: string;
                            //Comparando el titulo con la BD y sacando el id
                            event_id: string;
                            attendace: string;
                        } = {
                            musician_id: key,
                            event_id: "",
                            attendace: value,
                        };

                        // Add the musicianAttendace object to musiciansAttendaceData array
                        musiciansAttendaceData.push(musicianAttendace);
                    }); // Close the missing opening curly brace for Object.entries

                    const event: {
                        display_name: string;
                        date: string;
                    } = { display_name: titulo, date: fecha };
                    eventsData.push(event);
                }
            }); // Close the missing opening curly brace for data.map
            setEvents(eventsData);
        }
    };

    return (
        <div>
            {/* Input para seleccionar un archivo */}
            <input type="file" onChange={handleFileChange} accept=".csv" />
            <div className="flex-1 my-10">
                {/* Mostrar los encabezados del archivo CSV */}
                {data && (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Instrument</th>
                            </tr>
                        </thead>
                        <tbody>
                            {musicians.map((musician) => (
                                <tr key={musician.id}>
                                    <td>{musician.id}</td>
                                    <td>{musician.display_name}</td>
                                    <td>{musician.instrument}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default CSVImporter;
