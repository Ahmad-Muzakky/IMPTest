import React from "react";
import { useForm } from "react-hook-form";
import {
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import axios from "axios";

export default function EditForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const editPost = async (formData) => {
    try {
      const data = {
        id: formData.id,
        title: formData.title,
        body: formData.body,
        userId: formData.userId,
      };
      const res = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${formData.id}`,
        data
      );
      console.log(res);
      alert("Berhasil Edit Post!" + (" || Resposnse Status :") + res.status);
      location.reload();
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit(editPost)}>
        <FormLabel>Post Id</FormLabel>
        <Input
          id="id"
          name="id"
          type="text"
          placeholder="Enter Id"
          {...register("id", { required: true })}
        />
        <error>
          {errors.id?.type === "required" && "id is required"}
        </error>
        <FormLabel>Title</FormLabel>
        <Input
          id="title"
          name="title"
          type="text"
          placeholder="Enter title"
          {...register("title", { required: true })}
        />
        <error>
          {errors.title?.type === "required" && "title is required"}
        </error>

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
          id="userId"
          name="userId"
          type="text"
          placeholder="Enter User Id"
          {...register("userId", { required: true })}
        />
        <error>
          {errors.userId?.type === "required" && "User Id is required"}
        </error>
        <Button variant="solid" color={"blue.500"} type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
