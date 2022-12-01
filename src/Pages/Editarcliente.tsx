import {
  Box,
  Flex,
  FormControl,
  Input,
  InputGroup,
  Spacer,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Editarcliente() {
  const location = useLocation();
  let cliente = location.state.cliente;
  const [nombre, setNombre] = useState(cliente.nombre);
  const [direccion, setdireccion] = useState(cliente.direccion);
  const [telefono, settelefono] = useState(cliente.telefono);
  const [correo, setcorreo] = useState(cliente.correo);
  const navigate = useNavigate();
  const toast = useToast();

  async function eliminar() {
    const respuesta = await fetch(
      "http://localhost:80/pd-distibuida/base_api.php?comando=eliminarCliente",
      {
        method: "POST",
        body: JSON.stringify({ id: cliente.id }),
      }
    ).then((res) => res.json());

    if (respuesta.status === "success") navigate(-1);
    else {
      toast({
        title: "Producto",
        description: "No se pudo eliminar el producto.",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
    }
  }

  async function guardar() {
    const respuesta = await fetch(
      "http://localhost:80/pd-distibuida/base_api.php?comando=editarCliente",
      {
        method: "PUT",
        body: JSON.stringify({
          id: cliente.id,
          nombre: nombre,
          direccion: direccion,
          telefono: telefono,
          correo: correo,
        }),
      }
    ).then((res) => res.json());

    if (respuesta.status === "success") navigate(-1);
    else {
      toast({
        title: "Producto",
        description: "No se pudo actualizar el producto.",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
    }
  }

  return (
    <Flex
      flexDirection="column"
      // width="200wh"
      //height="200vh"
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
            <Text fontSize="lg">Editar Cliente</Text>
          </Box>
          <Spacer />
          <Box p="4" bg="teal.400" as="button" onClick={eliminar}>
            Eliminar
          </Box>
          <Spacer />
          <Box
            p="4"
            bg="teal.400"
            as="button"
            borderRadius="md"
            onClick={guardar}
          >
            Actualizar
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
                <FormControl>
                  <InputGroup>
                    <Input
                      type="text"
                      placeholder="nombre del cliente"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <Input
                      type="text"
                      placeholder="direccion"
                      value={direccion}
                      onChange={(e) => setdireccion(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <Input
                      type="text"
                      placeholder="telefono"
                      value={telefono}
                      onChange={(e) => settelefono(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <Input
                      type="text"
                      placeholder="correo"
                      value={correo}
                      onChange={(e) => setcorreo(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default Editarcliente;
