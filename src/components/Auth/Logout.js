import React, { useRef } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Logout = () => {

const navigate = useNavigate()
const existDialog = useRef()
const { isLoggedIn } = this.state;

const handleLogout = (e) => {
    e.preventDefault()
    
    if (isLoggedIn) {
        window.localStorage.clear()
        .then(navigate("/login"))
    } else {
        existDialog.current.showModal()
    }}

return (
    <main className="container--logout">
        {/* <dialog className="dialog dialog--auth" ref={existDialog}>
            <div>User is not logged in</div>
            <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
        </dialog> */}
       

        <button onClick={event => {
            event.preventDefault()
            handleLogout()}}>Logout</button>

</main>
)
}