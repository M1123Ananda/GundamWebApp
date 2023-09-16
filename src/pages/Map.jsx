import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function Map(props) {

    let navigate = useNavigate();

    const [name, setName] = useState('');
    const [area, setArea] = useState('');
    const [type, setType] = useState('');

    const handleName = (e) => {
        setName(e.target.value);
    }

    const handleArea = (e) => {
        setArea(e.target.value);
    }

    const handleType = (e) => {
        setType(e.target.value);
    }

    const handleAdd = () => {
        let newGarden = {
            name: name,
            area: area,
            type: "มันสำปะหลัง"
        }

        props.setGardens([...props.gardens, newGarden]);

        let path = `/`;
        navigate(path);
    }

    return (
        <div className="m-2 mb-20">
            <div className="mb-2">
                <div className='mb-5 flex justify-center items-center'>
                    <span className="text-m">
                        ชื่อสวน:
                    </span>
                    <input
                        className="flex-grow ml-1 px-4 py-1 text-m border border-solid shadow outline-none rounded-l text-left"
                        type="text"
                        value={name}
                        onChange={handleName}
                        placeholder="..."
                    />
                </div>
                <div className='mb-5 flex justify-center items-center'>
                    <span className="text-m w-36">
                        ขนาดพื้นที่ (ตร.วา):
                    </span>
                    <input
                        className="flex-grow min-w-0 ml-1 px-4 py-1 text-m border border-solid shadow outline-none rounded-l text-left"
                        type="text"
                        value={area}
                        onChange={handleArea}
                        placeholder="..."
                    />
                </div>
                <div className='mb-5 flex items-center'>
                    <span className="text-m">
                        ชนิดพืช:
                    </span>
                    {/* <input
                        className="flex-grow ml-1 px-4 py-1 text-m border border-solid shadow outline-none rounded-l text-left"
                        type="text"
                        value={type}
                        onChange={handleType}
                        placeholder="..."
                    /> */}
                    <span className="text-m ml-1">
                        มันสำปะหลัง
                    </span>
                </div>
            </div>
            <div className="flex justify-center">
                <img className="mb-5 rounded-2xl shadow-md shadow-slate-300" src="assets/farm_map.jpg" />
            </div>
            <div className="text-center">
                <button className="border border-black shadow-md shadow-slate-300 rounded-2xl px-5 py-1" onClick={handleAdd}>เพิ่มสวน</button>
            </div>
        </div>
    )
}