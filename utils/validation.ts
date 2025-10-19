// Validation utility functions for DropIt app

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  // E.164 format validation
  const phoneRegex = /^\+[1-9]\d{1,14}$/;
  return phoneRegex.test(phone);
};

export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[^A-Za-z0-9]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateName = (name: string): boolean => {
  // Name should be 2-50 characters, letters and spaces only
  const nameRegex = /^[a-zA-Z\s]{2,50}$/;
  return nameRegex.test(name.trim());
};

export const validateLicensePlate = (plate: string): boolean => {
  // South African license plate format
  const plateRegex = /^[A-Z]{2,3}\s?\d{3}\s?[A-Z]{2}$/;
  return plateRegex.test(plate.toUpperCase());
};

export const validateLicenseNumber = (license: string): boolean => {
  // Driver's license number format
  return license.length >= 8 && license.length <= 20;
};

export const validateCoordinates = (lat: number, lng: number): boolean => {
  return (
    lat >= -90 && lat <= 90 &&
    lng >= -180 && lng <= 180 &&
    !isNaN(lat) && !isNaN(lng)
  );
};

export const validateDeliveryType = (type: string): boolean => {
  const validTypes = ['parcel', 'furniture', 'food', 'butchery', 'hardware', 'documents', 'custom'];
  return validTypes.includes(type);
};

export const validateVehicleType = (type: string): boolean => {
  const validTypes = ['bike', 'sedan', 'van', 'truck'];
  return validTypes.includes(type);
};

export const validateRating = (rating: number): boolean => {
  return Number.isInteger(rating) && rating >= 1 && rating <= 5;
};

export const sanitizeString = (str: string): string => {
  return str.trim().replace(/[<>]/g, '');
};

export const validateFileUpload = (file: { type: string; size: number }): { isValid: boolean; error?: string } => {
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  const maxSize = 5 * 1024 * 1024; // 5MB
  
  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: 'File type not supported. Please upload JPG, PNG, or PDF files.' };
  }
  
  if (file.size > maxSize) {
    return { isValid: false, error: 'File size too large. Maximum size is 5MB.' };
  }
  
  return { isValid: true };
};
