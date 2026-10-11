import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Theme } from '../constants/Theme';
import { X, Banknote, FileText } from 'lucide-react-native';

interface CheckoutModalProps {
  visible: boolean;
  stop: any;
  onClose: () => void;
  onComplete: (method: 'cash' | 'charge') => void;
}

export default function CheckoutModal({ visible, stop, onClose, onComplete }: CheckoutModalProps) {
  if (!stop) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Checkout</Text>
              <Text style={styles.stopName}>{stop.name}</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <X size={24} color={Theme.colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total Amount Due</Text>
            <Text style={styles.summaryAmount}>₱{stop.amount.toLocaleString()}</Text>
            <Text style={styles.summarySub}>No physical signature required.</Text>
          </View>

          <View style={styles.actionContainer}>
            <TouchableOpacity
              style={[styles.massiveButton, styles.cashButton]}
              onPress={() => onComplete('cash')}
            >
              <Banknote size={32} color={Theme.colors.surface} />
              <Text style={styles.massiveButtonText}>Confirm Paid (Cash)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.massiveButton, styles.chargeButton]}
              onPress={() => onComplete('charge')}
            >
              <FileText size={32} color={Theme.colors.primaryDark} />
              <Text style={[styles.massiveButtonText, { color: Theme.colors.primaryDark }]}>
                Confirm Charge Invoice
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Theme.colors.background,
    borderTopLeftRadius: Theme.borderRadius.xl,
    borderTopRightRadius: Theme.borderRadius.xl,
    padding: Theme.spacing.lg,
    paddingBottom: Theme.spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Theme.spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Theme.colors.text,
  },
  stopName: {
    fontSize: 16,
    color: Theme.colors.textSecondary,
    marginTop: 4,
  },
  closeBtn: {
    padding: 8,
  },
  summaryCard: {
    backgroundColor: Theme.colors.surface,
    padding: Theme.spacing.xl,
    borderRadius: Theme.borderRadius.lg,
    alignItems: 'center',
    marginBottom: Theme.spacing.xl,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  summaryLabel: {
    fontSize: 16,
    color: Theme.colors.textSecondary,
    marginBottom: 8,
  },
  summaryAmount: {
    fontSize: 48,
    fontWeight: '900',
    color: Theme.colors.primary,
  },
  summarySub: {
    fontSize: 12,
    color: Theme.colors.textSecondary,
    marginTop: 8,
    fontStyle: 'italic',
  },
  actionContainer: {
    gap: Theme.spacing.md,
  },
  massiveButton: {
    height: 80,
    borderRadius: Theme.borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cashButton: {
    backgroundColor: Theme.colors.primary,
  },
  chargeButton: {
    backgroundColor: Theme.colors.accent,
  },
  massiveButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Theme.colors.surface,
  },
});
