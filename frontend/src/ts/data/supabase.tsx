import {
    createClient,
    SupabaseClient,
    User,
    Session,
} from "@supabase/supabase-js";
import { hideModal, showModal } from "../app/ModalStack";
import { WaitForConfirmationModal } from "../app/signup/WaitForConfirmation";
import { changePassphrase, setPassphrase } from "./passphrase";
import { LogDebug } from "../wailsjs/runtime/runtime";
import { setRecurring } from "../core/util";
import { listenToRemoteUpdates, unlistenToRemoteUpdates } from "./identities";
import { LogError } from "../wailsjs/runtime/runtime";

const SUPABASE_URL = "https://jdikcjgzpiezpacsqlkf.supabase.co";
const SUPABASE_PUBLIC_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI" +
    "6ImpkaWtjamd6cGllenBhY3NxbGtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjY2Mzc3" +
    "OTcsImV4cCI6MTk4MjIxMzc5N30.Va395MtPls6yqpKH0oRRsolMS6qij3RBT-oAy_wC_Ow";

export let supabase: SupabaseClient;

let user_: User | null = null;
let session_: Session | null = null;

export function setupSupabase() {
    supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);
    supabase.auth.onAuthStateChange((event, session) => {
        if (event === "SIGNED_IN") {
            // SIGNED_IN can trigger many times as the token is refreshed
            user_ = session!.user;
            session_ = session!;
            unlistenToRemoteUpdates();
            listenToRemoteUpdates();
        }
        if (event === "SIGNED_OUT") {
            user_ = null;
            session_ = null;
            unlistenToRemoteUpdates();
        }
    });
}

export async function signIn(
    email: string,
    passphrase: string
): Promise<string | null> {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: passphrase,
    });
    if (error) {
        LogError(error.message);
        return "Error logging in: " + error.message;
    }
    if (!data.user || !data.session) {
        LogError("No session returned on sign in");
        return "Error logging in: No session returned";
    }
    setPassphrase(passphrase);
    return null;
}

export async function signUp(
    email: string,
    passphrase: string
): Promise<string | undefined> {
    let { data, error } = await supabase.auth.signUp({
        email,
        password: passphrase,
    });
    if (error) {
        LogError(error.message);
        return error.message;
    }
    if (!data.user) {
        LogError("No user returned on signup");
        return "No user returned";
    }
    if (!data.session) {
        // If we lack a session, we need to wait for email confirmation
        console.assert(!data.user.email_confirmed_at);
        data = await waitForEmailConfirmation(email, passphrase);
        if (!data.session) {
            LogError("No session returned from email confirmation");
            return "No session returned from email confirmation";
        }
    }
    if (!data.user || !data.session) {
        LogError("Null user or session: " + data);
        return "Null user or session returned";
    }
    setPassphrase(passphrase);
}

async function waitForEmailConfirmation(
    email: string,
    passphrase: string
): Promise<
    | { user: User | null; session: Session | null }
    | { user: null; session: null }
> {
    let cancel = false;
    showModal(
        <WaitForConfirmationModal
            onCancel={() => {
                hideModal();
                cancel = true;
            }}
        />
    );
    return new Promise((resolve) => {
        setRecurring(async () => {
            if (cancel) {
                resolve({ user: null, session: null });
                return false;
            }
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password: passphrase,
            });
            if (error) {
                return true;
            } else {
                hideModal();
                resolve(data);
                return false;
            }
        }, 1000);
    });
}

export function supabaseUserId(): string {
    return user_!.id;
}

export async function getEmail(): Promise<string | undefined> {
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();
    if (error) {
        LogDebug(error.message);
        return undefined;
    }
    return user?.email;
}

export async function updateEmail(email: string): Promise<string | null> {
    const { data, error } = await supabase.auth.updateUser({ email });
    if (error) {
        LogDebug(error.message);
        return error.message;
    }
    return null;
}

export async function updateAccountPassphrase(
    passphrase: string
): Promise<boolean> {
    const { data, error } = await supabase.auth.updateUser({
        password: passphrase,
    });
    if (error) {
        LogDebug(error.message);
        return false;
    }
    changePassphrase(passphrase);
    return true;
}

export function isLoggedIn(): boolean {
    return session_ !== null;
}
