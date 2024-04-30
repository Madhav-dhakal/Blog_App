import { Box, Button, InputLabel, TextField, Typography, useMediaQuery } from "@mui/material";
import React,{useState} from "react";
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify';
 const CreateBlog=()=>{
     const id= localStorage.getItem('userId')
     const navigate=useNavigate()
     const matches = useMediaQuery('(max-width:740px)');
     const con = useMediaQuery('(max-width:576px)');
     const [inputs, setInputs]=useState({
          title:"",
          description:"",
          image:""
     })
     const handleChange=(e)=>{
          setInputs((prevState)=>({
               ...prevState,
              [ e.target.name]:e.target.value
          }))
     };
     const handleSubmit=async(e)=>{
          e.preventDefault();
          try {
          const {data} = await axios.post("http://localhost:8080/api/v1/blog/create-blog",{
               title:inputs.title,
              description:inputs.description,
              image:inputs.image,
              user:id
          })
         if(data?.success){
          toast.success("blog created successfully")
          navigate('/my-blogs')
         }
          } catch (error) {
             console.log(error);  
          }
         
     }
     const inputLabelStyle = {
          fontWeight: "bold",
          borderRadius:"10px",
     
        };
     return(
          <>
          <form onSubmit={handleSubmit}>
               <Box
               maxWidth={matches ? "75%" : "45%"}
             
                border={3}
                borderRadius={10}
                padding={3}
                margin={"auto"}
                boxShadow={"10px 10px 20px #ccc"}
                display={"flex"}
                flexDirection={"column"}
                marginTop={10}
               >
                    <Typography
                    variant="h2"
                    textAlign={"center"}
                    fontWeight={"bold"}
                    padding={3}
                    color={"gray"}
                    fontSize={matches ? "30px" : "36px"} 
                    >
                         {con ? "Create Post" : "Create a Post"}
                    </Typography>
                    <InputLabel 
                    sx={{fontWeight:"bold",mb: 0.7,mt: 1,fontSize: con ? "16px" : "22px"}}>Title</InputLabel>
                    <TextField InputProps={{ style: { borderRadius: '12px' } }} name='title' value={inputs.title} onChange={handleChange} margin="normal" variant="outlined" required/>
              
                    <InputLabel sx={{fontWeight:"bold",mb: 0.7,mt: 1,fontSize: con ? "16px" : "22px"}}>Description</InputLabel>
                    <TextField multiline rows={3} InputProps={{ style: { borderRadius: '12px' } }}  name='description' value={inputs.description} onChange={handleChange} margin="normal" variant="outlined" required/>

                    <InputLabel sx={{fontWeight:"bold",mb: 0.7,mt: 1, fontSize: con ? "16px" : "22px",}}>Image URL</InputLabel>
                    <TextField InputProps={{ style: { borderRadius: '12px' } }} name='image' value={inputs.image} onChange={handleChange} margin="normal" variant="outlined" required/><br/>
               
               <Button type="submit" color="primary" variant="contained" sx={inputLabelStyle}>Submit</Button>
               </Box>
          </form>
          </>
     );
 };
  export default CreateBlog;