-- Fix RLS policies on profiles table: Convert RESTRICTIVE to PERMISSIVE policies
-- RESTRICTIVE policies alone may not properly protect data as they combine with AND logic
-- PERMISSIVE policies are the standard approach for user-based access control

-- Drop existing RESTRICTIVE policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- Create PERMISSIVE policies (default policy type)
-- SELECT: Users can only view their own profile
CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- INSERT: Users can only insert their own profile
CREATE POLICY "Users can insert their own profile"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- UPDATE: Users can only update their own profile
CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Explicitly deny access to anonymous/public users by not granting any policies to them
-- The 'TO authenticated' clause ensures only logged-in users can access their data

-- Revoke any direct grants on the table that might bypass RLS
REVOKE ALL ON public.profiles FROM anon;
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;