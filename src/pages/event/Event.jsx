import React, { useEffect, useState , useRef} from 'react'
import { Card, FormControl, FormHelperText  , TextField , Button, Alert} from '@mui/material';
import { DateTimePicker, DatePicker } from '@mui/x-date-pickers';
import {LocalizationProvider} from "@mui/x-date-pickers"
import TextareaAutosize from '@mui/base/TextareaAutosize'
import  {AdapterDayjs}  from '@mui/x-date-pickers/AdapterDayjs';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import {useNavigate} from 'react-router-dom'
import {useAuth} from '../../context/AuthContext'
import { addDoc,collection } from 'firebase/firestore'
import { storage } from '../../context/firebase';
import {database} from '../../context/firebase'
import './event.scss'

//WARN:
//import dayjs from 'dayjs';
//import customParseFormat from 'dayjs/plugin/customParseFormat';
//import dayjsIsBetween from 'dayjs/plugin/isBetween';

const initialState = {
    title:"",
    datetime:{},
    description:"",
    //imgUrl will be added later
}

const Event = () => {
    const [form,setForm] = useState(initialState)
    const {title, datetime , description} = form
    const [file,setFile] = useState(null)
    const [progress , setProgress] = useState(null)
    //const [added, setAdded] = useState(false)
    const { currentUser} = useAuth()
    const navigate = useNavigate()
    //WARN:
    const titleRef = useRef()
    const datetimeRef = useRef()
    const descriptionRef = useRef()




    useEffect(() => {
        const uploadFile = () => {
            const storageref = ref(storage , file.name)
            const uploadTask = uploadBytesResumable(storageref , file)

            uploadTask.on('state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                setProgress(progress)

                switch(snapshot.state){
                    case "paused":
                        console.log('Paused')
                        break
                    case "running":
                        console.log("Running")
                        break
                    default:break
                }
            },(error) => {
                console.log(error)
            },() => {
                getDownloadURL(uploadTask.snapshot.ref).then((downaloadUrl) => {
                    setForm((prev) => ({ ...prev, imgUrl:downaloadUrl}))
                    //setAdded(true)
                })})}

        file && uploadFile()
        console.log(form)
        //console.log(datetime.$d)
    }, [file, datetime])

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("submitted")

        if(title && description && datetime){
        try {
            await addDoc(collection(database, "events"),{
              ...form,
              userId : currentUser.email
            })
        }catch(error){
            console.log(error)
        }
        }
        navigate("/")
    }


    const handleChange = (e) => {
        e.preventDefault()
        setForm({ ...form, [e.target.name]: e.target.value });
        console.log(form)
    };

    return (

        <div className='eventAddpage'>
            <div className='eventAddwrapper'>
                <form onSubmit={handleSubmit} className='eventform'> 
                    
                    <FormControl className='forminput' >
                        <TextField  
                        value={title}
                        onChange={handleChange}
                        name="title"
                        type="text" required = {true} 
                        id="outlined-basic" 
                        label="Title" 
                        variant="outlined" />
                        <FormHelperText id="my-helper-text">Add a Title for the Event</FormHelperText>
                    </FormControl >

                    <FormControl className='forminput' >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="DateTimePicker"
                            name="datetime"
                            value={datetime}
                            onChange={(datetime) => setForm({ ...form, datetime})}
                            />
                        </LocalizationProvider>
                        <FormHelperText id="my-helper-text">Pick a Date and Time</FormHelperText>
                    </FormControl >

                    <FormControl className='forminput' >
                        <TextareaAutosize
                        value={description}
                        onChange={handleChange}
                        name="description"
                        placeholder="Event description"
                        />
                        <FormHelperText id="my-helper-text">Give the Event a Description</FormHelperText>
                    </FormControl >

                    <Button
                          variant="contained"
                          className="eventButton"
                          component="label"
                        >
                        {
                            file?("Image Added"):("Upload an Image")
                        }
                        <input 
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        hidden />
                    </Button>
                    
                     <Button
                        disabled = {progress !== null && progress < 100}
                        variant="contained"
                        className="eventButton"
                        //component="label"
                        type='submit'
                        >
                        Submit
                    </Button>

                </form>
            </div>
        </div>
    )


































}

export default Event
