import { memo } from "react";
import styles from "./HeroBackground.module.css";

interface BreathingTspansProps {
  text: string;
}

const BreathingTspans = memo(function BreathingTspans({
  text,
}: BreathingTspansProps) {
  return text.split("").map((c, i) =>
    c.match(/\s/) ? (
      c
    ) : (
      <tspan
        style={{
          animationDelay: `calc(var(--breath-duration) * ${i / text.length - 1})`,
        }}
        key={i}
      >
        {c}
      </tspan>
    ),
  );
});

interface InnerSVGProps {
  width: number;
  height: number;
}

const InnerSVG = memo(function InnerSVG({ width, height }: InnerSVGProps) {
  const rows = 10;
  const text = "MUMTAZ AZIZ";
  const duration = 5;

  return (
    <>
      {...new Array(rows).fill(undefined).map((_, i) => (
        <text
          key={i}
          x={(width / 2) * (i / (rows - 1) + 0.5)}
          y={((i + 1) / rows) * height}
          fontSize={height / rows}
          className={styles.breath}
          style={{ "--breath-duration": `${duration}s` } as React.CSSProperties}
        >
          <BreathingTspans text={text} /> <BreathingTspans text={text} />{" "}
          <BreathingTspans text={text} />
        </text>
      ))}
    </>
  );
});

export default function HeroBackground(
  props: React.SVGAttributes<SVGSVGElement>,
) {
  const width = 640;
  const height = 480;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={`${props.className || ""} select-none ${styles.root}`}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <InnerSVG width={width} height={height} />
    </svg>
  );
}
