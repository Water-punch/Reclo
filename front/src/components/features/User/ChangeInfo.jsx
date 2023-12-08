import { useState, useEffect } from 'react';
import * as Api from '../../../api/api';
import { useLocation, useNavigate } from 'react-router-dom';

const getRankName = (level) => {
  const numericLevel = parseInt(level, 10);

  switch (numericLevel) {
    case 0:
      return '브론즈';
    case 1:
      return '실버';
    case 2:
      return '골드';
    case 3:
      return '플레티넘';
    case 4:
      return '다이아몬드';
    case 5:
      return '마스터';
    default:
      return '알 수 없음';
  }
};

const ChangeInfo = () => {
  const [newNickname, setNewNickname] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [isChanging, setIsChanging] = useState(false);
  const [user, setUser] = useState(null);
  const [file, setFile] = useState('')

  const location = useLocation();
  const navigate = useNavigate();

  //과정0: Input에 올린 이미지 미리보기
  const imgPreview = (e) => {
    const imgFile = e.target.files[0]

    setFile(imgFile)
    console.log(imgFile)

    if (imgFile) {
      const reader = new FileReader()

      reader.onload = (event) => {
        setProfileImage(event.target.result)
      };

      reader.readAsDataURL(imgFile)
    }
  }

  //과정1: 백엔드에 preSignedUrl 요청하기
  const handlePresigned = async (fileName) => {
    try {
      const res = await Api.put(`userURL/${fileName}`)
      console.log('PresignedURL을 받아왔습니다.', res.data.presignedUrl)
      return res.data.presignedUrl
    } catch (err) {
      alert(`[presignedUrl 오류] 관리자에게 문의하세요`)
    }
  };

  //과정2: 받아온 preSignedUrl로 S3에 직접 이미지 업로드
  const handleImgToS3 = async (preUrl) => {
    //서버에서 받아온 Presigned url, 저장한 파일로 api 호출
    try {
      const res = await Api.postImg(preUrl, file)
      const resUrl = res.request.responseURL
      const imageUrlWithoutQuery = resUrl.split('?')[0]
      console.log(res)
      console.log(imageUrlWithoutQuery)
      // setitemsImgUrl((prev) => [...prev, resUrl])
      return imageUrlWithoutQuery
    } catch {
      alert('이미지 등록에 실패했습니다. S3업로드')
    }
  };

  useEffect(() => {
    const userFromLocation = location.state.user;
    if (userFromLocation) {
      setUser(userFromLocation);
      setNewNickname(userFromLocation.nickname || '');
    }
  }, [location.state.user]);

  const handleChangeUserInfo = async () => {
    try {
      if (!user) {
        console.error('에러 발생: 유저 정보가 없습니다.');
        return;
      }

      const presignedUrl = await handlePresigned(file.name)
      const imgUrl = await handleImgToS3(presignedUrl)
      console.log('preUrl로 post요청', presignedUrl)

      const response = await Api.put('user/current', {
        user: {
          _id: user._id,
          nickname: newNickname,
          //User schema에 userImgUrl로 작성되어 있습니다.
          userImgUrl: imgUrl, 
        },
      });

      // 직접 상태 업데이트
      setNewNickname(response.data.nickname || '');
      setProfileImage(response.data.profileImage || null);

      // UserInfo 페이지로 이동
      navigate('/userinfo', { state: { updatedUser: response.data._doc } });
    } catch (error) {
      console.error('유저 정보 에러:', error);
    }
  };

  return (
    <div>
      <div className='userInfo'>
        <h2></h2>

        {user ? (
          <div className='changeInfoForm'>
            <p>현재 닉네임: {user.nickname}</p>
            <p>현재 Rank: {getRankName(user.rank)}</p>

            {isChanging ? (
              <>
                <input
                  className='inputField'
                  type='text'
                  placeholder='새 닉네임'
                  value={newNickname}
                  onChange={(e) => setNewNickname(e.target.value)}
                />
                <input
                  className='fileInput'
                  type='file'
                  accept='image/*'
                  onChange={imgPreview}
                />
                {profileImage && 
                  <img 
                    src={profileImage} 
                    alt='프로필사진' 
                    style={{height: 150, width: 150}}
                  />}
                <button className='saveButton' onClick={handleChangeUserInfo}>
                  저장
                </button>
              </>
            ) : (
              <button className='userchange-btn' onClick={() => setIsChanging(true)}>
                유저 정보 변경
              </button>
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default ChangeInfo;
