docker run --name localmongo -e MONGO_INITDB_ROOT_USERNAME=app -e MONGO_INITDB_ROOT_PASSWORD=app -e MONGO_INITDB_DATABASE=appdb -p 27018:27017 -d mongo:5.0.4-focal