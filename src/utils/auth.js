     import { supabase } from './supabase';

     export const login = async (email, password) => {
       const { data, error } = await supabase.auth.signInWithPassword({
         email,
         password,
       });
       if (error) throw error;
       return data.user;
     };

     export const logout = async () => {
       const { error } = await supabase.auth.signOut();
       if (error) throw error;
     };

     export const getCurrentUser = () => {
       return supabase.auth.getUser();
     };

     export const signUp = async (email, password, role) => {
       const { data, error } = await supabase.auth.signUp({
         email,
         password,
       });
       if (error) throw error;
       // Setelah sign up, insert ke tabel users
       await supabase.from('users').insert([{ id: data.user.id, email, role }]);
       return data.user;
     };
     