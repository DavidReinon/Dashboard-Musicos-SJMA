import React from "react";
import { useSelection } from "@/src/contexts/selections/createSelectionContext";

const SelectMusiciansScreen: React.FC = () => {
    const { musicians, setMusicians } = useSelection();

    return <div>Select Musicians Screen with Selection context</div>;
};
