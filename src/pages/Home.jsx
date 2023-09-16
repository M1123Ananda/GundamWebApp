import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export default function Home(props) {

    let navigate = useNavigate();
    const [gardens, setGardens] = useState([]);
    const [data, setData] = useState({});

    const handleAdd = () => {
        let path = `/map`;
        navigate(path);
    }

    const handleRemove = (index) => {
        const updatedGardens = [...gardens];
        updatedGardens.splice(index, 1);
        setGardens(updatedGardens);
        props.setGardens(updatedGardens);
    }

    const handleToDisplay = () => {
        let path = '/display';
        navigate(path);
    }

    useEffect(() => {
        fetchData();
        setGardens(props.gardens);
    }, [])


    async function fetchData() {
        try {
          const response = await fetch('http://localhost:3080/data');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          console.log(data);

          const p_data = JSON.parse(data.message)
          setData(p_data);

          return p_data;
        } catch (error) {
          console.error('Error fetching data:', error);
          throw error; // Re-throw the error for the caller to handle
        }

       // setData({message: '\n\n{\n  "crop": "Thai Jasmine Rice",\n  "recommended_op": "rotation to prevent nutrient depletion."\n\n}'});

     //   return true; 
      }
      

    

    return (
        
        <div>
            <h1 className="text-left font-bold text-xl w-full mb-2">Home</h1>
            <p className="text-m mb-4">
                ชื่อไร่: ไร่ในฝัน
            </p>
            <p className="mb-2">
                <button onClick={handleAdd}>
                    <img className="inline mr-1" src="assets/Add_round_fill.png" />
                </button>
                เพิ่มสวน
            </p>
            <div className="mb-4">
                {gardens.map((garden, index) => (
                    <div className="ml-10 mb-2 text-sm h-16" key={index} >
                        <span onClick={handleToDisplay}>
                            สวน {garden.name}
                            <img className="inline h-full ml-5" src="assets/big_heat_map.jpg" />
                        </span>
                        <button onClick={() => handleRemove(index)}>
                            <img className="inline h-1/6 ml-5" src="assets/Close_round_light.svg" />
                        </button>
                    </div>
                ))}
            </div>
            <div>


                    {Object.keys(data).length === 0 ? (
                       
                       <div>
                       <p> loading </p>
                      
                      </div>
                    ) :
                    (
                       //<p> {JSON.stringify(data)} </p>
                       <div>
                       
                       <p> Crop: {data.crop}</p>
                       <p>Recommended Ratios:</p>
                       <ul>
                         <li>Nitrogen (N): {data.recommended_ratios.N}</li>
                         <li>Phosphorus (P): {data.recommended_ratios.P}</li>
                         <li>Potassium (K): {data.recommended_ratios.K}</li>
                       </ul>
                       <p>Nutrient Improvement Recommendations:</p>
                       <ul>
                         <li>Nitrogen (N): {data.nutrient_improvement_recommendations.N}</li>
                         <li>Phosphorus (P): {data.nutrient_improvement_recommendations.P}</li>
                         <li>Potassium (K): {data.nutrient_improvement_recommendations.K}</li>
                       </ul>
                       <p>Other Recommendations:</p>
                       <ul>
                         {data.other_recommendations.map((recommendation, index) => (
                           <li key={index}>{recommendation}</li>
                         ))}
                       </ul>
                     </div>
                        
                        

                        
                    )

                    }

                
            </div>
        </div>
    )
}