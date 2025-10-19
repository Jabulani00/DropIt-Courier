import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Redirect } from 'expo-router';
import { Icon } from '../components/ui/Icon';
import { colors, typography, spacing } from '../config/theme';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulate app initialization
    const initApp = async () => {
      // TODO: Check authentication status
      // TODO: Load user data from Firestore
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsLoading(false);
    };

    initApp();
  }, []);

  if (isLoading) {
    return (
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        style={styles.container}
      >
        <View style={styles.splashContent}>
          <View style={styles.logoContainer}>
            <Icon name="truck" size={80} color={colors.text.inverse} />
          </View>
          <Text style={styles.appName}>DropIt</Text>
          <Text style={styles.slogan}>Move Smart. Deliver Fast.</Text>
          <ActivityIndicator 
            size="large" 
            color={colors.text.inverse} 
            style={styles.loader}
          />
        </View>
      </LinearGradient>
    );
  }

  // TODO: Implement proper authentication routing
  // For demo purposes, redirect to demo
  return <Redirect href="/demo" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashContent: {
    alignItems: 'center',
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  appName: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.xxxl * 1.5,
    color: colors.text.inverse,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.sm,
  },
  slogan: {
    fontFamily: typography.fonts.bodyItalic,
    fontSize: typography.sizes.lg,
    color: colors.text.inverse,
    opacity: 0.9,
    marginBottom: spacing.xxl,
  },
  loader: {
    marginTop: spacing.xl,
  },
});