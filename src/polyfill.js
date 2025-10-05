// Simple Buffer polyfill import
import { Buffer } from 'buffer';

// Make Buffer globally available
if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
}

if (typeof global !== 'undefined') {
  global.Buffer = Buffer;
}

// For module environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Buffer;
}
