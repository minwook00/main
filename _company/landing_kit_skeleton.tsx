import React from 'react';

// Tailwind CSS 색상 정의 (Designer 브리프 기반)
const colors = {
  primary: '#1A2338',    // Deep Navy (신뢰)
  secondary: '#FFB4A0',  // Warm Peach (친근함)
  accent: '#66B3B8',     // Soft Teal (행동 유도)
  background: '#F9F7F5'  // Light Cream (배경)
};

const LandingKitSkeleton: React.FC = () => {
  return (
    <div className={`min-h-screen bg-[${colors.background}] font-sans`}>
      {/* Navigation Bar (Nav) - Portfolio Kit의 Nav 구조 차용 */}
      <header className={`sticky top-0 z-50 shadow-md bg-[${colors.primary}]`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className={`text-2xl font-bold text-white`}>
            심리상담 크리에이터
          </div>
          <nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-300">
            <a href="#features" className="hover:text-white transition duration-150">가치관</a>
            <a href="#process" className="hover:text-white transition duration-150">분석 과정</a>
            <a href="#pricing" className="hover:text-white transition duration-150">가격 전략</a>
            <a href="#contact" className="px-4 py-2 bg-[${colors.accent}] text-white rounded-full hover:bg-[#4d9e93] transition duration-150">상담 시작</a>
          </nav>
        </div>
      </header>

      {/* Hero Section - 핵심 메시지 전달 */}
      <section className={`py-20 md:py-32 bg-[${colors.primary}] text-white`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight">
            복잡한 연애, 가치관의 길을 <span className={`text-[${colors.secondary}]`}>명확하게</span> 찾으세요.
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-gray-300 leading-relaxed">
            20대 남성들의 흔들리는 연애관과 가치관을 전문적인 프레임워크로 분석하여, 후회 없는 선택을 돕는 심리적 나침반.
          </p>
          <div className="mt-10 flex justify-center space-x-6">
            <a href="#process" className={`inline-block px-8 py-3 text-lg font-semibold rounded-lg shadow-lg transition duration-300 bg-[${colors.accent}] text-[${colors.primary}] hover:bg-[#4d9e93] transform hover:scale-[1.02]`}>
              분석 과정 보기
            </a>
            <a href="#contact" className={`inline-block px-8 py-3 text-lg font-semibold rounded-lg border-2 border-white transition duration-300 bg-transparent hover:bg-white/20`}>
              무료 상담 문의
            </a>
          </div>
        </div>
      </section>

      {/* Features Section - 핵심 기능 소개 */}
      <section className={`py-16 md:py-24 bg-[${colors.background}]`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-4xl font-bold text-[${colors.primary}] text-center mb-12`}>
            우리가 제공하는 핵심 가치
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-[${colors.secondary}] transition duration-300 hover:shadow-xl">
              <div className={`text-4xl mb-4 text-[${colors.accent}]`}>🧭</div>
              <h3 className={`text-xl font-bold mb-3 text-[${colors.primary}]`}>정확한 가치관 측정</h3>
              <p className="text-gray-600">고객의 내면 깊은 곳에 숨겨진 핵심 가치관 5가지를 정량적으로 측정하여 객관적인 기준을 제시합니다.</p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-[${colors.accent}] transition duration-300 hover:shadow-xl">
              <div className={`text-4xl mb-4 text-[${colors.accent}]`}>⚖️</div>
              <h3 className={`text-xl font-bold mb-3 text-[${colors.primary}]`}>데이터 기반 매칭</h3>
              <p className="text-gray-600">단순한 끌림이 아닌, 행동 패턴과 커뮤니티 활동 지수를 기반으로 최적의 파트너를 추천하는 알고리즘을 적용합니다.</p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-[${colors.primary}] transition duration-300 hover:shadow-xl">
              <div className={`text-4xl mb-4 text-[${colors.primary}]`}>💡</div>
              <h3 className={`text-xl font-bold mb-3 text-[${colors.primary}]`}>명확한 행동 로드맵</h3>
              <p className="text-gray-600">추천된 가치관에 따라 실질적인 관계 개선을 위한 구체적이고 실행 가능한 행동 지침(Action Plan)을 제공합니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action (CTA) Section - 가격 전략 연계 */}
      <section className={`py-20 bg-[${colors.primary}]`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-4xl font-bold mb-4`}>당신의 시간을 투자하세요</h2>
          <p className="text-xl text-gray-300 mb-10">가장 현실적인 가치와 관계의 성공을 위한 첫걸음.</p>
          <a href="#pricing" className={`inline-block px-12 py-4 text-xl font-bold rounded-lg shadow-xl transition duration-300 bg-[${colors.secondary}] text-[${colors.primary}] hover:bg-[#e6a89d] transform hover:scale-[1.05]`}>
            가격 모델 확인하기
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 bg-gray-800 text-white text-center text-sm`}>
        <p>&copy; {new Date().getFullYear()} 심리상담 크리에이터. 모든 권리 보유.</p>
      </footer>
    </div>
  );
};

export default LandingKitSkeleton;