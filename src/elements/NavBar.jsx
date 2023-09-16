import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function NavBar() {

    let navigate = useNavigate();

    const goToHome = () => {
        let path = '/';
        navigate(path);
    }

    return (
        <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4">
            <ul className="flex justify-center">
                <button className="mx-4" onClick={goToHome}><img src="assets/Home_fill.svg"/></button>
                <button className="mx-4" ><img src="assets/world_2.svg"/></button>
                <button className="mx-4" ><img src="assets/Time_progress_duotone_line.svg"/></button>
            </ul>
        </div>
    )
}