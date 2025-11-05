declare module 'offscreencanvas' {
  global {
    interface Window {
      OffscreenCanvas: any;
    }
  }
}

declare module 'pako' {
  const pako: any;
  export default pako;
}