import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
function App() {
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const text = enabled ? 'Desactivar puntero' : 'Activar puntero';
  useEffect(() => {
    const followMouse = (event) => {
      const { clientX, clientY } = event;
      setPosition({ x: clientX, y: clientY });
    }
    if (enabled) {

      window.addEventListener('pointermove', followMouse)
    } else {
      confetti();
    }
    return () => {
      window.removeEventListener('pointermove', followMouse)
    }

  }, [enabled])
  return (
    <>
      <div style={{
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: '50%',
        opacity: .8,
        pointerEvents: 'none',
        cursor: 'none',
        left: -25,
        top: -25,
        width: 50,
        height: 50,
        border: '1px solid #fff',
        transform: `translate(${position.x}px,${position.y}px)`
      }}></div >
      <h1>Proyecto 2</h1>
      <button onClick={() => {
        setEnabled(!enabled)
      }}>{text}</button>

    </>

  )
}

export default App
