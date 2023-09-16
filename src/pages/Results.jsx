import { useNavigate } from "react-router-dom";

export default function Results() {

    let navigate = useNavigate();

    const handleBack = () => {
        let path = '/display';
        navigate(path);
    }

    return (
        <div className="m-2">
            <button className="h-8 w-8" onClick={handleBack}>
                <img className="h-full w-full" src="assets/Back.svg"/>
            </button>
            <div className="text-center mb-4">
                <p className="mt-12 font-bold text-xl">
                    พื้นที่บริเวณที่ 1 (Heatmap 1)
                </p>
                <p>
                    สรุปผลสำหรับการปลูก มันสำปะหลัง
                </p>
            </div>
            <div className="flex mb-4">
                <div className="w-1/2 h-200 mx-1 border border-black rounded-md text-center text-sm shadow-md shadow-slate-300">
                    <p className="mt-2 mb-2">pH: 5.7</p>
                    <p className="mb-2">N: 30%</p>
                    <p className="mb-2">P: 50%</p>
                    <p className="mb-2">K: 10%</p>
                </div>
                <div className="w-1/2 h-200 mx-1 border border-black rounded-md text-center text-sm shadow-md shadow-slate-300">
                    <p className="mt-2 mb-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>
            </div>
            <div className="border border-black rounded-md text-left text-sm p-2 shadow-md shadow-slate-300">
                <h1 className="font-bold">ข้อแนะนำ</h1>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
            </div>
        </div>
    )
}