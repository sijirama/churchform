import { Card, FormControl, FormHelperText  , TextField , Button, Alert} from '@mui/material';
import React, { useRef , useState } from "react"
import { useAuth } from "../../context/AuthContext.jsx"
import {Link , useNavigate } from "react-router-dom"
import './signup.scss'


export default function Signup(){
    const navigate  = useNavigate()
    const firstnameRef = useRef()
    const lastnameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const [loading , setLoading ] = useState(false)
    const { createuser } = useAuth()
    const [error, setError] = useState("")
    const [severity, setSeverity] = useState("")
    
    async function handleSubmit (e)  {
        e.preventDefault()
        //NOTE: severity option - error, success, info, warning

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return( setSeverity("error") , setError("Passwords do not match"))
        }

        try {
            setError("")
            setLoading(true)

            await createuser(emailRef.current.value, passwordRef.current.value)
            console.log(emailRef.current.value, passwordRef.current.value)

            setSeverity("success") 
            setError("Account Created")
            navigate('/signin')

        } catch (error) {
            setError("")
            setSeverity("error")
            setError("Failed to create an account")
        }
        setLoading(false)
    }

    function alertClose(){
        setError("")
    }

    const styles = {
        card:{
            //height:"100vh",
        },

        button:{
            background:"#7F56D9",
            width:"40%",
        },
        alert:{
            height:"3.8ch"
        },
        textfield:{
            // height:"10px"
        },
 
    }

    return(
        <div className="screen" style={styles.screen}>
            <div className="screenmain" >
                <div className="card">
                    <Card variant="" style={styles.card}>
                        <div className='hdiv'>
                            <h2>Sign Up</h2>
                            <p>We would never share your details</p>
                            {error && <Alert style={styles.alert} onClose={alertClose} className='alertbox' severity={severity}>{error}</Alert>}
                        </div>
                        <form className='mainform' onSubmit={handleSubmit}>
                            <FormControl style={styles.textfield} className='forminput' >
                                <TextField  inputRef={firstnameRef} required = {true} id="outlined-basic" label="Firstname" variant="outlined" />
                                <FormHelperText id="my-helper-text">Your Firstname</FormHelperText>
                            </FormControl>

                            <FormControl style={styles.textfield} className='forminput' >
                                <TextField  inputRef={lastnameRef} id="outlined-basic" label="Lastname" variant="outlined" />
                                <FormHelperText id="my-helper-text">Your Lastname</FormHelperText>
                            </FormControl>

                            <FormControl style={styles.textfield} className='forminput' >
                                <TextField  inputRef={emailRef} type="email" required = {true} id="outlined-basic" label="Email Address" variant="outlined" />
                                <FormHelperText id="my-helper-text">We will never share your email.</FormHelperText>
                            </FormControl >

                            <FormControl style={styles.textfield} className='forminput' >
                                <TextField   inputRef={passwordRef} required={true} id="outlined-basic" type="password" label="Password" variant="outlined" />
                                <FormHelperText id="my-helper-text">Minimum of 8 characters, at least one uppercase letter, and at least one special character</FormHelperText>
                            </FormControl >

                            <FormControl style={styles.textfield} className='forminput' >
                                <TextField   inputRef={passwordConfirmRef} required={true} id="outlined-basic" type="password" label="Password confirmation" variant="outlined" />
                                <FormHelperText id="my-helper-text">Confirm your Password</FormHelperText>
                            </FormControl >
                            
                            <Button style={styles.button} variant="contained" disabled={loading} type='submit'>Submit</Button>
                        </form>          
                        <div className='loginlink' >
                            <p> Already have an account? <Link className = "link" to="/signin"> Log in </Link></p>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )


}
