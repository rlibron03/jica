import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';
import { Theme } from '../constants/Theme';
import { AlertTriangle, Wrench, XCircle, ShieldAlert, X } from 'lucide-react-native';

export default function EmergencySOS() {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSOS = (reason: string) => {
    // Mock distress payload
    console.log(`SOS Dispatched: ${reason}`);
    Alert.alert(
      "SOS Sent", 
      `Dispatch has been notified of: ${reason}. Please stay safe.`,
      [{ text: "OK", onPress: () => setModalVisible(false) }]
    );
  };

  return (
    <>
      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
      >
        <ShieldAlert size={32} color={Theme.colors.surface} />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <View style={styles.headerTitleRow}>
                <AlertTriangle size={28} color={Theme.colors.danger} />
                <Text style={styles.title}>EMERGENCY SOS</Text>
              </View>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeBtn}>
                <X size={24} color={Theme.colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <Text style={styles.subtitle}>Select the reason for breakdown. This will instantly alert the dispatch dashboard.</Text>

            <View style={styles.optionsContainer}>
              <TouchableOpacity style={styles.optionButton} onPress={() => handleSOS('Flat Tire')}>
                <XCircle size={24} color={Theme.colors.danger} />
                <Text style={styles.optionText}>Flat Tire</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.optionButton} onPress={() => handleSOS('Engine Failure')}>
                <Wrench size={24} color={Theme.colors.danger} />
                <Text style={styles.optionText}>Engine Failure</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.optionButton} onPress={() => handleSOS('Accident')}>
                <AlertTriangle size={24} color={Theme.colors.danger} />
                <Text style={styles.optionText}>Accident</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: Theme.colors.danger,
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Theme.colors.danger,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 100,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Theme.spacing.lg,
  },
  modalContent: {
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.borderRadius.xl,
    padding: Theme.spacing.lg,
    width: '100%',
    maxWidth: 400,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: Theme.colors.danger,
  },
  subtitle: {
    fontSize: 14,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.xl,
    lineHeight: 20,
  },
  closeBtn: {
    padding: 4,
  },
  optionsContainer: {
    gap: Theme.spacing.md,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: Theme.spacing.lg,
    backgroundColor: '#fef2f2', // red-50
    borderRadius: Theme.borderRadius.md,
    borderWidth: 1,
    borderColor: '#fecaca', // red-200
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Theme.colors.danger,
  },
});
