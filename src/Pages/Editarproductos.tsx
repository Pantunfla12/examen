import {
  Box,
  Center,
  Flex,
  FormControl,
  Image,
  Input,
  InputGroup,
  Spacer,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Editarproductos() {
  const location = useLocation();
  let producto = location.state.producto;

  const [nombre, setNombre] = useState(producto.nombre);
  const [descripcion, setDescripcion] = useState(producto.descripcion);
  const [cantidad, setCantidad] = useState(producto.cantidad);
  const [preciodecosto, setPreciodecosto] = useState(producto.precio_costo);
  const [preciodeventa, setPreciodeventa] = useState(producto.precio_venta);
  const [urlproducto, setUrlproducto] = useState(producto.url);
  const toast = useToast();

  const navigate = useNavigate();

  async function eliminarProducto(id: number) {
    const respuesta = await fetch(
      "http://localhost:80/pd-distibuida/base_api.php?comando=eliminarProducto",
      {
        method: "POST",
        body: JSON.stringify({ id: id }),
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

  async function guardarProducto() {
    const respuesta = await fetch(
      "http://localhost:80/pd-distibuida/base_api.php?comando=editarProducto",
      {
        method: "PUT",
        body: JSON.stringify({
          id: producto.id,
          nombre: nombre,
          descripcion: descripcion,
          cantidad: cantidad,
          precio_costo: preciodecosto,
          precio_venta: preciodeventa,
          url: urlproducto,
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
            <Text fontSize="lg">Editar Producto</Text>
          </Box>
          <Spacer />
          <Box
            p="4"
            bg="teal.400"
            as="button"
            borderRadius="md"
            onClick={() => eliminarProducto(producto.id)}
          >
            Eliminar
          </Box>
          <Spacer />
          <Box
            p="4"
            bg="teal.400"
            as="button"
            borderRadius="md"
            onClick={guardarProducto}
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
                      placeholder="nombre del producto"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <Input
                      type="text"
                      placeholder="describelo"
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <Input
                      type="number"
                      placeholder="cantidad de unidades"
                      value={cantidad}
                      onChange={(e) => setCantidad(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <Input
                      type="number"
                      placeholder="precio de costo"
                      value={preciodecosto}
                      onChange={(e) => setPreciodecosto(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <Input
                      type="number"
                      placeholder="precio de venta"
                      value={preciodeventa}
                      onChange={(e) => setPreciodeventa(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <Input
                      type="text"
                      placeholder="url de imagen del producto"
                      value={urlproducto}
                      onChange={(e) => setUrlproducto(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>
                <Center>
                  <Image src={urlproducto} height="200" borderRadius="md" />
                </Center>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default Editarproductos;
