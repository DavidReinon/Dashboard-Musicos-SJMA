// INDEX PAGE - This is the main page of the app. It is the first page that is loaded when the app is opened.
// (INDEX > render > APP => Navigation and more)
import DeployButton from "../src/components/DeployButton";
import AuthButton from "../src/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/src/components/tutorial/ConnectSupabaseSteps";
import SignUpUserSteps from "@/src/components/tutorial/SignUpUserSteps";
import Header from "@/src/components/Header";

import CSVImporter from "@/src/components/CSVImporter";

export default async function Index() {
    const canInitSupabaseClient = () => {
        // This function is just for the interactive tutorial.
        // Feel free to remove it once you have Supabase connected.
        try {
            createClient();
            return true;
        } catch (e) {
            return false;
        }
    };

    const isSupabaseConnected = canInitSupabaseClient();

    return (
        <div className="flex-1 w-full flex flex-col gap-20 items-center">
            <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
                    {isSupabaseConnected && <AuthButton />}
                </div>
            </nav>
            <div>
                <CSVImporter />
            </div>
        </div>
    );
}
