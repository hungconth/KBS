import { useEffect, useState } from "react";
import Block from "./Block";
import { title } from "process";
import axios from "axios";
import { text } from "stream/consumers";



export default function SearchInput() {
    const [textMe, setTextMe] = useState('')
    const [myArray, setMyArray] = useState<any>([])
    
    /// api check tu xem co trong tu dien khong
    const handleClickPos = async () =>{
        if(textMe==="")alert('Nhập từ.')
        else
        try{
            const response = await fetch("http://203.162.88.102:12001/kbs/check-pos/", {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ word: textMe }),
            });
        
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const data = await response.json();
            if(data.in_dict === true){
                setMyArray([...myArray, textMe])
                setTextMe('')
            }
            else{
                alert("Từ không có trong dữ liệu. Vui lòng nhập lại! (đối với danh từ riêng phải viết hoa chữ cái đầu)")
            }
            
        } catch (error) {
          console.error('Fetch error:', error);
        }
    }

    const handleDelete = (index: number) => {
        setMyArray(
            myArray.filter((item: any, idx: number) => {
                if (idx !== index) return item
            })
        )
    }


    const [param, setParam] = useState('')
    const handleSubmit = async () => {
        if(myArray.length <= 1)alert('Không đủ số từ yêu cầu, người dùng cần nhập thêm từ để thực hiện sắp xếp.')
        else{try{
            const response = await fetch("http://203.162.88.102:12001/kbs/generate-sentence/",
            {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ words: myArray }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data= await response.json();
            console.log(data)
            // setResultSubmit(data)
            var strng = ''
            for (let index = 0; index < (data.sentence.length >=2 ? 2 : data.sentence.length); index++) {
                const element = data.sentence[index];
                
                    const yourArray = element[0]
                    if(index <= 2) strng += index + '.'
                    for (let z = 0; z < yourArray.length; z++) {
                        strng += yourArray[z] + ' '
                    }               
            }
            setParam(strng)
        }
        catch(error){
            console.error("Fetch error:",error)
        }}
        
    }

    const handleDeleteAll = () =>{
        setMyArray([])
        setParam('')
    
    }
    console.log(param)
    return (

        <>

            <div className="mx-2 my-4 ">
                <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Click!!</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input value={textMe} onChange={(e: any) => setTextMe(e.target.value)}
                        className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Điền từ vào đây ....." required />
                    {/* <div onClick={() => handleAdd(textMe)} */}
                    <div onClick={() => handleClickPos()}
                        className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Click!!</div>
                </div>
            </div>
            <div className="flex flex-col mx-2">
                {
                    myArray.length > 0 ?
                        <> 
                            <ul className="flex flex-row flex-wrap">
                                {
                                    myArray.map((item: any, index: number) => (

                                        <li key={index} ><Block title={item} onDelete={handleDelete} index={index} onReset={setParam} /></li>

                                    ))
                                }

                            </ul>
                            <button type="button" onClick={handleDeleteAll}
                                className="inline-flex items-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900 w-20">
                                {/* <svg aria-hidden="true" className="w-5 h-5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg> */}
                                Delete All
                            </button>
                            <div className='flex justify-between'>
                                <div> </div>
                                <button type="button" onClick={handleSubmit}
                                    className="flex justify-center  items-center  text-white bg-blue-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-5 py-2.5 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-900 w-32 h-12 text-base">
                                    {/* <svg aria-hidden="true" className="w-5 h-5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg> */}
                                    Submit
                                </button>
                            </div>
                        </> : <></>
                }

            </div>
            {
                param !== '' ?
                <div className="m-5 border border-slate-600 border-4 rounded-md">
                    <div className="flex flex-row flex-wrap justify-center text-lg text-gray-900 md:text-xl dark:text-black font-bold">
                        {param}

                    </div>

                </div>:<></>
            }
        </>
    )
}
