declare global {
  interface Window {
    paymentBrickController?: { unmount: () => void };
  }
}
export {};