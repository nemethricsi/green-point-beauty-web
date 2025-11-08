export const BackgroundShapes = () => {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Large organic blob - top right */}
      <svg
        className="absolute -top-32 -right-32 h-[600px] w-[600px] opacity-20"
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M300 50C400 50 500 100 550 200C600 300 580 420 480 500C380 580 250 600 150 550C50 500 0 380 20 260C40 140 200 50 300 50Z"
          fill="url(#gradient1)"
        />
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e8f1a5" />
            <stop offset="100%" stopColor="#d5e571" />
          </linearGradient>
        </defs>
      </svg>

      {/* Medium organic shape - bottom left */}
      <svg
        className="absolute -bottom-24 -left-24 h-[450px] w-[450px] opacity-12"
        viewBox="0 0 450 450"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M225 30C310 30 380 70 420 150C460 230 450 330 380 400C310 470 200 480 120 430C40 380 10 280 30 180C50 80 140 30 225 30Z"
          fill="url(#gradient2)"
        />
        <defs>
          <linearGradient id="gradient2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d5e571" />
            <stop offset="100%" stopColor="#c2d84c" />
          </linearGradient>
        </defs>
      </svg>

      {/* Small accent circle - middle left */}
      <svg
        className="absolute top-1/3 left-12 h-[200px] w-[200px] opacity-10"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="100" cy="100" r="80" fill="#e8f1a5" />
      </svg>

      {/* Flowing wave shape - right side */}
      <svg
        className="absolute top-1/2 -right-16 h-[400px] w-[300px] opacity-12"
        viewBox="0 0 300 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M150 0C200 50 250 100 280 180C310 260 300 340 250 380C200 420 120 400 80 350C40 300 20 220 40 140C60 60 100 -50 150 0Z"
          fill="url(#gradient3)"
        />
        <defs>
          <linearGradient id="gradient3" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#f4f8cf" />
            <stop offset="100%" stopColor="#d5e571" />
          </linearGradient>
        </defs>
      </svg>

      {/* Subtle dots pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'radial-gradient(circle, #607219 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  );
};
