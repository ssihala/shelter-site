import { createClient } from "@supabase/supabase-js";
import supabase from "@/app/db/supabase";
// Sign up a new user
async function signUpUser(email: string, password: string) {
  try {
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    console.log("User signed up successfully:", user);
  } catch (error) {
    console.error("Error signing up user:", error.message);
  }
}

// Usage example
const email = "example@example.com";
const password = "password123";

signUpUser(email, password);
