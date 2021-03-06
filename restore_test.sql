PGDMP          7                w            node_postgres_db    10.9    10.9     �
           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false            �
           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false            �
           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false            �
           1262    16393    node_postgres_db    DATABASE     �   CREATE DATABASE node_postgres_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Spanish_Colombia.1252' LC_CTYPE = 'Spanish_Colombia.1252';
     DROP DATABASE node_postgres_db;
             postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
             postgres    false            �
           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                  postgres    false    3                        3079    12924    plpgsql 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;
    DROP EXTENSION plpgsql;
                  false                        0    0    EXTENSION plpgsql    COMMENT     @   COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';
                       false    1            �            1259    16452    tareas    TABLE     �   CREATE TABLE public.tareas (
    id integer NOT NULL,
    usuario_id integer,
    titulo text,
    descripcion text,
    status text
);
    DROP TABLE public.tareas;
       public         postgres    false    3            �            1259    16450    tarea_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tarea_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.tarea_id_seq;
       public       postgres    false    197    3                       0    0    tarea_id_seq    SEQUENCE OWNED BY     >   ALTER SEQUENCE public.tarea_id_seq OWNED BY public.tareas.id;
            public       postgres    false    196            �            1259    16468    usuarios    TABLE     l   CREATE TABLE public.usuarios (
    id integer NOT NULL,
    correo text,
    clave text,
    nombre text
);
    DROP TABLE public.usuarios;
       public         postgres    false    3            �            1259    16466    usuarios_id_seq    SEQUENCE     �   CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.usuarios_id_seq;
       public       postgres    false    199    3                       0    0    usuarios_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;
            public       postgres    false    198            v
           2604    16455 	   tareas id    DEFAULT     e   ALTER TABLE ONLY public.tareas ALTER COLUMN id SET DEFAULT nextval('public.tarea_id_seq'::regclass);
 8   ALTER TABLE public.tareas ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    197    196    197            w
           2604    16471    usuarios id    DEFAULT     j   ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);
 :   ALTER TABLE public.usuarios ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    199    198    199            �
          0    16452    tareas 
   TABLE DATA               M   COPY public.tareas (id, usuario_id, titulo, descripcion, status) FROM stdin;
    public       postgres    false    197   [       �
          0    16468    usuarios 
   TABLE DATA               =   COPY public.usuarios (id, correo, clave, nombre) FROM stdin;
    public       postgres    false    199   x                  0    0    tarea_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.tarea_id_seq', 16, true);
            public       postgres    false    196                       0    0    usuarios_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.usuarios_id_seq', 1, false);
            public       postgres    false    198            y
           2606    16460    tareas tarea_pkey 
   CONSTRAINT     O   ALTER TABLE ONLY public.tareas
    ADD CONSTRAINT tarea_pkey PRIMARY KEY (id);
 ;   ALTER TABLE ONLY public.tareas DROP CONSTRAINT tarea_pkey;
       public         postgres    false    197            {
           2606    16476    usuarios usuarios_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_pkey;
       public         postgres    false    199            �
      x������ � �      �
      x������ � �     