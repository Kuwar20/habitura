import React from 'react'

const Videos = () => {
  return (
    <div>
      <section id="video-gallery" class="py-16 ">
  <div class="container mx-auto px-6 text-center">
    <h2 class="text-3xl font-bold mb-8">Video Gallery</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* <!-- Video 1: Embedded YouTube Video --> */}
      <div class="video-card bg-white p-4 rounded-lg shadow-lg">
        <div class="video mb-4">
          <iframe class="w-full h-48" src="https://www.youtube.com/shorts/91dBT6z6-JA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
        <h3 class="text-lg font-semibold">Personal Progress: Week 1</h3>
        <p class="text-gray-600">A brief overview of my first week of habit tracking.</p>
      </div>

      {/* <!-- Video 2: Embedded YouTube Video --> */}
      <div class="video-card bg-white p-4 rounded-lg shadow-lg">
        <div class="video mb-4">
          <iframe class="w-full h-48" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
        <h3 class="text-lg font-semibold">Habit Formation Tips</h3>
        <p class="text-gray-600">Learn how to effectively build and maintain new habits.</p>
      </div>

      {/* <!-- Video 3: User-Generated Content Placeholder --> */}
      <div class="video-card bg-white p-4 rounded-lg shadow-lg">
        <div class="video mb-4">
          <img class="w-full h-48 object-cover rounded" src="https://via.placeholder.com/350x200" alt="User Video Thumbnail" />
        </div>
        <h3 class="text-lg font-semibold">User Story: Jane's Journey</h3>
        <p class="text-gray-600">Jane shares her inspiring story of sticking to her daily goals.</p>
      </div>
    </div>
  </div>
</section>

    </div>
  )
}

export default Videos
