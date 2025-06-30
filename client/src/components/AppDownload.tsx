export function AppDownload() {
  return (
    <section className="py-12 bg-gradient-to-r from-mmt-blue to-blue-600">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 text-white mb-8 lg:mb-0">
            <h2 className="text-3xl font-bold mb-4">
              Elevate your experience, Download our app now & manage your trips with a tap!
            </h2>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <i className="fas fa-check-circle mr-3"></i>
                <span>Explore best deals on the app & exclusive discounts</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check-circle mr-3"></i>
                <span>Receive real-time trip updates at your fingertips</span>
              </li>
            </ul>
            <div className="flex space-x-4">
              <a
                href="https://play.google.com/store/apps/details?id=com.makemytrip"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play"
                  className="h-12"
                />
              </a>
              <a
                href="https://apps.apple.com/app/makemytrip/id530488359"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                  alt="Download on the App Store"
                  className="h-12"
                />
              </a>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600"
              alt="Travel booking app on mobile"
              className="w-80 h-auto rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
