import React from 'react'

const Testimonials = () => {
  return (
    <div>
      <section id="testimonials" class="py-16 ">
  <div class="container mx-auto px-6 text-center">
    <h2 class="text-3xl font-primary text-secondary font-bold mb-8">Success Stories</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">

      {/* <!-- Testimonial 1 --> */}
      <div class="testimonial-card bg-white p-6 rounded-lg shadow-lg">
        <div class="avatar mb-4">
          <img src="https://via.placeholder.com/150" alt="John Doe" class="w-16 h-16 mx-auto rounded-full" />
        </div>
        <p class="text-gray-700 mb-4">"Habit and Hustle helped me stay on track and achieve my goals!"</p>
        <h3 class="text-lg font-semibold">John Doe</h3>
      </div>

      {/* <!-- Testimonial 2 --> */}
      <div class="testimonial-card bg-white p-6 rounded-lg shadow-lg">
        <div class="avatar mb-4">
          <img src="https://via.placeholder.com/150" alt="Jane Smith" class="w-16 h-16 mx-auto rounded-full" />
        </div>
        <p class="text-gray-700 mb-4">"This platform is amazing. I've built habits that I never thought I could!"</p>
        <h3 class="text-lg font-semibold">Jane Smith</h3>
      </div>

      {/* <!-- Testimonial 3 --> */}
      <div class="testimonial-card bg-white p-6 rounded-lg shadow-lg">
        <div class="avatar mb-4">
          <img src="https://via.placeholder.com/150" alt="Emily Johnson" class="w-16 h-16 mx-auto rounded-full" />
        </div>
        <p class="text-gray-700 mb-4">"The daily tracking feature kept me accountable. Highly recommended!"</p>
        <h3 class="text-lg font-semibold">Emily Johnson</h3>
      </div>

    </div>
  </div>
</section>

    </div>
  )
}

export default Testimonials
