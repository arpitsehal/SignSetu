import Image from "next/image";
import GameRoom from "./game/[roomId]/page"; // Import the GameRoom component

export default function Home() {
  // For now, we'll render the GameRoom directly.
  // In a real application, you might have a landing page
  // and then navigate to the game room.
  return (
    <GameRoom params={{ roomId: "lobby" }} /> // Pass a default roomId for now
  );
}
