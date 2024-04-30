import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { Box, IconButton, Collapse } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function BlogCard({ title, description, image, username, time, id, isUser }) {
  const navigate = useNavigate();
  const [reaction, setReaction] = useState(null); 
  const [expanded, setExpanded] = useState(false);

  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`http://localhost:8080/api/v1/blog/delete-blog/${id}`);
      if (data?.success) {
        setTimeout(() => {
          navigate("/my-blogs");
          window.location.reload();
        }, 2000);
        toast.success("Blog deleted successfully!!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLove = () => {
    if (reaction !== 'love') {
      setReaction('love');
    } else {
      setReaction(null); 
    }
  };

  const handleHate = () => {
    if (reaction !== 'hate') {
      setReaction('hate');
    } else {
      setReaction(null); 
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{
        maxWidth: "40%",
        margin: "auto",
        mt: 2,
        p: 2,
        boxShadow: "5px 5px 10px #ccc",
        transition: "box-shadow 0.3s",
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
          transform: "scale(1.03)",
          cursor:"pointer"
        },
        "@media (max-width: 768px)": {
          maxWidth: "90%",
        },
      }}
    >
      {isUser && (
        <Box display={'flex'}>
          <IconButton sx={{ marginLeft: "auto" }} onClick={handleEdit} color='info'>
            <ModeEditIcon />
          </IconButton>
          <IconButton onClick={handleDelete} color='error'>
            <DeleteIcon />
          </IconButton>
        </Box>
      )}

      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {username}
          </Avatar>
        }
        title={username}
        subheader={time}
      />
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt="Blog Image"
      />
      <CardContent>
        <Typography variant='h6' color='text.secondary' sx={{ fontSize: '1.13rem', fontWeight:"bold"}}>
          Title: {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        <Typography variant="body1" sx={{ fontSize: '1.1rem',color:"highlighted" }}>
          Description:<Typography sx={{marginTop:"0.7rem"}}></Typography> </Typography>{expanded ? description : `${description.slice(0, 100)}...`}
          <IconButton
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            sx={{ fontSize: '0.9rem' }}
          >
            {expanded ? 'See less' : 'See more'}
          </IconButton>
        </Typography>
      </CardContent>
      <Box display="flex" justifyContent="space-between">
        <IconButton onClick={handleLove} color={reaction === 'love' ? 'primary' : 'default'}>
          <FavoriteIcon />
        </IconButton>
        <IconButton onClick={handleHate} color={reaction === 'hate' ? 'error' : 'default'}>
          <ThumbDownIcon />
        </IconButton>
      </Box>
    </Card>
  );
}
