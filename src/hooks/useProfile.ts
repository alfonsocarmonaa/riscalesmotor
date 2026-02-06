import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { toast } from "sonner";
import { z } from "zod";

export interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  postal_code: string | null;
  province: string | null;
  country: string | null;
  created_at: string;
  updated_at: string;
}

// Validation schema for profile updates
const profileUpdateSchema = z.object({
  full_name: z.string().trim().max(100, "El nombre no puede exceder 100 caracteres").optional().nullable(),
  avatar_url: z.string().url("URL de avatar inválida").max(500).optional().nullable(),
  phone: z.string()
    .trim()
    .regex(/^(\+?[0-9\s\-()]{0,20})?$/, "Formato de teléfono inválido")
    .max(20, "El teléfono no puede exceder 20 caracteres")
    .optional()
    .nullable()
    .transform(val => val === "" ? null : val),
  address_line1: z.string().trim().max(200, "La dirección no puede exceder 200 caracteres").optional().nullable(),
  address_line2: z.string().trim().max(200, "La dirección no puede exceder 200 caracteres").optional().nullable(),
  city: z.string().trim().max(100, "La ciudad no puede exceder 100 caracteres").optional().nullable(),
  postal_code: z.string()
    .trim()
    .regex(/^([0-9]{5})?$/, "El código postal debe tener 5 dígitos")
    .optional()
    .nullable()
    .transform(val => val === "" ? null : val),
  province: z.string().trim().max(100, "La provincia no puede exceder 100 caracteres").optional().nullable(),
  country: z.string().trim().max(100, "El país no puede exceder 100 caracteres").optional().nullable(),
});

export type ProfileUpdateData = z.infer<typeof profileUpdateSchema>;

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateProfile = useCallback(
    async (updates: Partial<Omit<Profile, "id" | "user_id" | "created_at" | "updated_at">>) => {
      if (!user) return { error: new Error("No user logged in") };

      // Validate input before sending to database
      const validationResult = profileUpdateSchema.safeParse(updates);
      
      if (!validationResult.success) {
        const errorMessages = validationResult.error.errors.map(e => e.message).join(", ");
        toast.error("Error de validación", { description: errorMessages });
        return { data: null, error: new Error(errorMessages) };
      }

      try {
        const { data, error } = await supabase
          .from("profiles")
          .update(validationResult.data)
          .eq("user_id", user.id)
          .select()
          .single();

        if (error) throw error;

        setProfile(data);
        toast.success("Perfil actualizado correctamente");
        return { data, error: null };
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("Error al actualizar el perfil");
        return { data: null, error };
      }
    },
    [user]
  );

  return {
    profile,
    loading,
    updateProfile,
    refetch: fetchProfile,
  };
}
