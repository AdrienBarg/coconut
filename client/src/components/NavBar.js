import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UidContext } from './AppContext';


const NavBar = () => {

    const uid = useContext(UidContext);

    return (
        <nav>
            <div className="nav-container">
                <NavLink to="/">
                    <div className="logo">
                        <img src="./img/coconut_logo.png" alt="" />
                        <h1>Coconut</h1>
                    </div>
                </NavLink>
                <div className="context-nav">
                    {uid ? (
                        <NavLink to="/profil"><h4>Ma cuisine</h4></NavLink>
                    ) : (
                        <>   
                            <NavLink to='/profil/register'>
                                <h4>S'inscrire</h4>
                            </NavLink>
                            <NavLink to='/profil/login'>
                                <h4>Se connecter</h4>
                            </NavLink>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;