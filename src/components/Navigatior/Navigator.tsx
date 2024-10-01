import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@assets/icons/bottom_home.svg?react';
import HomeIconClicked from '@assets/icons/bottom_home_clicked.svg?react';
import SearchIcon from '@assets/icons/bottom_search.svg?react';
import CreatePostIcon from '@assets/icons/bottom_create_post.svg?react';
import MyIcon from '@assets/icons/bottom_my.svg?react';
import MyIconClicked from '@assets/icons/bottom_my_clicked.svg?react';
import './Navigator.css'; // 스타일 적용을 위한 CSS 파일

const Navigator = () => {
  // 클릭된 아이콘을 상태로 관리
  const [activeIcon, setActiveIcon] = useState<string>('home');

  return (
    <nav className="navigator">
      <NavLink to="/" onClick={() => setActiveIcon('home')}>
        {activeIcon === 'home' ? <HomeIconClicked /> : <HomeIcon />}
      </NavLink>

      <NavLink to="/search" onClick={() => setActiveIcon('search')}>
        <SearchIcon></SearchIcon>
      </NavLink>

      <NavLink to="/create-post" onClick={() => setActiveIcon('create-post')}>
      <CreatePostIcon />
      </NavLink>

      <NavLink to="/my" onClick={() => setActiveIcon('my')}>
        {activeIcon === 'my' ? <MyIconClicked /> : <MyIcon />}
      </NavLink>
    </nav>
  );
};

export default Navigator;
