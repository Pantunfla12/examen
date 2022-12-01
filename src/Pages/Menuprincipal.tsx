import { Box, Flex, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

function Menuprincipal() {
  const location = useLocation();

  let id = location.state.id;
  let nombre = location.state.nombre;
  let correo = location.state.correo;
  let tienda = location.state.nombre_tienda;

  console.log(id, nombre, correo, tienda);

  const navigate = useNavigate();
  // console.log(userId)
  const iraProductos = () => {
    navigate("/productos", {
      state: { userId: id, tienda: tienda },
    });
  };

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
        <Box
          bg="teal.400"
          minW={{ base: "90%", md: "468px" }}
          p={4}
          color="white"
          marginBottom={2}
        >
          <h1>{tienda}</h1>
        </Box>
        <SimpleGrid
          columns={2}
          spacingX="40px"
          spacingY="20px"
          minW={{ base: "90%", md: "468px" }}
        >
          <Box
            bg="teal.300"
            height="80px"
            p={4}
            as="button"
            onClick={iraProductos}
            borderRadius="md"
          >
            <Text fontSize="lg">Productos</Text>
          </Box>
          <Box
            bg="teal.300"
            height="80px"
            p={4}
            onClick={() => {
              console.log("wws");
            }}
          >
            <Text fontSize="lg">Clientes</Text>
          </Box>
          <Box bg="teal.300" height="80px" p={4}>
            <Text fontSize="lg">Vender</Text>
          </Box>
          <Box bg="teal.300" height="80px" p={4}>
            <Text fontSize="lg">Reporte</Text>
          </Box>
        </SimpleGrid>
      </Stack>
    </Flex>
  );
}

export default Menuprincipal;
