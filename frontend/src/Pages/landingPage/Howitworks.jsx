import React from "react";

const Howitworks = () => {
  return (
    <div>
      <section id="how-it-works" class="py-16">
        <div class="container mx-auto px-6 text-center">
          <h2 class="text-3xl font-primary text-secondary font-bold mb-8">How It Works</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* <!-- Step 1: Set Your Goals --> */}
            <div class="step-card">
              <div class="icon mb-4">
                <svg
                  class="w-16 h-16 mx-auto text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3l3-3V4"
                  ></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-2">1. Set Your Goals</h3>
              <p class="text-gray-600">
                Define the habits or goals you want to achieve and set a clear
                timeline.
              </p>
            </div>

            {/* <!-- Step 2: Track Daily Progress --> */}
            <div class="step-card">
              <div class="icon mb-4">
                <svg
                  class="w-16 h-16 mx-auto text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-2">
                2. Track Daily Progress
              </h3>
              <p class="text-gray-600">
                Update your progress daily to keep track of your journey and
                stay motivated.
              </p>
            </div>

            {/* <!-- Step 3: Celebrate Achievements --> */}
            <div class="step-card">
              <div class="icon mb-4">
                <svg
                  class="w-16 h-16 mx-auto text-yellow-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3l3-3V4"
                  ></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-2">
                3. Celebrate Achievements
              </h3>
              <p class="text-gray-600">
                Review your progress, celebrate your milestones, and keep
                pushing forward.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Howitworks;
