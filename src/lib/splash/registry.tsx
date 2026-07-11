import * as React from "react";

type SplashComponent = React.ComponentType<{ color?: string }>;

type SplashModule = Record<string, unknown>;

export type SplashGalleryItem = {
  id: string;
  label: string;
  Component: SplashComponent;
};

const splashModules = import.meta.glob("../../components/splash/*-splash.tsx", {
  eager: true,
}) as Record<string, SplashModule>;

function toLabel(fileName: string) {
  return fileName
    .replace(/-splash$/, "")
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getComponent(module: SplashModule, fallbackName: string): SplashComponent {
  for (const [exportName, value] of Object.entries(module)) {
    if (typeof value === "function" && exportName.endsWith("Splash")) {
      return value as SplashComponent;
    }
  }

  throw new Error(`Unable to find a splash component export for ${fallbackName}`);
}

export function getSplashGalleryItems(): SplashGalleryItem[] {
  return Object.entries(splashModules)
    .map(([path, module]) => {
      const fileName = path.split("/").pop()?.replace(/\.tsx$/, "") ?? path;

      return {
        id: fileName,
        label: toLabel(fileName),
        Component: getComponent(module, fileName),
      };
    })
    .sort((a, b) => a.label.localeCompare(b.label));
}
