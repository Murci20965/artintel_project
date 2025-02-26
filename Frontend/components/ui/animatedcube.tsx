import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Edges } from "@react-three/drei"
import type * as THREE from "three"

export function AnimatedCube() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2
      meshRef.current.rotation.y += delta * 0.3

      // Add a floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1
    }
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshBasicMaterial color="#00cbdd" opacity={0.2} transparent />
      <Edges
        scale={1}
        threshold={15} // Display edges only when face angles exceed 15 degrees
        color="#00cbdd"
      />
    </mesh>
  )
}

