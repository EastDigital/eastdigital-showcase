/**
 * Utility function for adding haptic feedback on touch devices
 */
export const triggerHapticFeedback = (intensity: number = 30) => {
  if ("vibrate" in navigator) {
    navigator.vibrate(intensity);
  }
};

/**
 * Different haptic patterns for various interactions
 */
export const HapticPatterns = {
  TAP: 30,        // Light tap for buttons
  SELECT: 50,     // Medium buzz for selections
  SUCCESS: [100, 50, 100], // Pattern for success actions
  ERROR: [200, 100, 200],  // Pattern for errors
} as const;