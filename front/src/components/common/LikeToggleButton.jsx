import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const LikeToggleButton = () => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeToggle = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
  };

  return (
    <IconButton onClick={handleLikeToggle} color={isLiked ? 'secondary' : 'default'}>
      {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};

export default LikeToggleButton;
