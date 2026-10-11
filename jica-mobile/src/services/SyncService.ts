import NetInfo from '@react-native-community/netinfo';
import { getQueuedGPS, getQueuedTransactions, clearQueues } from './DatabaseService';

let isSyncing = false;

export const syncDataWithServer = async () => {
  if (isSyncing) return;
  isSyncing = true;

  try {
    const gpsData: any[] = await getQueuedGPS();
    const txData: any[] = await getQueuedTransactions();

    if (gpsData.length === 0 && txData.length === 0) {
      isSyncing = false;
      return;
    }

    console.log(`Attempting to sync ${gpsData.length} GPS points and ${txData.length} transactions...`);

    // Mock API call to backend
    // In reality, this would be a POST to /api/telemetry and /api/transactions
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log('Sync successful!');

    // Clear locally stored data
    const gpsIds = gpsData.map(g => g.id);
    const txIds = txData.map(t => t.id);
    await clearQueues(gpsIds, txIds);

  } catch (error) {
    console.error('Error during sync:', error);
  } finally {
    isSyncing = false;
  }
};

export const startNetworkListener = () => {
  return NetInfo.addEventListener(state => {
    console.log('Connection type:', state.type);
    console.log('Is connected?', state.isConnected);
    
    if (state.isConnected && state.isInternetReachable) {
      // We are back online, try to sync queued data
      syncDataWithServer();
    }
  });
};
