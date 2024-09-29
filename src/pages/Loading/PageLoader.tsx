import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Loading from './Loading';

const PageLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1초 동안 로딩 표시

    return () => clearTimeout(timer);
  }, [location]);

  if (isLoading) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default PageLoader;