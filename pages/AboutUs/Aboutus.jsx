import React from 'react'
import { assets } from '../../assets/assets' // Assuming logo is stored here

const Aboutus = () => {
  return (
    <div id='about-us'>
      <img src={assets.logo} alt="Spring Food Logo" width="120" />
      <h2>Welcome to Spring Food</h2>
      <p>
        At <strong>Spring Food</strong>, we believe in delivering freshness, flavor, and convenience right to your doorstep. 
        Whether you're craving a crisp salad, a hearty sandwich, or a decadent dessert, our menu is crafted to satisfy every taste.
      </p>
      <p>
        Our offerings include:
        <ul>
          <li>Fresh Salads</li>
          <li>Veggie Rolls</li>
          <li>Delicious Desserts</li>
          <li>Gourmet Sandwiches</li>
          <li>Artisan Cakes</li>
          <li>Pure Veg Specials</li>
          <li>Classic Pasta</li>
          <li>Flavorful Noodles</li>
        </ul>
      </p>
      <p>
        With a focus on quality ingredients and fast delivery, Spring Food is your go-to platform for wholesome meals and indulgent treats. 
        Whether you're ordering lunch at work or planning a cozy dinner at home, we've got you covered.
      </p>
      <p>
        Taste the season. Taste the freshness. Taste Spring Food.
      </p>
    </div>
  )
}

export default Aboutus
