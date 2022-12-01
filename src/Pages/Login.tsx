import {
  Avatar,
  Box,
  Button,
  chakra,
  Flex,
  FormControl,
  FormHelperText,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaLock, FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

function Login() {
  const [nombre, setNombre] = useState("");
  const [contrasena, setContrasena] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);
  const navigate = useNavigate();
  const toast = useToast();

  async function iraMenuPrincipal() {
    const resultado = await fetch(
      `http://localhost:80/pd-distibuida/base_api.php?comando=login`,
      {
        method: "POST",
        body: JSON.stringify({ nombre: nombre, contrasena: contrasena }),
      }
    ).then((res) => res.json());
    console.log(resultado);
    if (resultado.status !== "success") {
      toast({
        title: "Usuario",
        description: "No encontramos un usuario con esos datos.",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
    } else {
      const { contrasena, correo, id, nombre, nombre_tienda } =
        resultado.data[0];
      navigate("/menuprincipal", {
        state: {
          id,
          nombre,
          correo,
          nombre_tienda,
        },
      });
    }
  }

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Bienvenido</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <Stack
            spacing={4}
            p="1rem"
            backgroundColor="whiteAlpha.900"
            boxShadow="md"
          >
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<CFaUserAlt color="gray.300" />}
                />
                <Input
                  type="text"
                  placeholder="nombre de usuario"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  children={<CFaLock color="gray.300" />}
                />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  placeholder="Contraseña"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                    {showPassword ? "Ocultar" : "Mostrar"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormHelperText textAlign="right">
                <Link>olvidaste tu contraseña?</Link>
              </FormHelperText>
            </FormControl>
            <Button
              borderRadius={0}
              type="submit"
              variant="solid"
              colorScheme="teal"
              width="full"
              onClick={iraMenuPrincipal}
            >
              Entrar
            </Button>
          </Stack>
        </Box>
      </Stack>
      <Box>
        Nuevo con nosotros?{" "}
        <Link color="teal.500" href="/signup">
          Inscribete
        </Link>
      </Box>
    </Flex>
  );
}

export default Login;
