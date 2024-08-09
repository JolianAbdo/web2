import React, { useEffect } from 'react';

const images = [
  "https://funds2orgs.com/wp-content/uploads/2022/03/Volunteer-event-management.jpg",
  "https://www.agilitypr.com/wp-content/uploads/2020/09/virtual-1.jpg",
  "https://webbiquity.com/wp-content/uploads/2020/08/Teooh-virtual-conference-scaled.jpg",
  "https://veekast.com/wp-content/uploads/2021/02/2020.10_mktg_BlogHeader_VirtualEvents_AP.png",
];

const preloadedImages = images.map((src) => {
  const img = new Image();
  img.src = src;
  return img;
});

function changeHeroBackground() {
  const heroSection = document.getElementById("hero-section");
  let index = 1;
  heroSection.style.backgroundImage = `url(${preloadedImages[0].src})`;
  setInterval(() => {
    heroSection.style.backgroundImage = `url(${preloadedImages[index].src})`;
    index = (index + 1) % preloadedImages.length;
  }, 5000); // Change image every 5 seconds
}

const HeroSection = () => {
  useEffect(() => {
    changeHeroBackground();
  }, []);

  return (
    <div
      id="hero-section"
      className="h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${preloadedImages[0].src})` }}
    >
      {/* Add your hero content here */}
    </div>
  );
};

export default HeroSection;
