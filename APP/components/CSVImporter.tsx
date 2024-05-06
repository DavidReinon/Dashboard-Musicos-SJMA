"use client";

import { useEffect, useState } from "react";
import Papa from "papaparse";

const CSVImporter: React.FC = () => {
    const [data, setData] = useState<string[][] | null>(null);
    const [headers, setHeaders] = useState<string[] | null>(null);
    const [musicians, setMusicians] = useState<
        Array<{ id: string; name: string }>
    >([]);
    const [events, setEvents] = useState<
        Array<{ fecha: string; titulo: string; datos: string[] }>
    >([]);

    useEffect(() => {
        // extractMusiciansData();
        // extractEventsData();
    }, [data]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    Papa.parse<string[]>(file, {
        complete: (result: Papa.ParseResult<string[]>) => {
            setData(result.data);

            // setHeaders(result.meta.fields ?? null);
        },
        header: false, // Indicates that the CSV file has a header row
        delimiter: ";", // Sets the correct delimiter for your CSV
    });
};

    
    const extractMusiciansData = () => {
        if (data && headers) {
            const eventData: { id: string; name: string }[] = [];
            const nameRow = data[2]; // Obtener la fila con los nombres de los músicos

            headers.forEach((header: string, headerIndex: number) => {
                if (headerIndex >= 3) {
                    // A partir del cuarto valor del encabezado (el primero es 5)
                    const event: { id: string; name: string } = {
                        id: header, // Usar el valor del encabezado como parte del id
                        name: nameRow[header as unknown as number], // Obtener el nombre del músico de la misma columna
                    };
                    eventData.push(event);
                }
            });

            setMusicians(eventData);
        }
    };

    const extractEventsData = () => {
        if (data && headers) {
            const eventData: {
                fecha: string;
                titulo: string;
                datos: string[];
            }[] = [];

            // Obtener las filas con los datos de fecha, título y tipo
            const fechaRow = data[0];
            const tituloRow = data[1];
            const tipoRow = data[2];

            headers.forEach((header: string, headerIndex: number) => {
                if (headerIndex >= 3) {
                    // A partir del cuarto valor del encabezado (el primero es 5)
                    const evento: {
                        fecha: string;
                        titulo: string;
                        datos: string[];
                    } = {
                        fecha: fechaRow[headerIndex] as string,
                        titulo: tituloRow[headerIndex] as string,
                        datos: [],
                    };

                    // Obtener los datos adicionales del evento
                    for (let i = 3; i < data.length; i++) {
                        evento.datos.push(data[i][headerIndex] as string);
                    }

                    eventData.push(evento);
                }
            });

            setEvents(eventData);
        }
    };


    return (
        <div>
            {/* Input para seleccionar un archivo */}
            <input type="file" onChange={handleFileChange} accept=".csv" />
            <div className="flex-1 my-10">
                {/* Mostrar los datos del archivo CSV */}
                {data && (
                    <table>
                        <tbody>
                            {data.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    <p>{row}</p>
                                    {/* {row.map((cell, cellIndex) => (
                                        <td key={cellIndex}>{cell}</td>
                                    ))} */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {/* Mostrar los encabezados del archivo CSV */}

                {/* {data && (
                    <div>
                        <h2>Eventos</h2>
                        <strong>{events[0].fecha}</strong>
                        <p>{events[0].titulo}</p>
                    </div>
                )}

                {musicians.map((musician, index) => (
                    <div key={index}>
                        <strong>{musician.id}</strong>
                        <p>{musician.name}</p>
                    </div>
                ))} */}
            </div>
        </div>
    );
};

export default CSVImporter;
