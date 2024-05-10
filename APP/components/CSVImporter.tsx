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
        console.log(data);
    }, [data]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        Papa.parse<string[]>(file, {
            complete: (result: Papa.ParseResult<string[]>) => {
                setData(result.data);
                setHeaders(result.meta.fields ?? null);
            },
            header: true, // Indicates that the CSV file has a header row
            delimiter: ";", // Sets the correct delimiter for your CSV
        });
    };

    const extractMusiciansDataLab = () => {
        if (data) {
            const musiciansData: { id: string; name: string }[] = [];
    
            // Iterar sobre cada fila de datos
            data.forEach((rowData, index) => {
                // Ignorar la fila de los encabezados (fila 0)
                if (index > 0) {
                    const musicianName = rowData[""]; // La clave vacía corresponde al nombre del músico
    
                    // Iterar sobre las claves de la fila (excepto la clave vacía)
                    Object.keys(rowData).forEach((key) => {
                        if (key !== "") {
                            const event: { id: string; name: string } = {
                                id: key, // La clave es el ID del músico
                                name: musicianName || "", // Nombre del músico (puede ser vacío)
                            };
                            musiciansData.push(event);
                        }
                    });
                }
            });
    
            setMusicians(musiciansData);
        }
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
