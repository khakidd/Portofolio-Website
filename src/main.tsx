import { createRoot } from "react-dom/client";
import Galaxy from "./components/Galaxy";
import ProfileCard from "./components/ProfileCard";

const mountNode = document.querySelector("#hero-profile-root");
const homeSection = document.querySelector("#home");

if (!mountNode) {
  throw new Error("Hero profile mount point not found.");
}

if (!homeSection) {
  throw new Error("Home section not found.");
}

const galaxyMount = document.createElement("div");
galaxyMount.className = "hero-galaxy-root";
galaxyMount.setAttribute("aria-hidden", "true");
homeSection.prepend(galaxyMount);

createRoot(galaxyMount).render(
  <Galaxy
    density={1}
    glowIntensity={0.3}
    flareIntensity={1}
    starSpeed={0.5}
    mouseRepulsion
    clickWarp
    starColors={["#65b8ff"]}
    hueShift={140}
    saturation={0}
    starSize={1}
    twinkleIntensity={0.3}
    speed={1}
    rotationSpeed={0.1}
    layers={4}
    direction="forward"
    repulsionStrength={2}
    mouseInteraction
    intro
    lightMode={false}
  />,
);

createRoot(mountNode).render(
  <ProfileCard
    avatarUrl={`${import.meta.env.BASE_URL}assets/img/profil.png`}
    name="Rakharsya Fatra"
    title="Frontend Developer"
    handle="khakidd"
    status="Online"
    contactText="Contact"
    statusColor="#d8fa7b"
    onContactClick={() => {
      window.location.href = "mailto:rakharsya.fatra@gmail.com";
    }}
  />,
);
