# React + TypeScript + Vite

# Run in Docker

Use docker-compose:

```
    docker-compose up --build
```

or create an image:

```
docker build -t status-chart .
```
and run it into a container:
```
 docker run -p 5173:5173 status-chart
```
