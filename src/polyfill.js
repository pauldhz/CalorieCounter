// Simple Buffer polyfill import
import { Buffer } from 'buffer';

// Make Buffer globally available
if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
}

if (typeof global !== 'undefined') {
  global.Buffer = Buffer;
}

// Export as ES module
export default Buffer;
