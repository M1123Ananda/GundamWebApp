import { useNavigate } from "react-router-dom";

export default function Display() {

    let navigate = useNavigate();

    const handleToResults = () => {
        let path = '/results'
        navigate(path);
    }

    const handleBack = () => {
        let path = '/';
        navigate(path);
    }

    return (
        <div className="m-2 mb-20">
            <button className="h-8 w-8" onClick={handleBack}>
                <img className="h-full w-full" src="assets/Back.svg" />
            </button>
            <p className="text-m mb-4">
                สถานะ: กำลังปรับปรุง
            </p>
            <h1 className="text-left font-bold text-xl w-full mb-4">
                Heatmap: N
            </h1>
            <div className="flex justify-center">
                <img className="mb-5" src="assets/heat_map_conc.jpg" />
            </div>
            <div className="shadow-md shadow-slate-200 border border-black text-left rounded-xl p-2">
                <h1 className="font-bold">
                    ข้อสรุปโดยภาพรวม
                </h1>
                <p className="w-full">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className="text-right text-blue-900">
                    <button className="font-bold" onClick={handleToResults}>
                        ข้อมูลเพิ่มเติม
                    </button>
                </div>
            </div>
        </div>
    )
}