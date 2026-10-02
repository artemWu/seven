"use client";

import {
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
} from "react";

import "./BorderGlow.css";

type BorderGlowProps = {
  children: ReactNode;
  className?: string;
  edgeSensitivity?: number;
  glowColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  glowRadius?: number;
  glowIntensity?: number;
  coneSpread?: number;
  animated?: boolean;
  colors?: string[];
  fillOpacity?: number;
};

type CSSVariable = `--${string}`;

type GlowStyle = CSSProperties &
  Record<CSSVariable, string | number>;

function parseHSL(hslStr: string) {
  const match = hslStr.match(
    /([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/
  );

  if (!match) {
    return {
      h: 40,
      s: 80,
      l: 80,
    };
  }

  return {
    h: parseFloat(match[1]),
    s: parseFloat(match[2]),
    l: parseFloat(match[3]),
  };
}

function buildGlowVars(
  glowColor: string,
  intensity: number
): GlowStyle {
  const { h, s, l } = parseHSL(glowColor);

  const base = `${h}deg ${s}% ${l}%`;

  const opacities = [
    100,
    60,
    50,
    40,
    30,
    20,
    10,
  ];

  const keys = [
    "",
    "-60",
    "-50",
    "-40",
    "-30",
    "-20",
    "-10",
  ] as const;

  const vars: GlowStyle = {};

  for (let i = 0; i < opacities.length; i++) {
    const key: CSSVariable = `--glow-color${keys[i]}`;

    vars[key] = `hsl(${base} / ${Math.min(
      opacities[i] * intensity,
      100
    )}%)`;
  }

  return vars;
}

const GRADIENT_POSITIONS = [
  "80% 55%",
  "69% 34%",
  "8% 6%",
  "41% 38%",
  "86% 85%",
  "82% 18%",
  "51% 4%",
] as const;

const GRADIENT_KEYS: readonly CSSVariable[] = [
  "--gradient-one",
  "--gradient-two",
  "--gradient-three",
  "--gradient-four",
  "--gradient-five",
  "--gradient-six",
  "--gradient-seven",
];

const COLOR_MAP = [
  0,
  1,
  2,
  0,
  1,
  2,
  1,
] as const;

function buildGradientVars(
  colors: string[]
): GlowStyle {
  const vars: GlowStyle = {};

  for (let i = 0; i < GRADIENT_KEYS.length; i++) {
    const colorIndex = Math.min(
      COLOR_MAP[i],
      colors.length - 1
    );

    const color = colors[colorIndex];

    vars[GRADIENT_KEYS[i]] =
      `radial-gradient(` +
      `at ${GRADIENT_POSITIONS[i]}, ` +
      `${color} 0px, ` +
      `transparent 50%` +
      `)`;
  }

  vars["--gradient-base"] =
    `linear-gradient(${colors[0]} 0 100%)`;

  return vars;
}

function isLightColor(color: string) {
  const value = color
    .trim()
    .replace("#", "");

  if (!/^[\da-f]{3}([\da-f]{3})?$/i.test(value)) {
    return false;
  }

  const hex =
    value.length === 3
      ? value
          .split("")
          .map((char) => char + char)
          .join("")
      : value;

  const red = parseInt(hex.slice(0, 2), 16);
  const green = parseInt(hex.slice(2, 4), 16);
  const blue = parseInt(hex.slice(4, 6), 16);

  return (
    red * 0.2126 +
      green * 0.7152 +
      blue * 0.0722 >
    180
  );
}

function easeOutCubic(x: number) {
  return 1 - Math.pow(1 - x, 3);
}

function animateValue({
  start = 0,
  end = 100,
  duration = 1000,
  delay = 0,
  ease = easeOutCubic,
  onUpdate,
  onEnd,
}: {
  start?: number;
  end?: number;
  duration?: number;
  delay?: number;
  ease?: (value: number) => number;
  onUpdate: (value: number) => void;
  onEnd?: () => void;
}) {
  const t0 = performance.now() + delay;

  function tick() {
    const elapsed = performance.now() - t0;
    const t = Math.min(
      elapsed / duration,
      1
    );

    onUpdate(
      start +
        (end - start) *
          ease(t)
    );

    if (t < 1) {
      requestAnimationFrame(tick);
    } else {
      onEnd?.();
    }
  }

  setTimeout(
    () =>
      requestAnimationFrame(tick),
    delay
  );
}

export default function BorderGlow({
  children,
  className = "",
  edgeSensitivity = 30,
  glowColor = "40 80 80",
  backgroundColor = "#120F17",
  borderRadius = 28,
  glowRadius = 70,
  glowIntensity = 1.3,
  coneSpread = 25,
  animated = false,
  colors = [
    "#c084fc",
    "#f472b6",
    "#38bdf8",
  ],
  fillOpacity = 0.5,
}: BorderGlowProps) {
  const cardRef =
    useRef<HTMLDivElement>(null);

  const getCenterOfElement =
    useCallback(
      (element: HTMLElement) => {
        const {
          width,
          height,
        } =
          element.getBoundingClientRect();

        return [
          width / 2,
          height / 2,
        ];
      },
      []
    );

  const getEdgeProximity =
    useCallback(
      (
        element: HTMLElement,
        x: number,
        y: number
      ) => {
        const [cx, cy] =
          getCenterOfElement(
            element
          );

        const dx = x - cx;
        const dy = y - cy;

        let kx = Infinity;
        let ky = Infinity;

        if (dx !== 0) {
          kx =
            cx / Math.abs(dx);
        }

        if (dy !== 0) {
          ky =
            cy / Math.abs(dy);
        }

        return Math.min(
          Math.max(
            1 /
              Math.min(
                kx,
                ky
              ),
            0
          ),
          1
        );
      },
      [getCenterOfElement]
    );

  const getCursorAngle =
    useCallback(
      (
        element: HTMLElement,
        x: number,
        y: number
      ) => {
        const [cx, cy] =
          getCenterOfElement(
            element
          );

        const dx = x - cx;
        const dy = y - cy;

        if (
          dx === 0 &&
          dy === 0
        ) {
          return 0;
        }

        const radians =
          Math.atan2(
            dy,
            dx
          );

        let degrees =
          radians *
            (180 / Math.PI) +
          90;

        if (degrees < 0) {
          degrees += 360;
        }

        return degrees;
      },
      [getCenterOfElement]
    );

  const handlePointerMove =
    useCallback(
      (
        event: PointerEvent<HTMLDivElement>
      ) => {
        const card =
          cardRef.current;

        if (!card) {
          return;
        }

        const rect =
          card.getBoundingClientRect();

        const x =
          event.clientX -
          rect.left;

        const y =
          event.clientY -
          rect.top;

        const edge =
          getEdgeProximity(
            card,
            x,
            y
          );

        const angle =
          getCursorAngle(
            card,
            x,
            y
          );

        card.style.setProperty(
          "--edge-proximity",
          `${(
            edge * 100
          ).toFixed(3)}`
        );

        card.style.setProperty(
          "--cursor-angle",
          `${angle.toFixed(
            3
          )}deg`
        );
      },
      [
        getCursorAngle,
        getEdgeProximity,
      ]
    );

  useEffect(() => {
    if (
      !animated ||
      !cardRef.current
    ) {
      return;
    }

    const card =
      cardRef.current;

    let cancelled = false;
    let rafId = 0;

    const degreesPerSecond =
      120;

    let currentAngle = 110;
    let lastTime:
      | number
      | null = null;

    card.classList.add(
      "sweep-active"
    );

    card.style.setProperty(
      "--cursor-angle",
      `${currentAngle}deg`
    );

    animateValue({
      duration: 600,
      end: 100,
      onUpdate: (
        value
      ) => {
        card.style.setProperty(
          "--edge-proximity",
          `${value}`
        );
      },
    });

    function rotate(
      time: number
    ) {
      if (
        cancelled ||
        !card
      ) {
        return;
      }

      if (
        lastTime === null
      ) {
        lastTime = time;
      }

      const delta =
        (time -
          lastTime) /
        1000;

      lastTime = time;

      currentAngle =
        (currentAngle +
          delta *
            degreesPerSecond) %
        360;

      card.style.setProperty(
        "--cursor-angle",
        `${currentAngle.toFixed(
          3
        )}deg`
      );

      rafId =
        requestAnimationFrame(
          rotate
        );
    }

    rafId =
      requestAnimationFrame(
        rotate
      );

    return () => {
      cancelled = true;

      cancelAnimationFrame(
        rafId
      );
    };
  }, [animated]);

  const style: GlowStyle = {
    "--card-bg":
      backgroundColor,

    "--edge-sensitivity":
      edgeSensitivity,

    "--border-radius":
      `${borderRadius}px`,

    "--glow-padding":
      `${glowRadius}px`,

    "--cone-spread":
      coneSpread,

    "--fill-opacity":
      fillOpacity,

    ...buildGlowVars(
      glowColor,
      glowIntensity
    ),

    ...buildGradientVars(
      colors
    ),
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={
        handlePointerMove
      }
      className={
        `border-glow-card${
          isLightColor(
            backgroundColor
          )
            ? " border-glow-card--light"
            : ""
        } ${className}`
      }
      style={style}
    >
      <span className="edge-light" />

      <div className="border-glow-inner">
        {children}
      </div>
    </div>
  );
}