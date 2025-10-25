import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-3xl font-bold text-purple-900 mb-4">정보</h2>

      <div className="prose max-w-none">
        <section className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">마비노기 모바일 헬퍼란?</h3>
          <p className="text-gray-600">
            마비노기 모바일 게임을 즐기는 유저들을 위한 팬메이드 헬퍼 사이트입니다.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">문의</h3>
          <p className="text-gray-600">버그 제보나 기능 제안은 GitHub Issues를 통해 남겨주세요.</p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
