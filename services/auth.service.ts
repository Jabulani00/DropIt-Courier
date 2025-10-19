import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile as updateAuthProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { BaseService, ServiceError } from './base.service';
import { User, CreateUserData, UpdateUserData } from '../models/User';

export class AuthService extends BaseService {
  private googleProvider = new GoogleAuthProvider();

  async signUpWithEmail(email: string, password: string, userData: CreateUserData): Promise<User> {
    try {
      this.validateInput({ email, password }, {
        email: { required: true, type: 'string' },
        password: { required: true, type: 'string', minLength: 8 }
      });

      // Create Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;

      // Create user document in Firestore
      const userDoc: User = {
        uid: user.uid,
        email: userData.email,
        phone: userData.phone,
        name: userData.name,
        role: userData.role,
        profileUrl: userData.profileUrl || null,
        createdAt: new Date() as any,
        updatedAt: new Date() as any,
        isActive: true,
        deviceToken: null
      };

      await setDoc(doc(this.db, 'users', user.uid), userDoc);

      // Update Firebase Auth profile
      await updateAuthProfile(user, {
        displayName: userData.name,
        photoURL: userData.profileUrl || null
      });

      return userDoc;
    } catch (error) {
      this.handleError(error, 'signUpWithEmail');
    }
  }

  async signInWithEmail(email: string, password: string): Promise<User> {
    try {
      this.validateInput({ email, password }, {
        email: { required: true, type: 'string' },
        password: { required: true, type: 'string' }
      });

      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;

      // Fetch user document from Firestore
      const userDoc = await getDoc(doc(this.db, 'users', user.uid));
      
      if (!userDoc.exists()) {
        throw new ServiceError('USER_NOT_FOUND', 'User document not found', 404);
      }

      return userDoc.data() as User;
    } catch (error) {
      this.handleError(error, 'signInWithEmail');
    }
  }

  async signInWithGoogle(): Promise<User> {
    try {
      const result = await signInWithPopup(this.auth, this.googleProvider);
      const user = result.user;

      // Check if user document exists
      const userDoc = await getDoc(doc(this.db, 'users', user.uid));
      
      if (userDoc.exists()) {
        return userDoc.data() as User;
      }

      // Create new user document for Google sign-in
      const newUser: User = {
        uid: user.uid,
        email: user.email!,
        phone: user.phoneNumber || '',
        name: user.displayName || '',
        role: 'customer', // Default role
        profileUrl: user.photoURL || null,
        createdAt: new Date() as any,
        updatedAt: new Date() as any,
        isActive: true,
        deviceToken: null
      };

      await setDoc(doc(this.db, 'users', user.uid), newUser);
      return newUser;
    } catch (error) {
      this.handleError(error, 'signInWithGoogle');
    }
  }

  async signOut(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch (error) {
      this.handleError(error, 'signOut');
    }
  }

  async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      this.validateInput({ email }, {
        email: { required: true, type: 'string' }
      });

      await sendPasswordResetEmail(this.auth, email);
    } catch (error) {
      this.handleError(error, 'sendPasswordResetEmail');
    }
  }

  async updateProfile(userId: string, data: UpdateUserData): Promise<void> {
    try {
      this.validateInput(data, {
        name: { type: 'string', minLength: 2, maxLength: 50 },
        phone: { type: 'string' }
      });

      // Update Firestore document
      await updateDoc(doc(this.db, 'users', userId), {
        ...data,
        updatedAt: new Date()
      });

      // Update Firebase Auth profile if name changed
      if (data.name && this.auth.currentUser) {
        await updateAuthProfile(this.auth.currentUser, {
          displayName: data.name,
          photoURL: data.profileUrl || undefined
        });
      }
    } catch (error) {
      this.handleError(error, 'updateProfile');
    }
  }

  async deleteAccount(userId: string): Promise<void> {
    try {
      // Delete user document and associated data
      // This would need to be implemented with Cloud Functions
      // for proper cleanup of related data
      throw new ServiceError('NOT_IMPLEMENTED', 'Account deletion not implemented', 501);
    } catch (error) {
      this.handleError(error, 'deleteAccount');
    }
  }

  getCurrentUser(): User | null {
    const user = this.auth.currentUser;
    if (!user) return null;
    
    // This is a simplified version - in practice, you'd want to
    // fetch the user document from Firestore
    return {
      uid: user.uid,
      email: user.email!,
      phone: user.phoneNumber || '',
      name: user.displayName || '',
      role: 'customer', // This should come from Firestore
      profileUrl: user.photoURL || null,
      createdAt: new Date() as any,
      updatedAt: new Date() as any,
      isActive: true,
      deviceToken: null
    };
  }
}
