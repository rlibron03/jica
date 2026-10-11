import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Theme } from '../constants/Theme';
import { MapPin, School, Store, CheckCircle, Navigation, Map as MapIcon, ChevronDown, ChevronUp } from 'lucide-react-native';
import CheckoutModal from '../components/CheckoutModal';
import { queueTransaction } from '../services/DatabaseService';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

// Mock Locations with grouped customers
const initialLocations = [
  {
    id: 'L1',
    name: "SM Downtown Premier",
    address: "Claro M. Recto Ave, CDO",
    lat: 8.48438,
    lng: 124.65432,
    customers: [
      { id: '1', name: "Jollibee", type: "Retail", amount: 450, isInstitutional: false, status: 'pending' },
      { id: '2', name: "McDonalds", type: "Retail", amount: 350, isInstitutional: false, status: 'pending' },
      { id: '3', name: "Ribshack", type: "Retail", amount: 600, isInstitutional: false, status: 'pending' }
    ]
  },
  {
    id: 'L2',
    name: "Xavier University",
    address: "Corrales Ave, CDO",
    lat: 8.47666,
    lng: 124.64761,
    customers: [
      { id: '4', name: "XU Canteen 1", type: "School", amount: 1200, isInstitutional: true, status: 'pending' },
      { id: '5', name: "XU Canteen 2", type: "School", amount: 800, isInstitutional: true, status: 'pending' }
    ]
  },
  {
    id: 'L3',
    name: "Ayala Mall Centrio",
    address: "Corrales Ave, CDO",
    lat: 8.4851,
    lng: 124.6512,
    customers: [
      { id: '6', name: "KFC", type: "Retail", amount: 400, isInstitutional: false, status: 'pending' },
      { id: '7', name: "Greenwich", type: "Retail", amount: 500, isInstitutional: false, status: 'pending' }
    ]
  }
];

export default function ActiveRouteScreen() {
  const navigation = useNavigation<any>();
  const [locations, setLocations] = useState(initialLocations);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [checkoutVisible, setCheckoutVisible] = useState(false);
  const [expandedLocations, setExpandedLocations] = useState<Record<string, boolean>>({});

  // Sorting logic based on institutional clients (if any customer is institutional, elevate the location)
  const sortedLocations = useMemo(() => {
    return [...locations].sort((a, b) => {
      const aHasIncompleteInstitutional = a.customers.some(c => c.isInstitutional && c.status !== 'completed');
      const bHasIncompleteInstitutional = b.customers.some(c => c.isInstitutional && c.status !== 'completed');
      
      const aAllCompleted = a.customers.every(c => c.status === 'completed');
      const bAllCompleted = b.customers.every(c => c.status === 'completed');

      if (aAllCompleted && !bAllCompleted) return 1;
      if (bAllCompleted && !aAllCompleted) return -1;
      
      if (aHasIncompleteInstitutional && !bHasIncompleteInstitutional) return -1;
      if (!aHasIncompleteInstitutional && bHasIncompleteInstitutional) return 1;
      
      return 0;
    });
  }, [locations]);

  const toggleLocationExpand = (locId: string) => {
    setExpandedLocations(prev => ({
      ...prev,
      [locId]: !prev[locId]
    }));
  };

  const handleCustomerPress = (customer: any) => {
    if (customer.status === 'completed') return;
    setSelectedCustomer(customer);
    setCheckoutVisible(true);
  };

  const handleCheckoutComplete = async (method: string) => {
    if (selectedCustomer) {
      await queueTransaction(selectedCustomer.id, selectedCustomer.amount, method);

      setLocations(prev => 
        prev.map(loc => ({
          ...loc,
          customers: loc.customers.map(c => 
            c.id === selectedCustomer.id ? { ...c, status: 'completed' } : c
          )
        }))
      );
    }
    setCheckoutVisible(false);
    setSelectedCustomer(null);
  };

  const openMap = (loc: typeof initialLocations[0]) => {
    const locIndex = sortedLocations.findIndex(l => l.id === loc.id);
    
    let origin;
    if (locIndex === 0) {
      // First route, origin is Depot (Caltex Gusa)
      origin = {
        name: 'Depot: JICA Ice Logistics (Caltex, Gusa)',
        lat: 8.4748,
        lng: 124.6851
      };
    } else {
      // Origin is the previous location
      const prev = sortedLocations[locIndex - 1];
      origin = {
        name: prev.name,
        lat: prev.lat,
        lng: prev.lng
      };
    }

    navigation.navigate('Map', {
      originName: origin.name,
      originLat: origin.lat,
      originLng: origin.lng,
      destName: loc.name,
      destLat: loc.lat,
      destLng: loc.lng
    });
  };

  const renderLocationGroup = ({ item: loc }: { item: typeof initialLocations[0] }) => {
    const isExpanded = expandedLocations[loc.id];
    const isInstitutionalGroup = loc.customers.some(c => c.isInstitutional);
    const completedCount = loc.customers.filter(c => c.status === 'completed').length;
    const totalCount = loc.customers.length;
    const isAllCompleted = completedCount === totalCount;

    return (
      <View style={[
        styles.locationCard,
        isInstitutionalGroup && !isAllCompleted && styles.institutionalCard,
        isAllCompleted && styles.completedCard
      ]}>
        <TouchableOpacity 
          style={styles.locationHeader} 
          onPress={() => toggleLocationExpand(loc.id)}
          activeOpacity={0.7}
        >
          <View style={styles.locationHeaderLeft}>
            <View style={styles.iconContainer}>
              {isAllCompleted ? (
                <CheckCircle size={24} color={Theme.colors.primary} />
              ) : isInstitutionalGroup ? (
                <School size={24} color={Theme.colors.accent} />
              ) : (
                <MapPin size={24} color={Theme.colors.textSecondary} />
              )}
            </View>
            <View style={styles.locationInfo}>
              {isInstitutionalGroup && !isAllCompleted && (
                <Text style={styles.priorityBadge}>PRIORITY: ICE DETERIORATION RISK</Text>
              )}
              <Text style={[styles.locationName, isAllCompleted && styles.completedText]}>{loc.name}</Text>
              <Text style={styles.locationAddress}>{loc.address}</Text>
              <Text style={styles.completionText}>{completedCount} / {totalCount} Customers Completed</Text>
            </View>
          </View>
          <View style={styles.locationHeaderRight}>
            {!isAllCompleted && (
              <TouchableOpacity style={styles.mapBtn} onPress={() => openMap(loc)}>
                <MapIcon size={20} color={Theme.colors.primaryDark} />
              </TouchableOpacity>
            )}
            {isExpanded ? (
              <ChevronUp size={24} color={Theme.colors.textSecondary} />
            ) : (
              <ChevronDown size={24} color={Theme.colors.textSecondary} />
            )}
          </View>
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.customersContainer}>
            {loc.customers.map((c, index) => {
              const customerCompleted = c.status === 'completed';
              return (
                <TouchableOpacity 
                  key={c.id} 
                  style={[
                    styles.customerItem,
                    index < loc.customers.length - 1 && styles.borderBottom,
                    customerCompleted && styles.completedCustomerItem
                  ]}
                  onPress={() => handleCustomerPress(c)}
                  disabled={customerCompleted}
                >
                  <View style={styles.customerLeft}>
                    <Store size={18} color={customerCompleted ? Theme.colors.border : Theme.colors.textSecondary} />
                    <Text style={[styles.customerName, customerCompleted && styles.completedText]}>
                      {c.name}
                    </Text>
                  </View>
                  <View style={styles.customerRight}>
                    <Text style={[styles.amountText, customerCompleted && styles.completedText]}>
                      ₱{c.amount}
                    </Text>
                    {!customerCompleted && (
                      <View style={styles.checkoutBtn}>
                        <Text style={styles.checkoutBtnText}>Checkout</Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
    );
  };

  const totalCompleted = locations.reduce((sum, loc) => sum + loc.customers.filter(c => c.status === 'completed').length, 0);
  const totalCustomers = locations.reduce((sum, loc) => sum + loc.customers.length, 0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Active Route</Text>
        <Text style={styles.subtitle}>{totalCompleted} of {totalCustomers} Deliveries Completed</Text>
      </View>

      <FlatList
        data={sortedLocations}
        keyExtractor={item => item.id}
        renderItem={renderLocationGroup}
        contentContainerStyle={styles.listContent}
      />

      <CheckoutModal 
        visible={checkoutVisible}
        stop={selectedCustomer}
        onClose={() => setCheckoutVisible(false)}
        onComplete={handleCheckoutComplete}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  header: {
    padding: Theme.spacing.lg,
    backgroundColor: Theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Theme.colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: Theme.colors.textSecondary,
    marginTop: 4,
  },
  listContent: {
    padding: Theme.spacing.lg,
    gap: Theme.spacing.md,
  },
  locationCard: {
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.borderRadius.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: Theme.colors.border,
    overflow: 'hidden',
  },
  institutionalCard: {
    borderLeftColor: Theme.colors.accent,
    backgroundColor: '#FFFAEB',
  },
  completedCard: {
    borderLeftColor: Theme.colors.primary,
    opacity: 0.7,
  },
  locationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Theme.spacing.md,
  },
  locationHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: Theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  locationInfo: {
    flex: 1,
  },
  priorityBadge: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#b45309',
    marginBottom: 4,
  },
  locationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Theme.colors.text,
    marginBottom: 2,
  },
  locationAddress: {
    fontSize: 13,
    color: Theme.colors.textSecondary,
    marginBottom: 4,
  },
  completionText: {
    fontSize: 12,
    color: Theme.colors.primary,
    fontWeight: '600',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: Theme.colors.textSecondary,
  },
  locationHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  mapBtn: {
    backgroundColor: Theme.colors.accent,
    padding: 8,
    borderRadius: Theme.borderRadius.full,
  },
  customersContainer: {
    backgroundColor: Theme.colors.background,
    paddingHorizontal: Theme.spacing.md,
    paddingBottom: Theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.border,
  },
  customerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Theme.spacing.md,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  completedCustomerItem: {
    opacity: 0.6,
  },
  customerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  customerName: {
    fontSize: 15,
    fontWeight: '600',
    color: Theme.colors.text,
  },
  customerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  amountText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Theme.colors.text,
  },
  checkoutBtn: {
    backgroundColor: Theme.colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Theme.borderRadius.sm,
  },
  checkoutBtnText: {
    color: Theme.colors.surface,
    fontWeight: 'bold',
    fontSize: 12,
  },
});
