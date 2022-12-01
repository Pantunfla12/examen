import { Box, Flex, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const VerReporte = () => {
  const location = useLocation();
  let reporte = location.state.reporte;
  const [registros, setRegistros] = useState([]);
  const navigate = useNavigate();
  const getApiData = async () => {
    console.log(reporte.id);

    const resultado = await fetch(
      "http://localhost:80/pd-distibuida/base_api.php?comando=getDetallesVenta",
      {
        method: "POST",
        body: JSON.stringify({ id_ticket: reporte.id }),
      }
    ).then((res) => res.json());

    if (resultado.status === "success") {
      setRegistros(resultado.data);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);
  console.log(registros);
  return (
    <Flex flexDirection="column" backgroundColor="gray.200" alignItems="center">
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
        <Flex minW={{ base: "90%", md: "468px" }} bg="teal.200" p="2">
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
            <Text fontSize="lg">Ver reporte</Text>
          </Box>
        </Flex>
        <Box display="flex" mt="2" alignItems="center">
          <Stack
            flexDir="column"
            mb="2"
            justifyContent="center"
            alignItems="center"
          >
            <Box minW={{ base: "90%", md: "468px" }}>
              <Stack
                spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
              >
                <Text fontSize="md">Id ticket:{reporte.id}</Text>
                <Text fontSize="md">Cliente:{reporte.nombre}</Text>
                <Text fontSize="md">Correo:{reporte.correo}</Text>
                <Text fontSize="md">Direccion:{reporte.direccion}</Text>
                <Text fontSize="md">Fecha:{reporte.fecha}</Text>
                <Text fontSize="md">Telefono:{reporte.telefono}</Text>

                <Box my={5}>
                  <Text fontSize="md">Productos</Text>

                  <SimpleGrid columns={4} spacing={10}>
                    {registros.map(
                      (
                        item: {
                          id: number;
                          nombre: string;
                          descripcion: string;
                          cantidad: number;
                          precio: number;
                          url: string;
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
                        >
                          <Box color="black">
                            <Text fontSize="lg" fontWeight="bold">
                              {item.nombre}
                            </Text>
                            <Text fontSize="md">
                              Descripcion: {item.descripcion}
                            </Text>
                            <Text fontSize="sm">Cantidad: {item.cantidad}</Text>
                            <Text fontSize="sm">Precio: {item.precio}</Text>
                            <Text fontSize="sm">
                              Total: {item.precio * item.cantidad}
                            </Text>
                          </Box>
                        </Box>
                      )
                    )}
                  </SimpleGrid>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default VerReporte;
