import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

export const initDatabase = async () => {
  try {
    // Open or create the database
    db = await SQLite.openDatabaseAsync('jica.db');

    // Create GPS queue table
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS queued_gps (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        lat REAL NOT NULL,
        lng REAL NOT NULL,
        timestamp TEXT NOT NULL
      );
    `);

    // Create Transactions queue table
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS queued_transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        stop_id TEXT NOT NULL,
        amount REAL NOT NULL,
        method TEXT NOT NULL,
        timestamp TEXT NOT NULL
      );
    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

export const queueGPS = async (lat: number, lng: number) => {
  if (!db) return;
  try {
    const timestamp = new Date().toISOString();
    await db.runAsync(
      'INSERT INTO queued_gps (lat, lng, timestamp) VALUES (?, ?, ?)',
      [lat, lng, timestamp]
    );
    console.log('GPS queued locally');
  } catch (error) {
    console.error('Error queueing GPS:', error);
  }
};

export const queueTransaction = async (stopId: string, amount: number, method: string) => {
  if (!db) return;
  try {
    const timestamp = new Date().toISOString();
    await db.runAsync(
      'INSERT INTO queued_transactions (stop_id, amount, method, timestamp) VALUES (?, ?, ?, ?)',
      [stopId, amount, method, timestamp]
    );
    console.log('Transaction queued locally');
  } catch (error) {
    console.error('Error queueing transaction:', error);
  }
};

export const getQueuedGPS = async () => {
  if (!db) return [];
  try {
    return await db.getAllAsync('SELECT * FROM queued_gps');
  } catch (error) {
    console.error('Error getting GPS queue:', error);
    return [];
  }
};

export const getQueuedTransactions = async () => {
  if (!db) return [];
  try {
    return await db.getAllAsync('SELECT * FROM queued_transactions');
  } catch (error) {
    console.error('Error getting transactions queue:', error);
    return [];
  }
};

export const clearQueues = async (gpsIds: number[], txIds: number[]) => {
  if (!db) return;
  try {
    if (gpsIds.length > 0) {
      const placeholders = gpsIds.map(() => '?').join(',');
      await db.runAsync(`DELETE FROM queued_gps WHERE id IN (${placeholders})`, gpsIds);
    }
    if (txIds.length > 0) {
      const placeholders = txIds.map(() => '?').join(',');
      await db.runAsync(`DELETE FROM queued_transactions WHERE id IN (${placeholders})`, txIds);
    }
    console.log('Queues cleared successfully');
  } catch (error) {
    console.error('Error clearing queues:', error);
  }
};
