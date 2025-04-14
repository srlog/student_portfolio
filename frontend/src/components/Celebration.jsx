import { Player } from "@lottiefiles/react-lottie-player";
import fireworksAnimation from "./fireworks.json";
import cupAnimation from "./cup.json";
import "./celebration.css";

const Celebration = () => {
  return (
    <div style={{ position: "relative", height: "100vh", width: "98vw" }}>
      {/* Glowing Text */}
      <div className="glow-text">Achievement Added11!!!</div>

      {/* Cup Animation with Scaling */}
      <div className="cup-container">
        <Player
          autoplay
          loop
          src={cupAnimation}
          style={{
            height: "40vh",
            width: "40vw",
          }}
        />
      </div>

      {/* Fireworks Background */}
      <Player
        autoplay
        loop
        src={fireworksAnimation}
        style={{ height: "100vh", width: "98vw" }}
      />
    </div>
  );
};

export default Celebration;
