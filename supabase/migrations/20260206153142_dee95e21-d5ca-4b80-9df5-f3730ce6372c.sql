
-- Table to collect newsletter/marketing subscribers from all forms
-- This data will later be synced with Klaviyo for email campaigns
CREATE TABLE public.newsletter_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'footer', -- 'register', 'footer', 'coming_soon'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create unique index on email+source to prevent duplicates per source
CREATE UNIQUE INDEX idx_newsletter_email_source ON public.newsletter_subscribers (email, source);

-- Enable Row Level Security
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Anyone can subscribe (insert) - no auth required for newsletter signup
CREATE POLICY "Anyone can subscribe to newsletter"
  ON public.newsletter_subscribers
  FOR INSERT
  WITH CHECK (true);

-- Only service role can read subscribers (for Klaviyo sync)
-- No public SELECT policy = no one can read the list from the frontend
