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
  import {AiTwotoneMail} from 'react-icons/ai';
  import {BiStore} from 'react-icons/bi';
  
  
  const CFaUserAlt = chakra(FaUserAlt);
  const CFaLock = chakra(FaLock);
  const CFEmail = chakra(AiTwotoneMail);
  const CFStore = chakra(BiStore);
  
function Login() {
  const [nombre,setNombre]=useState('')
  const [contrasena,setContrasena]=useState('')
  const [correo, setCorreo] = useState('')
  const [tienda, setTienda] = useState('')
  
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);
  const navigate=useNavigate()
  const toast = useToast()  

 

async function iraMenuPrincipal()
{
      
const resultado=await fetch('https://pmoviles1.000webhostapp.com/api/apiv.php?comando=login&nombre='+
nombre+'&contrasena='+contrasena)
const datos=await resultado.json()

if(datos.records.length>0)
{
navigate('/menuprincipal',{
    state:{
    userId: datos.records[0].id,
    tienda:datos.records[0].tienda
  }
})
}
else
{
toast({
    title: 'Usuario',
    description: "No encontramos un usuario con esos datos.",
    status: 'warning',
    duration: 4000,
    isClosable: true,
  })
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
        <Heading color="teal.400">Registrate</Heading>
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
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFEmail color="gray.300" />}
                  />
                  <Input type="email" placeholder="Correo" value={correo}
                 onChange={(e) => setCorreo(e.target.value)} />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFStore color="gray.300" />}
                  />
                  <Input type="text" placeholder="Tienda" value={tienda}
                 onChange={(e) => setTienda(e.target.value)} />
                </InputGroup>
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
        Ya estas registrado?{" "}
        <Link color="teal.500" href="/">
          Inicia sesión
        </Link>
      </Box>        
    </Flex>
    )
}

export default Login
