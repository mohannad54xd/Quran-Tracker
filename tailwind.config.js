module.exports = {
  // ...existing code...
  theme: {
    extend: {
      // ...existing code...
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.2s ease-out',
        'gradient-x': 'gradient-x 3s ease infinite'
      }
    },
  },
  // ...existing code...
}