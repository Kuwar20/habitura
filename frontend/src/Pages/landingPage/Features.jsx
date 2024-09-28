import React from "react";
import Heading from "../../Components/common/Heading";

const Features = () => {
  return (
    <div>
      <section id="features" class="py-16">
        <div class="container mx-auto px-6">
        <Heading title={"Feature"}/>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* <!-- Habit Tracking --> */}
            <div class="feature-card p-6 bg-white shadow-lg rounded-lg">
              <div class="flex items-center mb-4">
                <svg
                  class="w-12 h-12 text-blue-600"
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
                <h3 class="text-xl font-semibold ml-4">Habit Tracking</h3>
              </div>
              <p class="text-gray-600">
                Set, track, and monitor your habits with our intuitive
                interface. Easily see your progress and make adjustments as
                needed.
              </p>
              <img
                src="path/to/habit-tracking-screenshot.png"
                alt="Habit Tracking"
                class="mt-4 w-full rounded-lg"
              />
            </div>

            {/* <!-- Daily Progress & Streaks --> */}
            <div class="feature-card p-6 bg-white shadow-lg rounded-lg">
              <div class="flex items-center mb-4">
                <svg
                  class="w-12 h-12 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 12l2 2l4-4l4 4l6-6"
                  ></path>
                </svg>
                <h3 class="text-xl font-semibold ml-4">
                  Daily Progress & Streaks
                </h3>
              </div>
              <p class="text-gray-600">
                Monitor your daily achievements and maintain streaks to stay
                motivated. Our visual progress indicators make tracking easy.
              </p>
              <img
                src="path/to/progress-streaks-screenshot.png"
                alt="Daily Progress & Streaks"
                class="mt-4 w-full rounded-lg"
              />
            </div>

            {/* <!-- Goal Setting --> */}
            <div class="feature-card p-6 bg-white shadow-lg rounded-lg">
              <div class="flex items-center mb-4">
                <svg
                  class="w-12 h-12 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l2 2l4-4l-6-6"
                  ></path>
                </svg>
                <h3 class="text-xl font-semibold ml-4">Goal Setting</h3>
              </div>
              <p class="text-gray-600">
                Set and manage your goals with ease. Define short-term and
                long-term objectives to guide your habit-building journey.
              </p>
              <img
                src="path/to/goal-setting-screenshot.png"
                alt="Goal Setting"
                class="mt-4 w-full rounded-lg"
              />
            </div>

            {/* <!-- Community & Support --> */}
            <div class="feature-card p-6 bg-white shadow-lg rounded-lg">
              <div class="flex items-center mb-4">
                <svg
                  class="w-12 h-12 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v4l3 3l3-3V4"
                  ></path>
                </svg>
                <h3 class="text-xl font-semibold ml-4">Community & Support</h3>
              </div>
              <p class="text-gray-600">
                Connect with a supportive community and access resources to stay
                motivated. Share your journey and get advice from peers.
              </p>
              <img
                src="path/to/community-screenshot.png"
                alt="Community & Support"
                class="mt-4 w-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
