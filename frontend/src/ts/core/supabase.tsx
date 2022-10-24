import {
    createClient,
    SupabaseClient,
    User,
    Session,
} from "@supabase/supabase-js";

const SUPABASE_URL = "https://jdikcjgzpiezpacsqlkf.supabase.co";
const SUPABASE_PUBLIC_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI" +
    "6ImpkaWtjamd6cGllenBhY3NxbGtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjY2Mzc3" +
    "OTcsImV4cCI6MTk4MjIxMzc5N30.Va395MtPls6yqpKH0oRRsolMS6qij3RBT-oAy_wC_Ow";

let supabase: SupabaseClient;

export function setupSupabase() {
    supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);
}

let user_: User | null = null;
let session_: Session | null = null;

export async function signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (error) {
        // TODO: Handle error
        return;
    }
    const { user, session } = data;
    if (!user || !session) {
        // TODO: Handle error
    }
    user_ = user!;
    session_ = session!;
}

export async function signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
        // TODO: Handle error
        return;
    }
    const { user, session } = data;
    if (!user || !session) {
        // TODO: Handle error
    }
    user_ = user!;
    session_ = session!;
}

export async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        // TODO: handle error
        return;
    }
    user_ = null;
    session_ = null;
}
