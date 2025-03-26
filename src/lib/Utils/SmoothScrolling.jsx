import { ReactLenis } from "lenis/react";
function SmoothScrolling({ children }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1, smoothTouch: 0.5, syncTouch: true }}>
      {children}
    </ReactLenis>
  );
}

export default SmoothScrolling;
