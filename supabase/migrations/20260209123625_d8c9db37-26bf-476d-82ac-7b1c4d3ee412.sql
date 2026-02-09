CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_full_name TEXT;
BEGIN
  v_full_name := TRIM(NEW.raw_user_meta_data->>'full_name');
  
  -- Validate and truncate length
  IF v_full_name IS NOT NULL AND LENGTH(v_full_name) > 200 THEN
    v_full_name := SUBSTRING(v_full_name, 1, 200);
  END IF;
  
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, v_full_name);
  RETURN NEW;
END;
$$;