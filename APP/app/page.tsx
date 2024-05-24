import { Card, CardBody } from "@nextui-org/react";

export default async function Index() {
    // const canInitSupabaseClient = () => {
    //     // This function is just for the interactive tutorial.
    //     // Feel free to remove it once you have Supabase connected.
    //     try {
    //         createClient();
    //         return true;
    //     } catch (e) {
    //         return false;
    //     }
    // };

    // const isSupabaseConnected = canInitSupabaseClient();

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mb-16">
                Bienvenido al Dashboard de Músicos
            </h1>
            <h4 className="text-9xl font-bold justify-center">🎼🎺🎹🥁</h4>
            <div className="flex flex-col items-center">
                <Card className="mt-20">
                    <CardBody>
                        <p>
                            Navega por las distintas pantallas para poder ver
                            el estado actual de la banda.
                        </p>
                    </CardBody>
                </Card>
                <Card className="mt-3">
                    <CardBody>
                        <p>Crea nuevas particiones.</p>
                    </CardBody>
                </Card>
                <Card className="mt-3">
                    <CardBody>
                        <p>Exporta información actualizada de la Banda.</p>
                    </CardBody>
                </Card>
                <Card className="mt-3">
                    <CardBody>
                        <p>Nuevas funcinalidades pronto...</p>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}
