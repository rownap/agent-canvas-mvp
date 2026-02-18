-- 1. Create Renders table for job persistence
CREATE TABLE IF NOT EXISTS public.renders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id),
    job_id TEXT NOT NULL,
    template_id TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'queued',
    output_url TEXT,
    topic TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Add Credits to Profiles (if not already exists)
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS credits_balance INTEGER DEFAULT 10;

-- 3. Enable RLS
ALTER TABLE public.renders ENABLE ROW LEVEL SECURITY;

-- 4. Policies
CREATE POLICY "Users can view their own renders" 
ON public.renders FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own renders" 
ON public.renders FOR INSERT 
WITH CHECK (auth.uid() = user_id);
