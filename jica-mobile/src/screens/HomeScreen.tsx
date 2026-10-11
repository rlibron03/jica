import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Theme } from '../constants/Theme';
import { ClipboardList, Truck, Package, ArrowRight } from 'lucide-react-native';

export default function HomeScreen({ navigation }: any) {
  // Mock Data
  const loadSummary = {
    driverName: "Juan Dela Cruz",
    truckId: "T-04",
    routeId: "RT-8842",
    date: new Date().toLocaleDateString(),
    inventory: [
      { id: 1, type: "Tube Ice (50kg)", qty: 45 },
      { id: 2, type: "Block Ice", qty: 20 },
      { id: 3, type: "Crushed Ice (25kg)", qty: 15 },
    ]
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.headerCard}>
          <View style={styles.headerTopRow}>
            <Image 
              source={require('../../assets/JICA Ice Logistics Logo.png')} 
              style={styles.headerLogo} 
              resizeMode="contain" 
            />
            <View style={styles.truckBadge}>
              <Truck size={16} color={Theme.colors.primaryDark} />
              <Text style={styles.truckText}>{loadSummary.truckId}</Text>
            </View>
          </View>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.greeting}>Good Morning,</Text>
              <Text style={styles.driverName}>{loadSummary.driverName}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ClipboardList size={24} color={Theme.colors.primary} />
            <Text style={styles.sectionTitle}>Daily Load Summary</Text>
          </View>
          <Text style={styles.subText}>E-Load Slip: {loadSummary.routeId} • {loadSummary.date}</Text>

          <View style={styles.inventoryCard}>
            {loadSummary.inventory.map((item, index) => (
              <View 
                key={item.id} 
                style={[
                  styles.inventoryRow, 
                  index < loadSummary.inventory.length - 1 && styles.borderBottom
                ]}
              >
                <View style={styles.inventoryType}>
                  <Package size={20} color={Theme.colors.textSecondary} />
                  <Text style={styles.inventoryName}>{item.type}</Text>
                </View>
                <Text style={styles.inventoryQty}>{item.qty} units</Text>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('ActiveRoute')}
        >
          <Text style={styles.actionButtonText}>Start Active Route</Text>
          <ArrowRight size={20} color={Theme.colors.primaryDark} />
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  scrollContent: {
    padding: Theme.spacing.lg,
  },
  headerCard: {
    backgroundColor: Theme.colors.primary,
    borderRadius: Theme.borderRadius.xl,
    padding: Theme.spacing.xl,
    marginBottom: Theme.spacing.xl,
    shadowColor: Theme.colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Theme.spacing.md,
  },
  headerLogo: {
    width: 100,
    height: 40,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    color: Theme.colors.surface,
    opacity: 0.8,
    fontSize: 16,
  },
  driverName: {
    color: Theme.colors.surface,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: Theme.spacing.xs,
  },
  truckBadge: {
    backgroundColor: Theme.colors.accent,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.full,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  truckText: {
    color: Theme.colors.primaryDark,
    fontWeight: 'bold',
    fontSize: 16,
  },
  section: {
    marginBottom: Theme.spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: Theme.spacing.xs,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Theme.colors.text,
  },
  subText: {
    fontSize: 14,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.md,
  },
  inventoryCard: {
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  inventoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Theme.spacing.md,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  inventoryType: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  inventoryName: {
    fontSize: 16,
    color: Theme.colors.text,
    fontWeight: '500',
  },
  inventoryQty: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Theme.colors.primary,
  },
  actionButton: {
    backgroundColor: Theme.colors.accent,
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.lg,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    shadowColor: Theme.colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  actionButtonText: {
    color: Theme.colors.primaryDark,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
