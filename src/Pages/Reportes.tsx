import { Box, Flex, SimpleGrid, Spacer, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Reportes = () => {
  const [registros, setRegistros] = useState([]);
  const navigate = useNavigate();
  const getApiData = async () => {
    const resultado = await fetch(
      "http://localhost:80/pd-distibuida/base_api.php?comando=getVentas"
    ).then((res) => res.json());
    console.log(resultado);

    if (resultado.status === "success") {
      setRegistros(resultado.data);
    }
  };

  const ver = (item: {
    id: number;
    nombre: string;
    direccion: string;
    telefono: string;
    correo: string;
    id_usuario: number;
    fecha: string;
    id_cliente: number;
  }) => {
    navigate("/verreportes", {
      state: {
        reporte: item,
      },
    });
  };

  useEffect(() => {
    getApiData();
  }, []);
  console.log(registros);

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
            <Text fontSize="lg">Reportes</Text>
          </Box>
          <Spacer />
        </Flex>
        <Box display="flex" mt="2" alignItems="center">
          <SimpleGrid columns={4} spacing={10}>
            {/* correo : "test@gmail.com" direccion : "test" fecha : "2022-12-01" id
            : "2" id_cliente : "2" id_usuario : "1" nombre : "test" telefono :
            "3121775682" */}
            {registros.map(
              (
                item: {
                  id: number;
                  nombre: string;
                  direccion: string;
                  telefono: string;
                  correo: string;
                  id_usuario: number;
                  fecha: string;
                  id_cliente: number;
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
                    ver(item);
                  }}
                >
                  <Box color="black">
                    <Text fontSize="lg" fontWeight="bold">
                      Id: {item.id}
                    </Text>
                    <Text fontSize="md">Cliente:{item.nombre}</Text>
                    <Text fontSize="sm">Fecha: {item.fecha}</Text>
                  </Box>
                </Box>
              )
            )}
          </SimpleGrid>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Reportes;
