import React from 'react'

const Subscription = () => {
  return (
    <div>
      <section id="pricing" class="py-16 ">
  <div class="container mx-auto px-6 text-center">
    <h2 class="text-3xl font-bold mb-8">Choose Your Plan</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">

      {/* <!-- Free Plan --> */}
      <div class="pricing-card border border-gray-300 p-6 rounded-lg shadow-lg">
        <h3 class="text-2xl font-semibold mb-4">Free Plan</h3>
        <p class="text-gray-700 mb-4">Basic habit tracking with essential features.</p>
        <div class="price text-4xl font-bold mb-4">$0</div>
        <ul class="mb-6 text-gray-600">
          <li>Basic habit tracking</li>
          <li>Daily reminders</li>
          <li>Community support</li>
        </ul>
        <a href="#" class="bg-blue-500 text-white py-2 px-4 rounded-lg transition-colors hover:bg-blue-600">Get Started</a>
      </div>

      {/* <!-- Premium Plan --> */}
      <div class="pricing-card border border-gray-300 p-6 rounded-lg shadow-lg bg-gray-100">
        <h3 class="text-2xl font-semibold mb-4">Premium Plan</h3>
        <p class="text-gray-700 mb-4">Advanced features for serious habit trackers.</p>
        <div class="price text-4xl font-bold mb-4">$9.99/month</div>
        <ul class="mb-6 text-gray-600">
          <li>Advanced habit tracking</li>
          <li>Custom reminders and goals</li>
          <li>Exclusive content</li>
          <li>Priority support</li>
        </ul>
        <a href="#" class="bg-blue-500 text-white py-2 px-4 rounded-lg transition-colors hover:bg-blue-600">Start Free Trial</a>
      </div>

      {/* <!-- Pro Plan --> */}
      <div class="pricing-card border border-gray-300 p-6 rounded-lg shadow-lg">
        <h3 class="text-2xl font-semibold mb-4">Pro Plan</h3>
        <p class="text-gray-700 mb-4">All-inclusive features for the ultimate experience.</p>
        <div class="price text-4xl font-bold mb-4">$19.99/month</div>
        <ul class="mb-6 text-gray-600">
          <li>All premium features</li>
          <li>Personalized coaching</li>
          <li>Access to new features first</li>
        </ul>
        <a href="#" class="bg-blue-500 text-white py-2 px-4 rounded-lg transition-colors hover:bg-blue-600">Upgrade Now</a>
      </div>

    </div>
  </div>
</section>

    </div>
  )
}

export default Subscription
