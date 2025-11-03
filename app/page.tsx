import Link from "next/link";

// 工具类型定义
interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  href: string;
}

// 工具数据
const tools: Tool[] = [
  {
    id: "reverse-complement",
    name: "反向互补序列",
    description: "计算DNA序列的反向互补序列，用于分子生物学研究",
    category: "生物学",
    icon: "🧬",
    href: "/tools/reverse-complement",
  },
  // 可以继续添加更多工具
];

// 获取所有分类
const categories = Array.from(new Set(tools.map((tool) => tool.category)));

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* 头部 */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            🛠️ Utility Tools
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            实用工具集合，让工作更高效
          </p>
        </div>
      </header>

      {/* 主内容 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {categories.map((category) => (
          <div key={category} className="mb-12">
            {/* 分类标题 */}
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
              {category}
            </h2>

            {/* 工具卡片网格 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tools
                .filter((tool) => tool.category === category)
                .map((tool) => (
                  <Link key={tool.id} href={tool.href} className="group block">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 h-full border border-gray-200 dark:border-gray-700">
                      {/* 图标 */}
                      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                        {tool.icon}
                      </div>

                      {/* 工具名称 */}
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {tool.name}
                      </h3>

                      {/* 工具描述 */}
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {tool.description}
                      </p>

                      {/* 箭头指示 */}
                      <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>使用工具</span>
                        <svg
                          className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </main>

      {/* 页脚 */}
      <footer className="bg-white dark:bg-gray-800 mt-20 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-600 dark:text-gray-400">
          <p>© 2025 Utility Tools. 让工作更简单。</p>
        </div>
      </footer>
    </div>
  );
}
