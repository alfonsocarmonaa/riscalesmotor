-- Revoke all access then grant only INSERT to anon for newsletter signups
REVOKE ALL ON public.newsletter_subscribers FROM anon;
REVOKE ALL ON public.newsletter_subscribers FROM authenticated;
GRANT INSERT ON public.newsletter_subscribers TO anon;
GRANT INSERT ON public.newsletter_subscribers TO authenticated;