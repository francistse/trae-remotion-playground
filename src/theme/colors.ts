export const colors = {
  primary: {
    red: '#DC143C',
    redLight: '#FF6B6B',
    redDark: '#8B0000',
  },
  accent: {
    gold: '#FFD700',
    goldLight: '#FFEC8B',
    goldDark: '#DAA520',
    orange: '#FFA500',
  },
  background: {
    gradientStart: '#8B0000',
    gradientEnd: '#DC143C',
    overlay: 'rgba(139, 0, 0, 0.3)',
  },
  text: {
    white: '#FFFFFF',
    gold: '#FFD700',
    cream: '#FFF8DC',
  },
} as const;

export const gradients = {
  background: 'linear-gradient(135deg, #8B0000 0%, #DC143C 50%, #FF6B6B 100%)',
  goldShimmer: 'linear-gradient(90deg, #FFD700 0%, #FFEC8B 50%, #FFD700 100%)',
  festive: 'linear-gradient(180deg, #DC143C 0%, #8B0000 100%)',
} as const;
