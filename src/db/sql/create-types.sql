-- Table: public.Types

-- DROP TABLE public."Types";

CREATE TABLE IF NOT EXISTS public."Types"
(
    id integer NOT NULL DEFAULT nextval('"Types_id_seq"'::regclass),
    name character varying(255) COLLATE pg_catalog."default",
    description character varying(255) COLLATE pg_catalog."default",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Types_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public."Types"
    OWNER to ttlwhcmclcwwzu;