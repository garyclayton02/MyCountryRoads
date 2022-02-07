import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"
// import { Logout } from "../Auth/Logout"

export const NavBar = (props) => {
    return (
        
            <ul className="NavBar bg-dark text-white flex-md-nowrap p-0 shadow">
                <li className="navbar_item active">
                    <Link className="navbar_link" to="/posts">  Posts  </Link>
                </li>

    


            </ul>
            
        

    )
}