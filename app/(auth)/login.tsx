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

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      // TODO: Implement Firebase authentication
      console.log('Login attempt:', { email, password });
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      Alert.alert('Success', 'Login successful!');
    } catch (error) {
      Alert.alert('Error', 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      // TODO: Implement Google Sign-In
      console.log('Google login attempt');
      await new Promise(resolve => setTimeout(resolve, 2000));
      Alert.alert('Success', 'Google login successful!');
    } catch (error) {
      Alert.alert('Error', 'Google login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    router.push('/(auth)/forgot-password');
  };

  const handleSignUp = () => {
    router.push('/(auth)/signup');
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
            <AnimatedLogo size={120} style={styles.logoContainer} />

            {/* Welcome Text */}
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome Back</Text>
              <Text style={styles.subtitleText}>Sign in to continue your journey</Text>
            </View>

            {/* Login Card */}
            <View style={styles.cardContainer}>
              <GlassCard style={styles.formCard}>
                <View style={styles.inputGroup}>
                  <Input
                    placeholder="Email or phone number"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    leftIcon={<Icon name="mail" size={20} color={colors.text.muted} />}
                    style={styles.input}
                  />

                  <Input
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
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
                </View>

                <TouchableOpacity style={styles.forgotPassword} onPress={handleForgotPassword}>
                  <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>

                <Button
                  variant="gradient"
                  size="lg"
                  onPress={handleLogin}
                  loading={loading}
                  style={styles.loginButton}
                >
                  Sign In
                </Button>

                {/* Social Login */}
                <View style={styles.socialContainer}>
                  <View style={styles.dividerContainer}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>or</Text>
                    <View style={styles.dividerLine} />
                  </View>

                  <Button
                    variant="glass"
                    size="lg"
                    onPress={handleGoogleLogin}
                    disabled={loading}
                    icon={<Icon name="user" size={20} color={colors.text.onGlass} />}
                    style={styles.socialButton}
                  >
                    Continue with Google
                  </Button>
                </View>

                <View style={styles.signupContainer}>
                  <Text style={styles.signupText}>Don't have an account? </Text>
                  <TouchableOpacity onPress={handleSignUp}>
                    <Text style={styles.signupLink}>Sign Up</Text>
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: spacing.xl,
    paddingVertical: spacing.sm,
  },
  forgotPasswordText: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.sm,
    color: colors.primary,
    fontWeight: typography.weights.medium,
  },
  loginButton: {
    marginBottom: spacing.xl,
  },
  socialContainer: {
    marginTop: spacing.md,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.glassBorder,
  },
  dividerText: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.sm,
    color: colors.text.muted,
    marginHorizontal: spacing.md,
  },
  socialButton: {
    marginBottom: spacing.lg,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  signupText: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.base,
    color: colors.text.light,
  },
  signupLink: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.base,
    color: colors.primary,
    fontWeight: typography.weights.bold,
    marginLeft: spacing.xs,
  },
});