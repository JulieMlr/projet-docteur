import React, { useRef } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Card, CardHeader, CardBody, Input, ChakraProvider, Button, Link, Heading, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { getDocs, query, collection, where } from 'firebase/firestore';
import { db } from '../firebase';


function Connexion() {
    const email = useRef()
    const password = useRef()

    const navigate = useNavigate()

    const connexion = (e) => {
        console.log('connexion')
        e.preventDefault()
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then(async (userCredential) => {
                const user = userCredential.user;
                console.log(user)
                const q = query(collection(db, "docteurCollection"), where("email", "==", user.email));
                const docSnap = await getDocs(q);
                docSnap.forEach((res) => {
                    console.log(res.data())
                    navigate('/calendrier/'+ res.data().id)
                })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    }

    return (
        <ChakraProvider>
            <Card>
                <CardHeader>
                    <Heading size='md'>Formulaire de connexion</Heading>
                </CardHeader>
                <CardBody>
                    <form onSubmit={connexion} >
                        <Input type="text" ref={email} placeholder="Email" size='sm' />
                        <Input type="password" ref={password} placeholder="Mot de passe" size='sm' />
                        <Button type="submit" colorScheme='facebook' size='sm'>Connexion</Button>
                        <Text>
                            Vous n'avez pas de compte chez nous&nbsp;?{' '}
                            <Link color='facebook.500' href='/creation'>
                                S'inscrire
                            </Link>
                        </Text>
                    </form>
                </CardBody>
            </Card>
        </ChakraProvider>
    )
}

export default Connexion