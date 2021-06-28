-- Table: public.Templates

-- DROP TABLE public."Templates";

CREATE TABLE IF NOT EXISTS public."Templates"
(
    id integer NOT NULL DEFAULT nextval('"Templates_id_seq"'::regclass),
    name character varying(255) COLLATE pg_catalog."default",
    type character varying(255) COLLATE pg_catalog."default",
    doc json,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Templates_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public."Templates"
    OWNER to ttlwhcmclcwwzu;