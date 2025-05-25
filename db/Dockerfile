FROM postgres:15

# Set environment variables
ENV POSTGRES_DB=${POSTGRES_DB}
ENV POSTGRES_USER=${POSTGRES_USER}
ENV POSTGRES_PASSWORD=${POSTGRES_PASSWORD}

# Copy schema file into the container
COPY init.sql /docker-entrypoint-initdb.d/
