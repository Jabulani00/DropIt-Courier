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

export default function SignupScreen() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const getPasswordStrengthColor = (strength: number) => {
    if (strength < 2) return colors.status.error;
    if (strength < 3) return colors.status.warning;
    return colors.status.success;
  };

  const getPasswordStrengthText = (strength: number) => {
    if (strength < 2) return 'Weak';
    if (strength < 3) return 'Medium';
    return 'Strong';
  };

  const handleSignup = async () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (!acceptedTerms) {
      Alert.alert('Error', 'Please accept the Terms & Conditions');
      return;
    }

    setLoading(true);
    try {
      // TODO: Implement Firebase registration
      console.log('Signup attempt:', formData);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      Alert.alert('Success', 'Account created successfully!');
    } catch (error) {
      Alert.alert('Error', 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const handleLogin = () => {
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
              <Text style={styles.welcomeText}>Create Account</Text>
              <Text style={styles.subtitleText}>Join DropIt and start your journey</Text>
            </View>

            {/* Signup Card */}
            <View style={styles.cardContainer}>
              <GlassCard style={styles.formCard}>
                <View style={styles.inputGroup}>
                  <Input
                    placeholder="Full name"
                    value={formData.name}
                    onChangeText={(text) => setFormData({ ...formData, name: text })}
                    leftIcon={<Icon name="user" size={20} color={colors.text.muted} />}
                    style={styles.input}
                  />

                  <Input
                    placeholder="Email address"
                    value={formData.email}
                    onChangeText={(text) => setFormData({ ...formData, email: text })}
                    keyboardType="email-address"
                    leftIcon={<Icon name="mail" size={20} color={colors.text.muted} />}
                    style={styles.input}
                  />

                  <Input
                    placeholder="Phone number"
                    value={formData.phone}
                    onChangeText={(text) => setFormData({ ...formData, phone: text })}
                    keyboardType="phone-pad"
                    leftIcon={<Icon name="phone" size={20} color={colors.text.muted} />}
                    style={styles.input}
                  />

                  <Input
                    placeholder="Create password"
                    value={formData.password}
                    onChangeText={(text) => setFormData({ ...formData, password: text })}
                    secureTextEntry={!showPassword}
                    rightIcon={
                      <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Icon
                          name={showPassword ? 'eyeOff' : 'eye'}
                          size={20}
                          color={colors.text.muted}
                        />
                      </TouchableOpacity>
                    }
                    style={styles.input}
                  />

                  {formData.password.length > 0 && (
                    <View style={styles.passwordStrengthContainer}>
                      <View style={styles.passwordStrengthBar}>
                        <View
                          style={[
                            styles.passwordStrengthFill,
                            {
                              width: `${(passwordStrength / 4) * 100}%`,
                              backgroundColor: getPasswordStrengthColor(passwordStrength),
                            },
                          ]}
                        />
                      </View>
                      <Text
                        style={[
                          styles.passwordStrengthText,
                          { color: getPasswordStrengthColor(passwordStrength) },
                        ]}
                      >
                        {getPasswordStrengthText(passwordStrength)}
                      </Text>
                    </View>
                  )}

                  <Input
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
                    secureTextEntry={!showConfirmPassword}
                    rightIcon={
                      <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                        <Icon
                          name={showConfirmPassword ? 'eyeOff' : 'eye'}
                          size={20}
                          color={colors.text.muted}
                        />
                      </TouchableOpacity>
                    }
                    style={styles.input}
                  />
                </View>

                <TouchableOpacity
                  style={styles.termsContainer}
                  onPress={() => setAcceptedTerms(!acceptedTerms)}
                >
                  <View style={[styles.checkbox, acceptedTerms && styles.checkboxChecked]}>
                    {acceptedTerms && <Icon name="check" size={14} color={colors.text.inverse} />}
                  </View>
                  <Text style={styles.termsText}>
                    I agree to the{' '}
                    <Text style={styles.termsLink}>Terms & Conditions</Text>
                  </Text>
                </TouchableOpacity>

                <Button
                  variant="gradient"
                  size="lg"
                  onPress={handleSignup}
                  loading={loading}
                  disabled={!acceptedTerms}
                  style={styles.signupButton}
                >
                  Create Account
                </Button>

                <View style={styles.loginContainer}>
                  <Text style={styles.loginText}>Already have an account? </Text>
                  <TouchableOpacity onPress={handleLogin}>
                    <Text style={styles.loginLink}>Sign In</Text>
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
  },
  cardContainer: {
    marginHorizontal: spacing.md,
  },
  formCard: {
    padding: spacing.xxl,
  },
  inputGroup: {
    marginBottom: spacing.lg,
  },
  input: {
    marginBottom: spacing.md,
  },
  passwordStrengthContainer: {
    marginTop: -spacing.sm,
    marginBottom: spacing.md,
  },
  passwordStrengthBar: {
    height: 3,
    backgroundColor: colors.glassBorder,
    borderRadius: 2,
    overflow: 'hidden',
  },
  passwordStrengthFill: {
    height: '100%',
    borderRadius: 2,
  },
  passwordStrengthText: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.sm,
    marginTop: spacing.xs,
    fontWeight: typography.weights.medium,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.xl,
    paddingVertical: spacing.xs,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.glassBorder,
    backgroundColor: colors.glass,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  termsText: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.sm,
    color: colors.text.light,
    flex: 1,
    lineHeight: 20,
  },
  termsLink: {
    color: colors.primary,
    fontWeight: typography.weights.bold,
  },
  signupButton: {
    marginBottom: spacing.lg,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  loginText: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.base,
    color: colors.text.light,
  },
  loginLink: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.base,
    color: colors.primary,
    fontWeight: typography.weights.bold,
    marginLeft: spacing.xs,
  },
});