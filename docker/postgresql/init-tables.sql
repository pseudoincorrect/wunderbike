create table tricks (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT now(),
  title character varying(4096) NOT NULL,
  description character varying(255) NOT NULL,
  user_id character varying(128) NOT NULL,
  image_url character varying(4096)
);
