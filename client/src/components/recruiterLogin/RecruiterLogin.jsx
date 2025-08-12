import { useState, useContext, useEffect } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function RecruiterLogin() {

    const navigate = useNavigate()

    const [state, setState] = useState('Login')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const [image, setImage] = useState(false)

    const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false)

    const { setShowRecruiterLogin, backendUrl, setCompanyToken, setCompanyData } = useContext(AppContext)

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        if (state == 'Sign Up' && !isTextDataSubmitted) {
            return setIsTextDataSubmitted(true)
        }

        try {
            if (state === 'Login') {
                const response = await axios.post(backendUrl + '/api/company/login', { email, password })
                console.log(response)
                if (response.data.success) {
                    setCompanyData(response.data.company)
                    setCompanyToken(response.data.token)
                    localStorage.setItem("companyToken", response.data.token)
                    setShowRecruiterLogin(false)
                    navigate('/dashboard')
                    toast.success('Login Successful')
                }
                else {
                    toast.error(response.data.message)
                }
            }
            else {
                const formData = new FormData()
                formData.append('name', name)
                formData.append('email', email)
                formData.append('password', password)
                formData.append('image', image)

                const { data } = await axios.post(backendUrl + '/api/company/register', formData)
                if (data.success) {
                    console.log(data)
                    setCompanyData(data.company)
                    setCompanyToken(data.token)
                    localStorage.setItem('companyToken', data.token)
                    setShowRecruiterLogin(false)
                    navigate('/dashboard')
                    toast.success('Registration successful')
                }
                else {
                    toast.error(data.message)
                }
            }
        }
        catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, []);

    return (
        <div className="absolute top-0 left-0 bottom-0 right-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
            <form className="relative bg-white p-10 rounded-xl text-slate-500" onSubmit={onSubmitHandler}>
                <h1 className="text-center font-medium text-2xl text-neutral-700">Recruiter {state}</h1>
                <p className="text-sm">Welcome back! Please sign in to continue</p>
                {
                    state === 'Sign Up' && isTextDataSubmitted ?
                        <>
                            <div className="flex items-center gap-4 my-10">
                                <label htmlFor="image">
                                    <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" className="w-16 rounded-full" />
                                    <input type="file" id="image" hidden onChange={e => setImage(e.target.files[0])} />
                                </label>
                                <p>Upload Company <br /> logo</p>
                            </div>
                        </>
                        :
                        <>
                            {state !== 'Login' && (
                                <div className="flex items-center border rounded-full px-4 py-2 gap-2 mt-5">
                                    <img src={assets.person_icon} alt="" className="" />
                                    <input type="text" placeholder="Company Name" value={name} onChange={e => setName(e.target.value)} required
                                        className="outline-none text-sm" />
                                </div>
                            )}
                            <div className="flex items-center gap-2 border rounded-full px-4 py-2 my-5">
                                <img src={assets.email_icon} alt="" />
                                <input type="email" placeholder="Email Id" required value={email} onChange={e => setEmail(e.target.value)}
                                    className="outline-none text-sm" />
                            </div>
                            <div className="flex items-center gap-2 border rounded-full px-4 py-2">
                                <img src={assets.lock_icon} alt="" />
                                <input type="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)}
                                    className="outline-none text-sm" />
                            </div>
                            {state === 'Login' && <p className="text-blue-600 text-sm mt-2 cursor-pointer">Forgot password?</p>}
                        </>
                }

                <button type="submit" className="w-full bg-blue-600 text-white rounded-full py-2 cursor-pointer mt-5">
                    {state === 'Login' ? 'Login' : isTextDataSubmitted ? 'Create Account' : 'Next'}
                </button>
                {
                    state === 'Login' ?
                        <p className="mt-5 text-center">Don't have an account? <span className="text-blue-600 cursor-pointer" onClick={() => setState('Sign Up')}>Sign Up</span></p>
                        :
                        <p className="text-center mt-5">Already have an account? <span className="text-blue-600 cursor-pointer" onClick={() => setState('Login')}>Login</span></p>
                }

                <img src={assets.cross_icon} alt="" className="absolute top-5 right-5 cursor-pointer" onClick={() => setShowRecruiterLogin(false)} />
            </form>
        </div>
    )
}

export default RecruiterLogin;