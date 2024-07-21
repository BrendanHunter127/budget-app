#!/bin/bash
set -e

# Debug output
echo "Starting init-db.sh script"

# Wait for PostgreSQL to be ready
until psql -h "$TYPEORM_HOST" -U "$POSTGRES_USER" -d "postgres" -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

# Debug output
echo "Postgres is available - executing SQL commands"

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "postgres" <<-EOSQL
  DO
  \$do\$
  BEGIN
     IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'myuser') THEN
        CREATE ROLE "myuser" WITH LOGIN PASSWORD 'password';
     END IF;
  END
  \$do\$;

  DO
  \$do\$
  BEGIN
     IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'budgeting_app') THEN
        CREATE DATABASE budgeting_app;
        GRANT ALL PRIVILEGES ON DATABASE budgeting_app TO "myuser";
     END IF;
  END
  \$do\$;
EOSQL

# Debug output
echo "init-db.sh script completed"
