import { createRoot } from "react-dom/client";
import ProfileCard from "./components/ProfileCard";

const mountNode = document.querySelector("#hero-profile-root");

if (!mountNode) {
  throw new Error("Hero profile mount point not found.");
}

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
