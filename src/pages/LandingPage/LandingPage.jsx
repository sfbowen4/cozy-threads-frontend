import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="landing-page">
      <h1>
        Cozy Threads
      </h1>
      <div>
        <p>
          Welcome to Cozy Threads, where sustainability meets comfort. We are committed to crafting high-quality, ethically sourced clothing that feels as good as it looks. Every piece in our collection is designed with care, using sustainable materials and fair-trade practices to ensure a positive impact on both people and the planet. Whether you’re looking for everyday essentials or timeless wardrobe staples, Cozy Threads offers fashion that aligns with your values. Experience comfort, sustainability, and style—all in one place.
        </p>
      </div>
      <Link to="/catalog" className="shop-now-button">
        Shop Now
      </Link>
    </div>
  );
}