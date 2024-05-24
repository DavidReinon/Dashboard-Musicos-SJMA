
export const routes: Record<string, { label: string, showLabelInSidebar: boolean, showLabelInNavigation: boolean }> = {
    "/": { label: "Home", showLabelInSidebar: false, showLabelInNavigation: true },
    "/dashboard/musicians": { label: "Musicos", showLabelInSidebar: true, showLabelInNavigation: true },
    "/dashboard/events": { label: "Ensayos", showLabelInSidebar: true, showLabelInNavigation: true },
    "/dashboard/selections": { label: "Particiones", showLabelInSidebar: true, showLabelInNavigation: true },
    "/dashboard/instruments": { label: "Instrumentos", showLabelInSidebar: true, showLabelInNavigation: true },
    "/dashboard/import-csv": { label: "Configuración" , showLabelInSidebar: true, showLabelInNavigation: true },
    "/dashboard/selections/new": { label: "Datos de la Partición:", showLabelInSidebar: true, showLabelInNavigation: false },
};
