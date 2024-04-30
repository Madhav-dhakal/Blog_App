import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  InputLabel,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const BlogDetails = () => {
  const [blog, setBlogs] = useState({});
  const id = useParams().id;
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const matches = useMediaQuery("(max-width:740px)");
  const con = useMediaQuery("(max-width:576px)");
  //get blog details
  const getBlogDetail = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/blog/get-blog/${id}`
      );
      if (data?.success) {
        setBlogs(data?.blog);
        setInputs({
          title: data.blog.title,
          description: data?.blog.description,
          image: data?.blog.image,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBlogDetail();
  }, [id]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/blog/update-blog/${id}`,
        {
          title: inputs.title,
          description: inputs.description,
          image: inputs.image,
          user: id,
        }
      );
      if (data?.success) {
        toast.success("blog updated successfully");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(blog);
  const inputLabelStyle = {
    fontWeight: "bold",
    borderRadius: "10px",
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={matches ? "75%" : "45%"}
          border={3}
          borderRadius={12}
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
            justifyContent={"center"}
            fontWeight={"bold"}
            padding={3}
            color={"gray"}
            fontSize={matches ? "30px" : "36px"}
          >
            {con ? "Update" : "Update a Post"}
          </Typography>
          <InputLabel
            sx={{
              fontWeight: "bold",
              mb: 0.7,
              mt: 1,
              fontSize: con ? "16px" : "22px",
            }}
          >
            Title
          </InputLabel>
          <TextField
            name="title"
            value={inputs.title || ""}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
            InputProps={{ style: { borderRadius: "12px" } }}
          />

          <InputLabel
            sx={{
              fontWeight: "bold",
              mb: 0.7,
              mt: 1,
              fontSize: con ? "16px" : "22px",
            }}
          >
            Description
          </InputLabel>
          <TextField
            name="description"
            value={inputs.description || ""}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            multiline
            rows={3}
            InputProps={{ style: { borderRadius: "12px" } }}
            required
          />

          <InputLabel
            sx={{
              fontWeight: "bold",
              mb: 0.7,
              mt: 1,
              fontSize: con ? "16px" : "22px",
            }}
          >
            Image URL
          </InputLabel>
          <TextField
            name="image"
            value={inputs.image || ""}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            InputProps={{ style: { borderRadius: "12px" } }}
            required
          />
          <br />

          <Button
            type="submit"
            color="warning"
            variant="contained"
            sx={inputLabelStyle}
          >
            Update
          </Button>
        </Box>
      </form>
    </>
  );
};
export default BlogDetails;
