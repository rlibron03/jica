import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Theme } from '../constants/Theme';

export default function LoginScreen({ navigation }: any) {
  const [pin, setPin] = useState('');

  const handleLogin = () => {
    // Mock login, go to Main app
    navigation.replace('Main');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../assets/JICA Ice Logistics Logo.png')} 
            style={styles.logoImage} 
            resizeMode="contain" 
          />
          <Text style={styles.title}>Ice Logistics</Text>
          <Text style={styles.subtitle}>Driver Portal</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Driver PIN</Text>
          <TextInput
            style={styles.input}
            value={pin}
            onChangeText={setPin}
            keyboardType="number-pad"
            secureTextEntry
            placeholder="Enter 4-digit PIN"
            placeholderTextColor={Theme.colors.textSecondary}
            maxLength={4}
          />
          
          <TouchableOpacity 
            style={[styles.button, pin.length < 4 && styles.buttonDisabled]} 
            onPress={handleLogin}
            disabled={pin.length < 4}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.primaryDark,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: Theme.spacing.lg,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: Theme.spacing.xxl,
  },
  logoImage: {
    width: 150,
    height: 150,
    marginBottom: Theme.spacing.md,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Theme.colors.surface,
  },
  subtitle: {
    fontSize: 16,
    color: Theme.colors.accent,
    marginTop: Theme.spacing.xs,
  },
  formContainer: {
    backgroundColor: Theme.colors.surface,
    padding: Theme.spacing.xl,
    borderRadius: Theme.borderRadius.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.sm,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: Theme.borderRadius.md,
    paddingHorizontal: Theme.spacing.md,
    fontSize: 18,
    color: Theme.colors.text,
    backgroundColor: Theme.colors.background,
    marginBottom: Theme.spacing.lg,
    textAlign: 'center',
    letterSpacing: 8,
  },
  button: {
    backgroundColor: Theme.colors.primary,
    height: 56,
    borderRadius: Theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: Theme.colors.surface,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
