# Load environment variables
$envVars = Get-Content ".\db\.env" | Where-Object { $_ -match "=" }
foreach ($line in $envVars) {
    $parts = $line -split "="
    $key = $parts[0].Trim()
    $value = $parts[1].Trim()
    Set-Item -Path "Env:$key" -Value $value
}

# Build the Docker image
docker build -t classroom-db .\db

# Remove existing container if it exists
if (docker ps -a --format "{{.Names}}" | Where-Object { $_ -eq "classroom-db-container" }) {
    Write-Host "Removing existing container..."
    docker stop classroom-db-container
    docker rm classroom-db-container
}

# Run the container
docker run -d `
  --name classroom-db-container `
  -e POSTGRES_DB=$Env:POSTGRES_DB `
  -e POSTGRES_USER=$Env:POSTGRES_USER `
  -e POSTGRES_PASSWORD=$Env:POSTGRES_PASSWORD `
  -p 5432:5432 `
  classroom-db
