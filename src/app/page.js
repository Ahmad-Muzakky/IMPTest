"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useDisclosure,
  Button,
  Box,
  Text,
} from "@chakra-ui/react";
import { ViewIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
const queryClient = new QueryClient();
import axios from "axios";
import DetailModals from "./component/modal";


export default function HomePage() {
  return (
    <QueryClientProvider client={queryClient}>
      <Content />
    </QueryClientProvider>
  );
  function Content(){
const { isOpen, onOpen, onClose } = useDisclosure();
const [postData, setPostData] = useState([]);
const [selected, setSelected] = useState();
const [loading, setLoading] = useState(true);
const [whichModal, setWhichModal] = useState();

const getPost = async () => {
  try {
    setLoading(true);
    await axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(async (res) => {
        console.log(res);
        setPostData(res.data);
        setLoading(false);
      });
  } catch (error) {
    setLoading(false);
    console.log(error.message);
  }
};

const deletePost = async (data) => {
  try {
    const res = await axios.delete(
      `https://jsonplaceholder.typicode.com/posts/${data}`
    );
    alert("Data Berhasil Dihapus!" + " || Resposnse Status :" + res.status);
    location.reload();
  } catch (error) {
    console.log(error.message);
  }
};

useEffect(() => {
  getPost();
}, []);

    // const { isLoading, error, data } = useQuery("names", () =>
    //   axios("https://jsonplaceholder.typicode.com/posts")
    //   .then(async(res) => {
    //     console.log(res);
    //     setPostData(res);
    //   })
    // );

    // if (isLoading) return "Loading...";

    // if (error) return "An error has occurred: " + error.message;
return (
  <>
    <Box backgroundColor="blue.300" p={10}>
      <div className="container">
        <Box
          backgroundColor="white"
          boxShadow="dark-lg"
          rounded={"md"}
          px={20}
          pb={20}
        >
          {whichModal === "detail" ? (
            <DetailModals
              data={selected}
              isOpen={isOpen}
              onClose={onClose}
              whichModal={"detail"}
            />
          ) : whichModal === "edit" ? (
            <DetailModals
              data={selected}
              isOpen={isOpen}
              onClose={onClose}
              whichModal={"edit"}
            />
          ) : whichModal === "tambah" ? (
            <DetailModals
              data={selected}
              isOpen={isOpen}
              onClose={onClose}
              whichModal={"tambah"}
            />
          ) : (
            ""
          )}
          <h1>
            <Text fontSize="5xl">
              Take Home Project Front End Developer <br /> PT Informatika Media
              Pratama <br />
            </Text>
            <Text fontSize={"xl"}>Created By Ahmad Muzakky</Text>
          </h1>
          <Button
            onClick={async (e) => {
              setWhichModal("tambah");
              onOpen(e);
            }}
          >
            Tambah Data
          </Button>
          <TableContainer mt={5} p={5}>
            <Table size="xl">
              <Thead>
                <Tr>
                  <Th>Id</Th>
                  <Th>User Id</Th>
                  <Th>Title</Th>
                  <Th>Detail Body</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {loading
                  ? ""
                  : postData.map((items) => (
                      <Tr>
                        <Td>{items.id}</Td>
                        <Td>{items.userId}</Td>
                        <Td>{items.title}</Td>
                        <Td>
                          <Button
                            onClick={async (e) => {
                              setWhichModal("detail");
                              await setSelected(items.body);
                              onOpen(e);
                            }}
                          >
                            <ViewIcon />
                          </Button>
                        </Td>
                        <Td>
                          <Button
                            color="blue.500"
                            onClick={async (e) => {
                              setWhichModal("edit");
                              await setSelected(items.id);
                              onOpen(e);
                            }}
                          >
                            <EditIcon />
                          </Button>
                          <Button
                            ml={3}
                            color="red.500"
                            onClick={() => {
                              deletePost(items.id);
                            }}
                          >
                            <DeleteIcon />
                          </Button>
                        </Td>
                      </Tr>
                    ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </div>
    </Box>
  </>
);
  }
  
}
