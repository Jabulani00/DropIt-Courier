import { Firestore, getFirestore } from 'firebase/firestore';
import { Auth, getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import '../config/firebase'; // Initialize Firebase

export class ServiceError extends Error {
  constructor(
    public uppercase: string,
    message: string,
    public statusCode: number,
    public details?: any
  ) {
    super(message);
    this.name = 'ServiceError';
  }
}

export abstract class BaseService {
  protected db: Firestore;
  protected auth: Auth;
  protected storage: ReturnType<typeof getStorage>;
  
  constructor() {
    this.db = getFirestore();
    this.auth = getAuth();
    this.storage = getStorage();
  }
  
  protected handleError(error: any, context: string): never {
    console.error(`Error in ${context}:`, error);
    
    if (error instanceof ServiceError) {
      throw error;
    }
    
    // Firebase specific error handling
    if (error.code) {
      switch (error.code) {
        case 'auth/user-not-found':
          throw new ServiceError('USER_NOT_FOUND', 'User not found', 404);
        case 'auth/wrong-password':
          throw new ServiceError('INVALID_CREDENTIALS', 'Invalid credentials', 401);
        case 'auth/email-already-in-use':
          throw new ServiceError('EMAIL_EXISTS', 'Email already in use', 409);
        case 'firestore/permission-denied':
          throw new ServiceError('PERMISSION_DENIED', 'Permission denied', 403);
        default:
          throw new ServiceError('UNKNOWN_ERROR', 'An unknown error occurred', 500);
      }
    }
    
    throw new ServiceError('UNKNOWN_ERROR', 'An unknown error occurred', 500);
  }
  
  protected validateInput(data: any, rules: Record<string, any>): boolean {
    for (const [field, rule] of Object.entries(rules)) {
      if (rule.required && !data[field]) {
        throw new ServiceError('VALIDATION_ERROR', `${field} is required`, 400);
      }
      
      if (data[field] && rule.type) {
        if (typeof data[field] !== rule.type) {
          throw new ServiceError('VALIDATION_ERROR', `${field} must be of type ${rule.type}`, 400);
        }
      }
      
      if (data[field] && rule.minLength && data[field].length < rule.minLength) {
        throw new ServiceError('VALIDATION_ERROR', `${field} must be at least ${rule.minLength} characters`, 400);
      }
      
      if (data[field] && rule.maxLength && data[field].length > rule.maxLength) {
        throw new ServiceError('VALIDATION_ERROR', `${field} must be no more than ${rule.maxLength} characters`, 400);
      }
    }
    
    return true;
  }
}
