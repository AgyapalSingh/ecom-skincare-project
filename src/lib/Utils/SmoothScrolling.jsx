import { ReactLenis } from "lenis/react";
function SmoothScrolling({ children }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 2, smoothTouch: 1, syncTouch: true }}>
      {children}
    </ReactLenis>
  );
}

export default SmoothScrolling;
