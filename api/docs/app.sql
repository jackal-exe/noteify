--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: concat_upper_lower(text, text, boolean); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.concat_upper_lower(a text, b text, upper boolean DEFAULT false) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$ select case when $3 then upper($1) || ' ' || upper($2) else lower($1) || ' ' || lower($2) end $_$;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: reminder; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.reminder (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    note text NOT NULL,
    owner_id character varying(255) NOT NULL
);


--
-- Name: reminder_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.reminder_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: reminder_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.reminder_id_seq OWNED BY public.reminder.id;


--
-- Name: todo; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.todo (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    deadline date,
    task_type character varying(255) NOT NULL,
    subtasks jsonb,
    done boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone,
    description text,
    owner_id character varying(255) NOT NULL
);


--
-- Name: todo_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.todo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: todo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.todo_id_seq OWNED BY public.todo.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."user" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    phone_number character varying(12) NOT NULL,
    role character varying(255) NOT NULL
);


--
-- Name: reminder id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reminder ALTER COLUMN id SET DEFAULT nextval('public.reminder_id_seq'::regclass);


--
-- Name: todo id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.todo ALTER COLUMN id SET DEFAULT nextval('public.todo_id_seq'::regclass);


--
-- Name: reminder_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.reminder_id_seq', 4, true);


--
-- Name: todo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.todo_id_seq', 25, true);


--
-- Name: reminder reminder_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reminder
    ADD CONSTRAINT reminder_pkey PRIMARY KEY (id);


--
-- Name: todo todo_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.todo
    ADD CONSTRAINT todo_pkey PRIMARY KEY (id);


--
-- Name: user users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO john;


--
-- Name: TABLE reminder; Type: ACL; Schema: public; Owner: -
--

GRANT ALL ON TABLE public.reminder TO john;


--
-- Name: SEQUENCE reminder_id_seq; Type: ACL; Schema: public; Owner: -
--

GRANT ALL ON SEQUENCE public.reminder_id_seq TO john;


--
-- Name: TABLE todo; Type: ACL; Schema: public; Owner: -
--

GRANT ALL ON TABLE public.todo TO john;


--
-- Name: SEQUENCE todo_id_seq; Type: ACL; Schema: public; Owner: -
--

GRANT ALL ON SEQUENCE public.todo_id_seq TO john;


--
-- Name: TABLE "user"; Type: ACL; Schema: public; Owner: -
--

GRANT ALL ON TABLE public."user" TO john;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO john;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: -; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TABLES TO john;


--
-- PostgreSQL database dump complete
--

