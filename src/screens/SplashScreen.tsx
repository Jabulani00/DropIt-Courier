import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, spacing, shadows } from '../theme';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  navigation: any;
}

export default function SplashScreen({ navigation }: SplashScreenProps) {
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary.deepBrown} />
      
      <LinearGradient
        colors={[colors.primary.deepBrown, colors.primary.burntOrange]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.content}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          
          {/* App Title */}
          <Text style={styles.title}>DropIt</Text>
          
          {/* Tagline */}
          <Text style={styles.tagline}>
            Premium Courier Experience
          </Text>
          
          {/* Loading Indicator */}
          <View style={styles.loadingContainer}>
            <View style={styles.loadingBar}>
              <View style={styles.loadingProgress} />
            </View>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  logoContainer: {
    width: Math.max(120, width * 0.3),
    height: Math.max(120, width * 0.3),
    marginBottom: Math.max(spacing.xl, height * 0.03),
    backgroundColor: colors.background.secondary,
    borderRadius: 20,
    padding: Math.max(spacing.lg, width * 0.04),
    ...shadows.lg,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: Math.max(36, width * 0.12),
    color: colors.text.inverse,
    marginBottom: spacing.md,
    textAlign: 'center',
    fontWeight: '700',
    lineHeight: Math.max(43, width * 0.12 * 1.2),
  },
  tagline: {
    fontSize: Math.max(16, width * 0.045),
    color: colors.text.inverse,
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: spacing['6xl'],
    lineHeight: Math.max(24, width * 0.045 * 1.5),
    fontWeight: '400',
  },
  loadingContainer: {
    width: width * 0.6,
    alignItems: 'center',
  },
  loadingBar: {
    width: '100%',
    height: 4,
    backgroundColor: colors.background.primary,
    borderRadius: 2,
    overflow: 'hidden',
  },
  loadingProgress: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.text.inverse,
    borderRadius: 2,
    // Animation would go here
  },
});
