import { Card, FormControl, FormHelperText  , TextField , Button, Alert} from '@mui/material';
import React, { useRef , useState } from "react"
import { useAuth } from "../../context/AuthContext.jsx"
import {Link , useNavigate} from "react-router-dom"

export default function Signin(){
    const navigate = useNavigate()
    const emailRef = useRef()
    const passwordRef = useRef()
    const [loading , setLoading ] = useState(false)
    const { signinuser } = useAuth()
    const [error, setError] = useState("")
    const [severity, setSeverity] = useState("")
    
    async function handleSubmit (e)  {
        e.preventDefault()
        try {
            setError("")
            setLoading(true)
            await signinuser(emailRef.current.value, passwordRef.current.value)
            console.log(emailRef.current.value, passwordRef.current.value)
            setSeverity("success") 
            setError("Successfully Signed in")
            navigate('/')
        } catch (error) {
            setError("")
            setSeverity("error")
            setError("Failed to sign into account")
        }
        setLoading(false)
    }

    function alertClose(){
        setError("")
    }

    const styles = {
        alert:{
            height:"3.8ch"
        },
        button:{
            background:"#7F56D9",
            width:"40%",
        },
        textfield:{
            margin:"15px"
        },
 
    }

    return(
        <div className="screen" style={styles.screen}>
            <div className="leftscreen signinleftscreen" >
                <div className="card" >
                    <Card variant="" style={styles.card} className="signincard">
                        <div className='hdiv'>
                            <h2>Sign In</h2>
                            <p>Welcome back, sign in to have access to our services</p>
                            {error && <Alert style={styles.alert} onClose={alertClose} className='alertbox' severity={severity}>{error}</Alert>}
                        </div>
                        <form className='mainform signinmainform' onSubmit={handleSubmit}>

                            <FormControl style={styles.textfield} className='forminput signinforminput' >
                                <TextField  inputRef={emailRef} type="email" required = {true} id="outlined-basic" label="Email Address" variant="outlined" />
                                <FormHelperText id="my-helper-text">Your Email Address</FormHelperText>
                            </FormControl >

                            <FormControl style={styles.textfield} className='forminput signinforminput' >
                                <TextField   inputRef={passwordRef} required={true} id="outlined-basic" type="password" label="Password" variant="outlined" />
                                <FormHelperText id="my-helper-text">Your Password</FormHelperText>
                            </FormControl >
                            
                            <Button className='formbutton' style={styles.button} variant="contained" disabled={loading} type='submit'>Sign in</Button>
                        </form>          
                        <div className='loginlink signinloginlink' >
                            <p> Dont have an account? <Link className = "link" to="/signup"> Sign up </Link> </p>
                            <p> Forgot your password? <Link className = "link" to="/forgotpassword"> Click here to change </Link> </p>
                        </div>
                    </Card>
                </div>
            </div>

            <div className="rightscreen">
                <div className="picturebackground">
                </div>
            </div>
        </div>
    )
}
