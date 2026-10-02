import BorderGlow from "@/components/BorderGlow";

export default function BookingSection() {
  return (
    <section className="booking-section">
      <BorderGlow
        className="booking-glow"
        edgeSensitivity={12}
        glowColor="29 12 58"
        backgroundColor="#171513"
        borderRadius={12}
        glowRadius={40}
        glowIntensity={1.45}
        coneSpread={28}
        animated
        colors={["#a29588", "#f2ebe4", "#a29588"]}
        fillOpacity={0.18}
      >
        <a
          className="booking-button"
          href="https://n365899.yclients.com/company/348811/personal/menu?o="
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Записаться</span>
        </a>
      </BorderGlow>
    </section>
  );
}