#!/bin/sh

# Install netcat
apt-get update && apt-get install -y netcat-traditional

echo "Waiting for PostgreSQL to be ready"
while ! nc -z $POSTGRES_HOST $POSTGRES_PORT; do
    sleep 1
done
echo "PostgreSQL is ready"

echo "Running migrations"
npx drizzle-kit push --verbose

exec "$@"
