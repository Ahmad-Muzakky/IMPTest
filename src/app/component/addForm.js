import React from "react";
import { useForm } from "react-hook-form";
import {
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import axios from "axios";

export default function AddForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const addPost = async (data) => {
    try {
      const res = await axios.post(
        `https://jsonplaceholder.typicode.com/posts`,
        data
      );
      console.log(res);
      alert("Berhasil Menambahkan Post!" + (" || Resposnse Status :") + res.status);
      location.reload();
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit(addPost)}>
        <FormLabel>Title</FormLabel>
        <Input
          id="title"
          name="title"
          type="text"
          placeholder="Enter title"
          {...register("title", { required: true })}
        />
        <error>{errors.title?.type === "required" && "title is required"}</error>

        <FormLabel>Body</FormLabel>
        <Input
          id="body"
          name="body"
          type="text"
          placeholder="Enter Body"
          {...register("body", { required: true })}
        />
        <error>{errors.body?.type === "required" && "body is required"}</error>

        <FormLabel>User Id</FormLabel>
        <Input
          id="user_id"
          name="user_id"
          type="text"
          placeholder="Enter User Id"
          {...register("user_id", { required: true })}
        />
        <error>
          {errors.user_id?.type === "required" && "User Id is required"}
        </error>
        <Button variant="solid" color={"blue.500"} type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
