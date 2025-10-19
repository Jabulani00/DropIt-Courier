import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Icon } from '../../components/ui/Icon';
import { GlassCard } from '../../components/ui/GlassCard';
import { Background } from '../../components/ui/Background';
import { AnimatedLogo } from '../../components/ui/AnimatedLogo';
import { colors, typography, spacing } from '../../config/theme';

const { width, height } = Dimensions.get('window');

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSendResetLink = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    setLoading(true);
    try {
      // TODO: Implement password reset functionality
      console.log('Password reset attempt for:', email);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setEmailSent(true);
      Alert.alert('Success', 'Password reset link sent to your email!');
    } catch (error) {
      Alert.alert('Error', 'Failed to send reset link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    router.push('/(auth)/login');
  };

  return (
    <Background>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Logo */}
            <AnimatedLogo size={100} style={styles.logoContainer} />

            {/* Welcome Text */}
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>
                {emailSent ? 'Check Your Email' : 'Forgot Password?'}
              </Text>
              <Text style={styles.subtitleText}>
                {emailSent 
                  ? 'We\'ve sent a reset link to your email address'
                  : 'Enter your email address and we\'ll send you a reset link'
                }
              </Text>
            </View>

            {/* Forgot Password Card */}
            <View style={styles.cardContainer}>
              <GlassCard style={styles.formCard}>
                {!emailSent ? (
                  <>
                    <View style={styles.inputGroup}>
                      <Input
                        placeholder="Enter your email address"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        leftIcon={<Icon name="mail" size={20} color={colors.text.muted} />}
                        style={styles.input}
                      />
                    </View>

                    <Button
                      variant="gradient"
                      size="lg"
                      onPress={handleSendResetLink}
                      loading={loading}
                      style={styles.resetButton}
                    >
                      Send Reset Link
                    </Button>
                  </>
                ) : (
                  <View style={styles.successContainer}>
                    <View style={styles.successIcon}>
                      <Icon name="check" size={32} color={colors.text.inverse} />
                    </View>
                    <Text style={styles.successText}>
                      Password reset link has been sent to:
                    </Text>
                    <Text style={styles.emailText}>{email}</Text>
                    <Text style={styles.instructionText}>
                      Please check your email and follow the instructions to reset your password.
                    </Text>
                  </View>
                )}

                <View style={styles.backContainer}>
                  <TouchableOpacity onPress={handleBackToLogin}>
                    <Text style={styles.backLink}>Back to Login</Text>
                  </TouchableOpacity>
                </View>
              </GlassCard>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Background>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
    justifyContent: 'center',
    minHeight: height,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  welcomeText: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.xxxxl,
    color: colors.text.primary,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  subtitleText: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.lg,
    color: colors.text.light,
    textAlign: 'center',
    opacity: 0.8,
    lineHeight: 24,
  },
  cardContainer: {
    marginHorizontal: spacing.md,
  },
  formCard: {
    padding: spacing.xxl,
  },
  inputGroup: {
    marginBottom: spacing.xl,
  },
  input: {
    marginBottom: spacing.md,
  },
  resetButton: {
    marginBottom: spacing.xl,
  },
  successContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  successIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  successText: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.base,
    color: colors.text.light,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  emailText: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.lg,
    color: colors.primary,
    fontWeight: typography.weights.bold,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  instructionText: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.sm,
    color: colors.text.muted,
    textAlign: 'center',
    lineHeight: 20,
  },
  backContainer: {
    alignItems: 'center',
    marginTop: spacing.md,
  },
  backLink: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.base,
    color: colors.primary,
    fontWeight: typography.weights.bold,
  },
});
