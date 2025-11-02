import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const menuItems = [
    { path: '/rune', label: '룬 정보' },
    { path: '/exchange', label: '물물교환' },
    { path: '/', label: '정보' },
    // 추후 추가할 메뉴들
    // { path: '/schedule', label: '일정' },
    // { path: '/calculator', label: '계산기' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* 헤더 */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-purple-900">마비노기 모바일 도우미</h1>
            </Link>

            {/* 데스크톱 메뉴 */}
            <nav className="hidden md:flex space-x-1">
              {menuItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={clsx(
                    'px-4 py-2 rounded-lg transition-colors font-medium',
                    isActive(item.path)
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-700 hover:bg-purple-100'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* 모바일 메뉴 버튼 */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* 모바일 메뉴 */}
          {isMenuOpen && (
            <nav className="md:hidden pb-4 space-y-2">
              {menuItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={clsx(
                    'block px-4 py-2 rounded-lg transition-colors font-medium',
                    isActive(item.path)
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-700 hover:bg-purple-100'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto p-4">{children}</main>

      {/* 푸터 */}
      <footer className="bg-white mt-12 py-6 border-t">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center space-y-3">
            <div className="text-center">
              <p className="text-gray-800 font-semibold">마비노기 모바일 도우미</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                  던컨 서버
                </span>
                <span className="text-gray-400">•</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  톡톡마카롱
                </span>
              </div>
            </div>

            <p className="text-gray-500 text-xs">© 2025 All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
