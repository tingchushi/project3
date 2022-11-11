import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { React } from "react"
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBInput,
    MDBIcon,
    MDBCheckbox
}
    from 'mdb-react-ui-kit';
function EditPassword() {
    const [passMatch, setPassMatch] = useState(true);
    const [state, setState] = useState({
        oPassword: "",
        nPassword: "",
        cPassword: ""
    });
    const [msg, setMsg] = useState(' ')
    const [passVal, setPassVal] = useState(' ')
    const [userRole, setUserRole] = useState('')
    const navigate = useNavigate();


    const info = JSON.parse(localStorage.getItem('token'));

    const id = info.token;
    useEffect(() => {
        fetch(`http://localhost:3000/api/all/${id}`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                setUserRole(data.role)
                console.log(userRole)

            });
    }, [])

    useEffect(() => {
        validatePassword();
    }, [state]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [id]: value,

        }));

        function checkPasswordValidation(value) {
            const isWhitespace = /^(?=.*\s)/;
            if (isWhitespace.test(value)) {
                return "Password must not contain Whitespaces.";
            }


            const isContainsUppercase = /^(?=.*[A-Z])/;
            if (!isContainsUppercase.test(value)) {
                return "Password must have at least one Uppercase Character.";
            }


            const isContainsLowercase = /^(?=.*[a-z])/;
            if (!isContainsLowercase.test(value)) {
                return "Password must have at least one Lowercase Character.";
            }


            const isContainsNumber = /^(?=.*[0-9])/;
            if (!isContainsNumber.test(value)) {
                return "Password must contain at least one Digit.";
            }


            const isContainsSymbol =
                /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])/;
            if (!isContainsSymbol.test(value)) {
                return "Password must contain at least one Special Symbol.";
            }

            const isValidLength = /^.{8,16}$/;
            if (!isValidLength.test(value)) {
                return "Password must be 10-16 Characters Long.";
            }
        }
        console.log(state.nPassword)
        setPassVal(checkPasswordValidation(state.nPassword));
    };

    const validatePassword = () => {
        if (state.nPassword === state.cPassword) {
            setPassMatch(true)
        } else {
            setPassMatch(false);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // console.log(event.target)
        console.log(state)
        // const data = Object.fromEntries(new FormData(event.target));
        // console.log(data)

        fetch(`http://127.0.0.1:3000/api/password/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(state),
        })
            .then((response) => {
                // if (!response.ok) {
                //     throw new Error('Bad status code from server.');
                // }
                if (response.status !== 200) {
                    setMsg('Password Cannot Be Changed')
                    alert("Invalid Information")
                }
                console.log(response.status)
                return response.json();
            })

            .then((data) => {
                if (data.msg) {
                    setMessage(data.msg);
                } else {
                    navigate("/");
                    alert("You have sucessfully changed password!")
                }
            });
    };

    function SubmitButton() {
        if (state.oPassword && state.nPassword && state.cPassword) {
            if (state.cPassword === state.nPassword) {
                return <button className="mb-4 px-5" color='dark' size='lg'>Change</button>
            } else {
                return <button type="button" disabled className="mb-4 px-5" color='dark' size='lg'>Change</button>
            }
        } else {
            return <button disabled variant="dark">Fill Fields</button>
        };
    };

    return (
        <>
            <form method="post" onSubmit={handleSubmit}>
                <fieldset>
                    <MDBContainer fluid>
                        <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Change Password</p>
                                        <label>
                                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '3vh'}}>
                                            Old Password
                                                
                                                <MDBIcon fas icon="lock me-3" size='lg' />
                                                <MDBInput id='oPassword' type='password' value={state.oPassword} onChange={handleChange} />
                                            </div>
                                        </label>
                                        <label>
                                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '3vh'}}>
                                            New Password
                                                <MDBIcon fas icon="key me-3" size='lg' />
                                                <MDBInput id='nPassword' type='password' value={state.nPassword} onChange={handleChange} />
                                            </div>
                                        </label>
                                        <label>
                                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '3vh'}}>
                                            Repeat Password
                                                <MDBIcon fas icon="key me-3" size='lg' />
                                                <MDBInput id='cPassword' type='password' value={state.cPassword} onChange={handleChange} />
                                            </div>
                                        </label>
                                        <div className="input-error">
                                            {state.password !== state.cPassword ? "" : ""}
                                        </div>
                                        <div className="input-error" style={{ color: "red" }}>
                                            {passMatch ? "" : "Error: Passwords do not match"}
                                            <br />
                                            {passVal}
                                        </div>
                                        <div style={{color: "red"}}>{msg}</div>
                                        <SubmitButton className="mb-4 px-5" color='dark' size='lg' /> 
                        </MDBCard>
                    </MDBContainer>
                </fieldset>
            </form>

        </>
    )
}




export default EditPassword