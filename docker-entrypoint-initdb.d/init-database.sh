#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username imaginos --dbname kiki <<-EOSQL
    CREATE DATABASE "kiki";
    GRANT ALL PRIVILEGES ON DATABASE kiki TO imaginos;
EOSQL