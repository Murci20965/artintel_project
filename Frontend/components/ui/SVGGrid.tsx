export function SVGGrid({ items }: { items: Array<{ title: string }> }) {
  return (
    <div className="h-[600px] w-full relative overflow-hidden">
      <div className="absolute inset-0 grid grid-cols-3 gap-8 p-12">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col items-center justify-center">
            <div
              className="w-16 h-16 rounded-lg mb-4 transition-transform hover:scale-110"
              style={{
                backgroundColor: `hsl(${index * 60}, 100%, 75%)`,
              }}
            />
            <span className="text-gray-900 dark:text-white text-lg font-medium">{item.title}</span>
          </div>
        ))}
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.1"
            className="text-cyan-400 opacity-20"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 50 50"
              to="360 50 50"
              dur="20s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>
    </div>
  )
}

