import styles from "./HeroBackground.module.css";

interface BreathingTspansProps {
  text: string;
}

function BreathingTspans({ text }: BreathingTspansProps) {
  return text.split("").map((c, i) => (
    <tspan
      style={{
        animationDelay: `calc(var(--breath-duration) * ${i / text.length - 1})`,
      }}
      key={i}
    >
      {c}
    </tspan>
  ));
}

interface InnerSVGProps {
  width: number;
  height: number;
  rows?: number;
  text: string;
  duration?: number;
}

function InnerSVG({
  width,
  height,
  rows = 9,
  text,
  duration = 5,
}: InnerSVGProps) {
  const characters = <BreathingTspans text={text} />;
  const fontSize = height / (rows - 1);

  return (
    <>
      {...new Array(rows).fill(undefined).map((_, i) => (
        <text
          key={i}
          x={(width + height * (i / (rows - 1) - 0.5)) / 2}
          y={(height * i) / (rows - 1)}
          fontSize={fontSize}
          className={styles.breath}
          style={{ "--breath-duration": `${duration}s` } as React.CSSProperties}
        >
          {characters} {characters} {characters}
        </text>
      ))}
    </>
  );
}

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
      <InnerSVG width={width} height={height} text="MUMTAZ AZIZ" />
    </svg>
  );
}
