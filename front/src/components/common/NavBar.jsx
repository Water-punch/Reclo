import { useNavigate } from 'react-router-dom';
import '../../styles/NavBar.css';

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <div className='navbar'>
      <h1
        onClick={() => {
          navigate('/');
        }}
      >
        RE:CLO
      </h1>
      <div className='button_group'>
        <button
          onClick={() => {
            navigate('/intro');
          }}
        >
          서비스 소개
        </button>
        <button
          onClick={() => {
            navigate('/contents');
          }}
        >
          거래/나눔
        </button>
        <button
          onClick={() => {
            navigate('/event');
          }}
        >
          이벤트
        </button>
        <button
          onClick={() => {
            navigate('/activity');
          }}
        >
          💬거래진행
        </button>
      </div>
    </div>
  );
};

export default NavBar;
