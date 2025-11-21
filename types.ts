import React from 'react';

export enum VibeType {
  CHAOS = 'Chaos',
  CHILL = 'Chill',
  RAVE = 'Rave',
  HISTORY_FUN = 'History (Fun)',
  FOOD_COMA = 'Food Coma',
  SURF = 'Surf'
}

export interface NavLink {
  label: string;
  href: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}