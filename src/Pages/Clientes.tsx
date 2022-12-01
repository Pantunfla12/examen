import { Box, Flex, SimpleGrid, Spacer, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Clientes() {
  const [registros, setRegistros] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  let userId = location.state.userId;
  const getApiData = async () => {
    const resultado = await fetch(
      "http://localhost:80/pd-distibuida/base_api.php?comando=clientes"
    ).then((res) => res.json());
    console.log(resultado);

    if (resultado.status === "success") {
      setRegistros(resultado.data);
    }
  };

  const editar = (item: {
    id: number;
    nombre: string;
    direccion: string;
    telefono: string;
    correo: string;
    id_usuario: number;
  }) => {
    navigate("/editarCliente", {
      state: {
        cliente: item,
      },
    });
  };
  function agregar() {
    navigate("/nuevocliente", {
      state: {
        userId: userId,
      },
    });
  }

  useEffect(() => {
    getApiData();
  }, []);
  return (
    <Flex
      flexDirection="column"
      width="200wh"
      height="200vh"
      backgroundColor="gray.200"
      // justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        p={2}
        backgroundColor="white"
        justifyContent="center"
        alignItems="center"
        marginTop={4}
        borderRadius="md"
      >
        <Flex bg="teal.200" minW={{ base: "90%", md: "468px" }} p="2">
          <Box
            p="4"
            bg="teal.400"
            as="button"
            onClick={() => navigate(-1)}
            borderRadius="md"
          >
            Regresar
          </Box>
          <Box p="4">
            <Text fontSize="lg">Clientes</Text>
          </Box>
          <Spacer />
          <Box
            bg="teal.400"
            height="80px"
            p={4}
            as="button"
            borderRadius="md"
            onClick={agregar}
          >
            <Text fontSize="lg">Nuevo Cliente</Text>
          </Box>
        </Flex>
        <Box display="flex" mt="2" alignItems="center">
          <SimpleGrid columns={4} spacing={10}>
            {registros.map(
              (
                item: {
                  id: number;
                  nombre: string;
                  direccion: string;
                  telefono: string;
                  correo: string;
                  id_usuario: number;
                },
                i
              ) => (
                <Box
                  ml="2"
                  fontSize="sm"
                  borderColor="teal.200"
                  p={2}
                  bg="teal.50"
                  width={200}
                  key={i}
                  borderRadius="md"
                  alignItems="center"
                  as="button"
                  onClick={() => {
                    editar(item);
                  }}
                >
                  <Box color="black">
                    <Text fontSize="lg" fontWeight="bold">
                      {item.nombre}
                    </Text>
                    <Text fontSize="md">Direccion:{item.direccion}</Text>
                    <Text fontSize="sm">Correo: {item.correo}</Text>
                  </Box>
                </Box>
              )
            )}
          </SimpleGrid>
        </Box>
        {/* <Box
          bg="teal.400"
          minW={{ base: "90%", md: "468px" }}
          p={4}
          color="white"
          marginBottom={2}
        >
          <h1>Clientes</h1>
        </Box>

        <Box
          bg="teal.300"
          height="80px"
          p={4}
          as="button"
          borderRadius="md"
          onClick={() => navigate("/nuevocliente")}
        >
          <Text fontSize="lg">Nuevo Cliente</Text>
        </Box>

        <Box
          bg="teal.300"
          height="80px"
          p={4}
          as="button"
          borderRadius="md"
          onClick={() => navigate("/editarCliente")}
        >
          <Text fontSize="lg">Editar Cliente</Text>
        </Box> */}
      </Stack>
    </Flex>
  );
}

export default Clientes;
