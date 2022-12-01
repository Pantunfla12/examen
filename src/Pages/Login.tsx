import { useState } from "react"
import { useNavigate } from "react-router-dom";
import {
    Flex,
    Heading,
    Input,
    Button,
    InputGroup,
    Stack,
    InputLeftElement,
    chakra,
    Box,
    Link,
    Avatar,
    FormControl,
    FormHelperText,
    InputRightElement,
    useToast
  } from "@chakra-ui/react";
  import { FaUserAlt, FaLock } from "react-icons/fa";
  
  
  const CFaUserAlt = chakra(FaUserAlt);
  const CFaLock = chakra(FaLock);
  
function Login() {
  const [nombre,setNombre]=useState('')
  const [contrasena,setContrasena]=useState('')
  
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);
  const navigate=useNavigate()
  const toast = useToast()  

 

async function iraMenuPrincipal()
{
      
const resultado=await fetch(`http://localhost/programacion_distribuida/base_api.php?comando=login`, {
  method: 'POST',
  body: JSON.stringify({nombre:nombre,contrasena:contrasena})


})


const data=await resultado.json() 
console.log('esto es resultado',data)

// if(data.records.length>0)
// {
//   const id = data.records[0].id
//   const nombre = data.records[0].nombre
//   const correo = data.records[0].correo
//   const tienda = data.records[0].nombre_tienda
// navigate('/menuprincipal',{
//     state:{
//       id,
//       nombre,
//       correo,
//       tienda
//   }
// })
// }
// else
// {
// toast({
//     title: 'Usuario',
//     description: "No encontramos un usuario con esos datos.",
//     status: 'warning',
//     duration: 4000,
//     isClosable: true,
//   })
// }
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
                  <Input type="text" placeholder="nombre de usuario" value={nombre}
                 onChange={(e) => setNombre(e.target.value)} />
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
              onClick={iraMenuPrincipal}>
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
    )
}

export default Login
