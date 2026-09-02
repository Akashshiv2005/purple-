"use client";
import React from 'react';
import { AuthProvider } from '@/modules/auth/AuthContext';
import { LocationProvider } from '@/shared/context/LocationContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <LocationProvider>
        {children}
      </LocationProvider>
    </AuthProvider>
  );
}
