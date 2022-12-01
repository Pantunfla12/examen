import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  InputGroup,
  Select,
  Spacer,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Ventas = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedClient, setSelectedClient] = useState<string | undefined>(
    undefined
  );
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [cart, setCart] = useState<any[]>([]);
  const toast = useToast();
  console.log(cart);

  const getClients = async () => {
    const response = await fetch(
      "http://localhost:80/pd-distibuida/base_api.php?comando=clientes"
    ).then((res) => res.json());

    if (response.status === "success") {
      setClients(response.data);
    }
  };

  const getProducts = async () => {
    const response = await fetch(
      "http://localhost:80/pd-distibuida/base_api.php?comando=productos"
    ).then((res) => res.json());
    if (response.status === "success") {
      setProducts(response.data);
    }
  };

  const eviarVenta = async () => {
    let productos: any = [];
    cart.forEach((element) => {
      let newObject = {
        id_producto: element.product.id,
        cantidad: element.amount,
        precio: element.product.precio_venta,
      };
      productos.push(newObject);
    });
    console.log(
      JSON.stringify({
        id_cliente: selectedClient,
        productos: productos,
      })
    );

    const response = await fetch(
      "http://localhost:80/pd-distibuida/base_api.php?comando=agregarVenta",
      {
        method: "POST",
        body: JSON.stringify({
          id_cliente: selectedClient,
          productos: productos,
        }),
      }
    ).then((res) => res.json());

    if (response.status === "success") {
      navigate(-1);
    } else {
      toast({
        title: "Producto",
        description: "No se pudo eliminar el producto.",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    getClients();
    getProducts();
  }, []);

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
            <Text fontSize="lg">Venta</Text>
          </Box>
        </Flex>
        <Flex minW={{ base: "90%", md: "468px" }} bg="teal.200" p="2">
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
                      {clients !== undefined && (
                        <Select
                          onChange={(e) => {
                            setSelectedClient(e.target.value);
                          }}
                        >
                          <option value="">Selecciona un cliente</option>
                          {clients.map((client: any, index: number) => (
                            <option key={index} value={client.id}>
                              {client.nombre}
                            </option>
                          ))}
                        </Select>
                      )}
                    </InputGroup>
                  </FormControl>
                  <Box>
                    <form>
                      <FormControl my={2}>
                        <InputGroup>
                          <Select
                            onChange={(e: any) => {
                              const selectedProduct = products.find(
                                (y: any) => y.id === e.target.value
                              );
                              setSelectedProduct(selectedProduct!);
                            }}
                          >
                            <option value="">Seleccione un producto</option>
                            {products.map((product: any, index: number) => (
                              <option key={index} value={product.id}>
                                {product.nombre}
                              </option>
                            ))}
                          </Select>
                        </InputGroup>
                      </FormControl>
                      <FormControl>
                        <InputGroup>
                          <Input
                            type="number"
                            placeholder="precio de venta"
                            value={selectedAmount}
                            onChange={(e) =>
                              setSelectedAmount(parseInt(e.target.value))
                            }
                          />
                        </InputGroup>
                      </FormControl>
                      <Box my={2}>
                        <Button
                          colorScheme="blue"
                          onClick={() => {
                            setCart([
                              ...cart,
                              {
                                product: selectedProduct,
                                amount: selectedAmount,
                              },
                            ]);

                            setSelectedProduct(null);
                            setSelectedAmount(0);
                          }}
                        >
                          Agregar Producto
                        </Button>
                      </Box>
                      <Box>
                        <h3>Productos</h3>
                        <Box>
                          {cart.map((item: any, index: number) => (
                            <Flex key={index}>
                              <Box mx={2}>{item.product.nombre}</Box>
                              <Box mx={2}>{item.amount}</Box>
                              <Spacer />
                              <Box>
                                <Button
                                  colorScheme="red"
                                  onClick={() => {
                                    setCart(
                                      cart.filter((x: any) => x !== item)
                                    );
                                  }}
                                >
                                  Eliminar
                                </Button>
                              </Box>
                            </Flex>
                          ))}
                        </Box>
                      </Box>
                      <Button
                        colorScheme="blue"
                        onClick={() => {
                          eviarVenta();
                        }}
                      >
                        Guardar venta
                      </Button>
                    </form>
                  </Box>
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Flex>
      </Stack>
    </Flex>
  );
};

export default Ventas;
