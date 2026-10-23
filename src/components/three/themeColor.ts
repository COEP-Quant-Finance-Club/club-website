import * as THREE from "three";

type ThemeToken = "--accent" | "--border" | "--muted-foreground";

export function getThemeColor(token: ThemeToken) {
  const channels = getComputedStyle(document.documentElement)
    .getPropertyValue(token)
    .trim()
    .split(/\s+/);

  if (channels.length !== 3 || channels.some((channel) => !Number.isFinite(Number(channel)))) {
    throw new Error(`Invalid CSS color token: ${token}`);
  }

  return new THREE.Color(`rgb(${channels.join(",")})`);
}
