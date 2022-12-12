import React, { useRef } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebase';
import { Card, CardHeader, CardBody, Input, ChakraProvider, Button, Link, Heading, Text} from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";

function Creation() {
    const email = useRef()
    const password = useRef()
    const adresse = useRef()
    const nom = useRef()
    const prenom = useRef()

    const navigate = useNavigate();

    const creation = (e) => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                const user = userCredential.user;
                creationInfoSupplementaires(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    }
    

    const creationInfoSupplementaires = async (user) => {
        await addDoc(collection(db, 'docteurCollection'), {
            id: user.uid,
            email: user.email,
            adresse: adresse.current.value,
            nom: nom.current.value,
            prenom: prenom.current.value,
        })
        navigate("/"); 
    }

    return (
        <ChakraProvider>
            <Card>
                <CardHeader>
                    <Heading size='md'>Formulaire d'inscription</Heading>
                </CardHeader>
                <CardBody>
                    <form onSubmit={creation}>
                        <Input type="text" ref={nom} placeholder="Nom" size='sm' />
                        <Input type="text" ref={prenom} placeholder="Prénom" size='sm' />
                        <Input type="text" ref={adresse} placeholder="Adresse" size='sm' />
                        <Input type="text" ref={email} placeholder="Email" size='sm' />
                        <Input type="password" ref={password} placeholder="Mot de passe" size='sm' />
                        <Button type="submit" colorScheme='facebook' size='sm'>Inscription</Button>
                    </form>
                    <Text>
                        Vous avez déjà un compte chez nous&nbsp;?{' '}
                        <Link color='facebook.500' href='/'>
                            Se&nbsp;connecter
                        </Link>
                    </Text>
                </CardBody>
            </Card>
        </ChakraProvider>

    )
}

export default Creation