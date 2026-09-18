type PulseWaveformProps = {
  tone?: "accent" | "button" | "muted";
  className?: string;
};

const toneVar: Record<NonNullable<PulseWaveformProps["tone"]>, string> = {
  accent: "var(--color-accent)",
  button: "var(--color-button)",
  muted: "var(--color-line-strong)",
};

/**
 * A recurring Doppler/ECG-style trace used as Lumen's visual signature —
 * a still baseline that spikes, echoing a vascular waveform. Pure CSS
 * animation (dash-offset), no JS.
 */
export function PulseWaveform({ tone = "accent", className = "" }: PulseWaveformProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 600 60"
      preserveAspectRatio="none"
      className={`h-10 w-full ${className}`}
    >
      <path
        d="M0 30 H180 L200 30 L212 8 L226 52 L238 30 L254 30 L266 18 L278 30 H420 L438 30 L450 12 L464 48 L476 30 L492 30 H600"
        fill="none"
        stroke={toneVar[tone]}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="waveform-line"
        opacity="0.55"
      />
    </svg>
  );
}
