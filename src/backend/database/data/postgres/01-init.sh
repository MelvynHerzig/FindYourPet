#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  CREATE USER $APP_DB_USER WITH PASSWORD '$APP_DB_PASS';
  CREATE DATABASE $APP_DB_NAME;
  GRANT ALL PRIVILEGES ON DATABASE $APP_DB_NAME TO $APP_DB_USER;
EOSQL

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$APP_DB_NAME" <<-EOSQL
  CREATE EXTENSION postgis;
  CREATE EXTENSION postgis_raster;
  CREATE EXTENSION postgis_topology;
  CREATE EXTENSION postgis_sfcgal;
  CREATE EXTENSION fuzzystrmatch;
  CREATE EXTENSION address_standardizer;
  CREATE EXTENSION address_standardizer_data_us;
  CREATE EXTENSION postgis_tiger_geocoder;
EOSQL
