import { Client, Pool } from 'pg';

const databaseName = process.env.POSTGRES_DB;

async function maxConections() {
  const result = await query("SHOW max_connections;")

  const max_conection = result.rows[0].max_connections;
  return max_conection; 
}

async function databaseVersion() {
  const result = await query("SHOW server_version;")
  return result.rows[0].server_version; 
}

async function openedConnections(){
  const result = await query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName]
  });

  console.log(result.rows[0].count);

  return result.rows[0].count;
}


async function query(queryObject) {
  
  const client = new Client({
    host:process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });

  try{
    await client.connect();
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error(`Erro ao se conectar com banco de dados: ${error}`);
  } finally {
    await client.end();
  }
 
}

export default {
  query: query,
  maxConections: maxConections,
  databaseVersion: databaseVersion,
  openedConnections: openedConnections,
};