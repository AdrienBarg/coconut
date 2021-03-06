import React, { useContext } from 'react';
import Log from '../components/Log';
import { UidContext } from '../components/AppContext';


const Profil = () => {

    const uid = useContext(UidContext);
    

    return (
        <>
        
        <div className="profil-page">
            {uid ? (
                <>
                <div className="custom-header">
     
                </div>
                </>
            ) : (
                <div className="log-container">
                    <Log signin={true} signup={false} />                       
                </div>
            )}
        </div>
        </>
    );
};

export default Profil;