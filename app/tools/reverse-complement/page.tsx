"use client";

import { useState } from "react";
import Link from "next/link";

export default function ReverseComplementPage() {
  const [inputSequence, setInputSequence] = useState("");
  const [outputSequence, setOutputSequence] = useState("");
  const [error, setError] = useState("");

  // DNA碱基互补配对规则
  const complementMap: { [key: string]: string } = {
    A: "T",
    T: "A",
    G: "C",
    C: "G",
    a: "t",
    t: "a",
    g: "c",
    c: "g",
  };

  // 计算反向互补序列
  const calculateReverseComplement = () => {
    setError("");
    setOutputSequence("");

    if (!inputSequence.trim()) {
      setError("请输入DNA序列");
      return;
    }

    // 验证输入是否只包含ATGC
    const validSequence = /^[ATGCatgc]+$/;
    if (!validSequence.test(inputSequence.trim())) {
      setError("输入序列只能包含 A, T, G, C 字母");
      return;
    }

    // 计算互补序列
    const complement = inputSequence
      .split("")
      .map((base) => complementMap[base] || base)
      .join("");

    // 反向
    const reverseComplement = complement.split("").reverse().join("");

    setOutputSequence(reverseComplement);
  };

  // 清空输入
  const handleClear = () => {
    setInputSequence("");
    setOutputSequence("");
    setError("");
  };

  // 复制到剪贴板
  const handleCopy = async () => {
    if (outputSequence) {
      try {
        await navigator.clipboard.writeText(outputSequence);
        alert("已复制到剪贴板！");
      } catch (err) {
        alert("复制失败，请手动复制");
      }
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* 头部导航 */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              返回首页
            </Link>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              🧬 反向互补序列工具
            </h1>
          </div>
        </div>
      </header>

      {/* 主内容 */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 工具说明 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            什么是反向互补序列？
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            反向互补序列（Reverse Complement）是分子生物学中的重要概念。DNA双链结构中，两条链通过碱基配对相互互补：
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 mb-4">
            <li>腺嘌呤（A）与胸腺嘧啶（T）配对</li>
            <li>鸟嘌呤（G）与胞嘧啶（C）配对</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-300">
            反向互补序列是先将序列中的每个碱基替换为其互补碱基，然后将整个序列反向排列。这在设计引物、分析基因序列等场景中非常有用。
          </p>
        </div>

        {/* 工具操作区 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            输入DNA序列
          </h3>

          {/* 输入框 */}
          <div className="mb-4">
            <textarea
              value={inputSequence}
              onChange={(e) => setInputSequence(e.target.value)}
              placeholder="请输入DNA序列（只包含 A, T, G, C）&#10;例如：ATCGATCG"
              className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none font-mono"
            />
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              序列长度: {inputSequence.length} bp
            </p>
          </div>

          {/* 错误提示 */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* 操作按钮 */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={calculateReverseComplement}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              计算反向互补序列
            </button>
            <button
              onClick={handleClear}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              清空
            </button>
          </div>

          {/* 输出结果 */}
          {outputSequence && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  反向互补序列
                </h3>
                <button
                  onClick={handleCopy}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium flex items-center gap-1"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  复制
                </button>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <p className="text-green-900 dark:text-green-100 font-mono break-all">
                  {outputSequence}
                </p>
                <p className="mt-2 text-sm text-green-700 dark:text-green-300">
                  序列长度: {outputSequence.length} bp
                </p>
              </div>

              {/* 示例对比 */}
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <strong>原始序列:</strong>
                </p>
                <p className="text-sm font-mono text-gray-800 dark:text-gray-200 mb-3 break-all">
                  {inputSequence}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <strong>反向互补:</strong>
                </p>
                <p className="text-sm font-mono text-gray-800 dark:text-gray-200 break-all">
                  {outputSequence}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 使用示例 */}
        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
            💡 使用示例
          </h3>
          <div className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
            <p>
              <strong>输入:</strong>{" "}
              <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">
                ATCGATCG
              </code>
            </p>
            <p>
              <strong>输出:</strong>{" "}
              <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">
                CGATCGAT
              </code>
            </p>
            <p className="text-xs mt-2">
              步骤：A→T, T→A, C→G, G→C 得到 TAGCTAGC，然后反向得到 CGATCGAT
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

