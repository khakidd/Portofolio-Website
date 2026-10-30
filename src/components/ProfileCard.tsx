import { memo, useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Mail01Icon } from "@hugeicons/core-free-icons";
import "./ProfileCard.css";

type Theme = "dark" | "light";
type Axis = { p: number; v: number; target: number };
type Engine = {
  aim: (x: number, y: number, active?: boolean) => void;
  release: () => void;
  write: () => void;
};
type ProfileCardStyle = CSSProperties & {
  [key: `--${string}`]: string | number;
};

export interface ProfileCardProps {
  avatarUrl?: string;
  iconUrl?: string;
  miniAvatarUrl?: string;
  name?: string;
  title?: string;
  handle?: string;
  status?: string;
  statusColor?: string;
  contactText?: string;
  showUserInfo?: boolean;
  onContactClick?: () => void;
  theme?: Theme;
  backdropColor?: string;
  radius?: number;
  holo?: number;
  glare?: number;
  enableTilt?: boolean;
  tiltStrength?: number;
  parallax?: number;
  intro?: boolean;
  className?: string;
}

const THEMES: Record<Theme, Record<string, string>> = {
  dark: {
    "--pc-frame": "rgb(16 33 56 / 82%)",
    "--pc-frame-edge": "rgb(222 247 255 / 22%)",
    "--pc-frame-highlight": "rgb(255 255 255 / 14%)",
    "--pc-frame-shadow": "0 22px 44px -20px rgb(0 0 0 / 80%), 0 6px 16px -8px rgb(0 0 0 / 50%)",
    "--pc-tile": "linear-gradient(180deg, #102138 0%, #0d1a2b 100%)",
    "--pc-tile-edge": "rgb(255 255 255 / 9%)",
    "--pc-tile-highlight": "rgb(255 255 255 / 13%)",
    "--pc-tile-shadow": "0 4px 10px -4px rgb(0 0 0 / 70%)",
    "--pc-ink": "#edf4f6",
    "--pc-muted": "rgb(237 244 246 / 66%)",
    "--pc-hover": "brightness(1.12)",
    "--pc-press": "brightness(.8)",
    "--pc-shade": "rgb(8 19 33 / 42%)",
  },
  light: {
    "--pc-frame": "rgb(240 240 243 / 82%)",
    "--pc-frame-edge": "rgb(24 24 27 / 9%)",
    "--pc-frame-highlight": "rgb(255 255 255 / 95%)",
    "--pc-frame-shadow": "0 22px 44px -22px rgb(24 24 27 / 30%), 0 6px 16px -10px rgb(24 24 27 / 16%)",
    "--pc-tile": "linear-gradient(180deg, #fff 0%, #f6f6f8 100%)",
    "--pc-tile-edge": "rgb(24 24 27 / 8%)",
    "--pc-tile-highlight": "#fff",
    "--pc-tile-shadow": "0 4px 10px -5px rgb(24 24 27 / 25%)",
    "--pc-ink": "#27272a",
    "--pc-muted": "rgb(39 39 42 / 60%)",
    "--pc-hover": "brightness(.97)",
    "--pc-press": "brightness(.92)",
    "--pc-shade": "rgb(24 24 27 / 14%)",
  },
};

const FOILS: Record<Theme, Record<string, string>> = {
  dark: {
    "--pc-blend": "color-dodge",
    "--pc-holo-filter": "hue-rotate(0deg)",
    "--pc-sheen": "rgb(255 255 255 / 16%)",
  },
  light: {
    "--pc-blend": "multiply",
    "--pc-holo-filter": "invert(1) hue-rotate(180deg)",
    "--pc-sheen": "rgb(255 255 255 / 0%)",
  },
};

const GRAIN = `url("data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='500' height='500'><filter id='g' x='0' y='0' width='100%' height='100%' color-interpolation-filters='sRGB'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0.55 0 0 0 -0.24 0.55 0 0 0 -0.24 0.55 0 0 0 -0.24 0 0 0 0 1'/></filter><rect width='100%' height='100%' filter='url(#g)'/></svg>",
)}")`;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function isDark(color: string) {
  const match = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(color.trim());
  if (!match) return null;
  const hex = match[1].length === 3 ? match[1].replace(/./g, (digit) => digit + digit) : match[1];
  const [red, green, blue] = [0, 2, 4].map((index) => parseInt(hex.slice(index, index + 2), 16) / 255);
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue < 0.5;
}

function ProfileCard({
  avatarUrl = "",
  iconUrl,
  miniAvatarUrl,
  name = "Rakharsya Fatra",
  title = "Frontend Developer",
  handle = "khakidd",
  status = "Open to opportunities",
  statusColor = "#d8fa7b",
  contactText = "Contact",
  showUserInfo = true,
  onContactClick,
  theme = "dark",
  backdropColor,
  radius = 16,
  holo = 0.55,
  glare = 0.4,
  enableTilt = true,
  tiltStrength = 9,
  parallax = 5,
  intro = true,
  className = "",
}: ProfileCardProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Engine | null>(null);
  const settingsRef = useRef({ enableTilt, tiltStrength, parallax, intro });
  settingsRef.current = { enableTilt, tiltStrength, parallax, intro };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const size = { width: root.offsetWidth, height: root.offsetHeight };
    const x: Axis = { p: 0, v: 0, target: 0 };
    const y: Axis = { p: 0, v: 0, target: 0 };
    const light = { p: 0, target: 0 };
    let animationFrame = 0;
    let lastFrame = 0;
    let slowUntil = 0;
    let touchId: number | null = null;

    const write = () => {
      const { enableTilt: tiltOn, tiltStrength: strength, parallax: depth } = settingsRef.current;
      const angle = tiltOn && !reducedMotion ? strength : 0;
      const tilt = Math.min(1, Math.hypot(x.p, y.p));
      const style = root.style;
      style.setProperty("--pc-light-x", `${((x.p + 1) * 0.5 * size.width).toFixed(1)}px`);
      style.setProperty("--pc-light-y", `${((y.p + 1) * 0.5 * size.height).toFixed(1)}px`);
      style.setProperty("--pc-pointer-x", `${((x.p + 1) * 50).toFixed(2)}%`);
      style.setProperty("--pc-pointer-y", `${((y.p + 1) * 50).toFixed(2)}%`);
      style.setProperty("--pc-band-x", `${(50 + x.p * 15).toFixed(2)}%`);
      style.setProperty("--pc-band-y", `${(50 + y.p * 15).toFixed(2)}%`);
      style.setProperty("--pc-rotate-x", `${(y.p * angle).toFixed(3)}deg`);
      style.setProperty("--pc-rotate-y", `${(-x.p * angle).toFixed(3)}deg`);
      style.setProperty("--pc-shift-x", `${(x.p * (reducedMotion ? 0 : depth)).toFixed(2)}px`);
      style.setProperty("--pc-shift-y", `${(y.p * (reducedMotion ? 0 : depth)).toFixed(2)}px`);
      style.setProperty("--pc-reach", tilt.toFixed(4));
      style.setProperty("--pc-tilt", (tilt * light.p).toFixed(4));
      style.setProperty("--pc-active", light.p.toFixed(4));
    };

    const frame = (now: number) => {
      const delta = Math.min(0.05, (now - lastFrame) / 1000 || 0);
      lastFrame = now;
      const slow = now < slowUntil;
      const stiffness = slow ? 24 : 120;
      const damping = slow ? 9 : 16;
      const steps = Math.max(1, Math.ceil(delta / (1 / 120)));
      const step = delta / steps;

      for (let index = 0; index < steps; index++) {
        for (const axis of [x, y]) {
          axis.v += (stiffness * (axis.target - axis.p) - damping * axis.v) * step;
          axis.p += axis.v * step;
        }
      }

      const timeConstant = light.target > light.p ? 0.18 : slow ? 0.9 : 0.45;
      light.p += (light.target - light.p) * (1 - Math.exp(-delta / timeConstant));
      write();

      const moving =
        Math.abs(x.target - x.p) > 0.0005 ||
        Math.abs(y.target - y.p) > 0.0005 ||
        Math.abs(x.v) > 0.0005 ||
        Math.abs(y.v) > 0.0005 ||
        Math.abs(light.target - light.p) > 0.002;

      if (moving) {
        animationFrame = window.requestAnimationFrame(frame);
        return;
      }

      x.p = x.target;
      y.p = y.target;
      light.p = light.target;
      write();
      animationFrame = 0;
    };

    const wake = () => {
      if (animationFrame) return;
      lastFrame = performance.now();
      animationFrame = window.requestAnimationFrame(frame);
    };

    const aim = (nx: number, ny: number, active = true) => {
      x.target = clamp(nx, -1, 1);
      y.target = clamp(ny, -1, 1);
      light.target = active ? 1 : 0;
      slowUntil = 0;
      wake();
    };

    const aimAt = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      aim(((event.clientX - rect.left) / rect.width) * 2 - 1, ((event.clientY - rect.top) / rect.height) * 2 - 1);
    };

    const release = () => aim(0, 0, false);
    const onEnter = (event: PointerEvent) => {
      if (event.pointerType === "mouse") aimAt(event);
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "mouse" || event.pointerId === touchId) aimAt(event);
    };
    const onLeave = (event: PointerEvent) => {
      if (event.pointerType === "mouse") release();
    };
    const onDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse") return;
      touchId = event.pointerId;
      aimAt(event);
    };
    const onUp = (event: PointerEvent) => {
      if (event.pointerId !== touchId) return;
      touchId = null;
      release();
    };

    root.addEventListener("pointerenter", onEnter);
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("pointerdown", onDown);
    root.addEventListener("pointerup", onUp);
    root.addEventListener("pointercancel", onUp);

    const resizeObserver = new ResizeObserver(() => {
      size.width = root.offsetWidth;
      size.height = root.offsetHeight;
      write();
    });
    resizeObserver.observe(root);
    engineRef.current = { aim, release, write };

    if (settingsRef.current.intro && !reducedMotion) {
      x.p = 0.62;
      y.p = -0.55;
      light.p = 1;
      slowUntil = performance.now() + 1400;
      write();
      wake();
    } else {
      write();
    }

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      root.removeEventListener("pointerenter", onEnter);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("pointerdown", onDown);
      root.removeEventListener("pointerup", onUp);
      root.removeEventListener("pointercancel", onUp);
      engineRef.current = null;
    };
  }, []);

  useEffect(() => {
    engineRef.current?.write();
  }, [enableTilt, tiltStrength, parallax]);

  const palette: Theme = theme === "light" ? "light" : "dark";
  const foil: Theme = backdropColor ? (isDark(backdropColor) ?? palette === "dark" ? "dark" : "light") : palette;
  const backdrop = backdropColor
    ? `linear-gradient(180deg, color-mix(in srgb, ${backdropColor}, #fff 12%) 0%, color-mix(in srgb, ${backdropColor}, #000 18%) 100%)`
    : "var(--pc-tile)";
  const style = {
    ...THEMES[palette],
    ...FOILS[foil],
    "--pc-radius": `${Math.max(0, radius)}px`,
    "--pc-backdrop": backdrop,
    "--pc-holo": clamp(holo, 0, 1),
    "--pc-glare": clamp(glare, 0, 1),
    "--pc-parallax": `${Math.max(0, parallax)}px`,
    "--pc-status": statusColor,
    "--pc-grain": GRAIN,
    "--pc-pattern": iconUrl ? `url("${iconUrl}")` : "linear-gradient(#000, #000)",
    "--pc-pattern-size": iconUrl ? "180% auto" : "100% 100%",
    "--pc-holo-gain": iconUrl ? 1.25 : 0.75,
    "--pc-holo-detail": iconUrl && foil === "dark" ? 1 : 0,
  } as ProfileCardStyle;

  return (
    <div
      ref={rootRef}
      className={`profile-card ${className}`.trim()}
      style={style}
    >
      <div className="profile-card__body">
        <div className="profile-card__tile">
          <span className="profile-card__sheen" />
          <span className="profile-card__holo">
            <span className="profile-card__holo-glow" />
            <span className="profile-card__holo-shift" />
          </span>
          {avatarUrl && (
            <img className="profile-card__photo" src={avatarUrl} alt={name} loading="eager" draggable={false} />
          )}
          {(name || title) && (
            <>
              <span className="profile-card__scrim" />
              <div className="profile-card__info">
                {name && <h3 className="profile-card__name">{name}</h3>}
                {title && <p className="profile-card__title">{title}</p>}
              </div>
            </>
          )}
          <span className="profile-card__tile-rim" />
        </div>

        {showUserInfo && (
          <div className="profile-card__footer">
            {miniAvatarUrl && (
              <span className="profile-card__avatar">
                <img src={miniAvatarUrl} alt="" loading="lazy" draggable={false} />
              </span>
            )}
            <div className="profile-card__meta">
              {handle && <span className="profile-card__handle">@{handle}</span>}
              {status && <span className="profile-card__status">{status}</span>}
            </div>
            {contactText && (
              <button
                type="button"
                className="profile-card__contact"
                onClick={onContactClick}
                aria-label={name ? `${contactText} ${name}` : contactText}
              >
                <HugeiconsIcon icon={Mail01Icon} size={16} strokeWidth={1.8} aria-hidden="true" />
                {contactText}
              </button>
            )}
          </div>
        )}

        <span className="profile-card__glare" />
        <span className="profile-card__shade" />
        <span className="profile-card__rim" />
      </div>
    </div>
  );
}

export default memo(ProfileCard);
