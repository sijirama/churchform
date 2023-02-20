import { Card, Button, Alert} from '@mui/material';
import React, {  useState } from "react"
import './dashboard.scss'
import { useAuth } from "../../context/AuthContext.jsx"
import {useNavigate} from "react-router-dom"


export default function Dashboard(){
    const navigate = useNavigate()
    const [loading , setLoading ] = useState(false)
    const [error , setError] = useState("")
    const { logout, currentUser } = useAuth()
    const [severity, setSeverity] = useState("")
    
    async function handleSubmit (e)  {
        e.preventDefault()

        try {
            setError("")
            setLoading(true)
            await logout()
            setSeverity("success") 
            setError("")
            navigate('/signin')
        } catch (error) {
            setError("")
            setSeverity("error")
            setError("Failed to sign you out")
            navigate('/signin')
        }
        setLoading(false)
    }

    //NOTE: add link to add event page
    function handleEventSubmit(){
        navigate('/event')
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
            width:"70%",
        },
        textfield:{
           margin:"20px"
        },
 
    }

    return(
        <div className="screen" style={styles.screen}>
            <div className="leftscreen forgotpasswordleftscreen" >
                <div className="card">
                    <Card variant="" style={styles.card} className ="dashboardcard" >
                        <div className='hdiv'>
                            <h2>Dashboard</h2>
                            <p>Welcome to your Dashboard</p>
                            {error && <Alert style={styles.alert} onClose={alertClose} className='alertbox' severity={severity}>{error}</Alert>}
                            <p>Email: {currentUser && currentUser.email}</p>
                        </div>                        
        <div className="buttons">
            
       
                            <Button className='formbutton' onClick={handleSubmit} style={styles.button} variant="contained" disabled={loading} type='submit'>Sign Out</Button>
                            <Button className='eventbutton' onClick={handleEventSubmit} style={styles.button} variant="contained" disabled={loading} type='submit'>Add Event</Button>
 </div>
                    </Card>
                </div>
            </div>
        </div>
    )}
