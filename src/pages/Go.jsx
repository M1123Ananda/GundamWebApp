import { Link } from 'react-router-dom';

export default function Go() {

    return (
    <div className="flex justify-center items-center h-screen">
        <div className="text-center">
            <Link
                to="/prototype" // This path should match the route you set up in App.js
                className="bg-blue-500 hover:bg-blue-700 text-white text-4xl font-bold py-2 px-4 rounded-full"
            >
                Click me!
            </Link>
        </div>
    </div>
    )
}