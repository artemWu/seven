import Button from "./button";
import { BOOKING_URL } from "@/data/site";

export default function BookingSection() {
  return (
    <section className="booking-section">
      <Button href={BOOKING_URL} target="_blank" rel="noopener noreferrer" theme="dark">
        Записаться
      </Button>
    </section>
  );
}
