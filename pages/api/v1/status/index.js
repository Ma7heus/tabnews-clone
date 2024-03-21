import database from 'infra/database.js'

async function status(req, res) {
  const updatetAt = new Date().toISOString();
  const databaseVersion = await database.databaseVersion();
  const databaseMaxConections = await database.maxConections();
  const databaseOpenedConnections = await database.openedConnections(); 

  res.status(200).json({
    updated_at: updatetAt,
    dependencies: {
      database: {
        version: databaseVersion,
        max_connections: parseInt(databaseMaxConections),
        connections: databaseOpenedConnections
      }
    }
  });

}

export default status;