import { useState, useRef, useEffect } from "react";
import Quill from "quill";
import {JobCategories, JobLocations} from "../assets/assets";

function AddJob() {

    const [title, setTitle] = useState('')
    const [location, setLocation] = useState('Bangalore')
    const [category, setCategory] = useState('Programming')
    const [level, setLevel] = useState('Beginner level')
    const [salary, setSalary] = useState(0)

    const editorRef = useRef(null)
    const quillRef = useRef(null)

    useEffect(() => {
        // Initiate Quill only once
        if (!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: 'snow'
            })
        }
    }, [])

    return (
        <form className="container p-4 flex flex-col items-start w-full gap-3">
            <div className="w-full">
                <p className="mb-2">Job Title</p>
                <input type="text" placeholder="Type here" value={title} required onChange={e => setTitle(e.target.value)}
                    className="w-full max-w-lg border-2 px-3 py-2 border-gray-300 rounded" />
            </div>

            <div className="w-full max-w-lg">
                <p className="my-2">Job Description</p>
                <div ref={editorRef}>

                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
                <div>
                    <p className="mb-2">Job Category</p>
                    <select value={category} onChange={e => setCategory(e.target.value)}
                        className="w-full border-2 px-3 py-2 border-gray-300 rounded">
                        {JobCategories.map((category, index)=> (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <p className="mb-2">Job Location</p>
                    <select value={location} onChange={e => setLocation(e.target.value)}
                        className="w-full border-2 px-3 py-2 border-gray-300 rounded">
                        {JobLocations.map((location, index)=> (
                            <option key={index} value={location}>{location}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <p className="mb-2">Job Level</p>
                    <select value={level} onChange={e => setLevel(e.target.value)}
                        className="w-full border-2 px-3 py-2 border-gray-300 rounded">
                        <option value='Beginner level'>Beginner level</option>
                        <option value='Intermediate level'>Intermediate level</option>
                        <option value='Senior level'>Senior level</option>
                    </select>
                </div>
            </div>

            <div>
                <p className="mb-2">Job Salary</p>
                <input type="number" placeholder="0" value={salary} required min={0} onChange={e => setSalary(e.target.value)}
                    className="w-full border-2 px-3 py-2 border-gray-300 rounded sm:w-[120px]" />
            </div>

            <button className="w-30 bg-green-600 text-white py-2 mt-4 cursor-pointer rounded">
                Post Job
            </button>
        </form>
    )
}

export default AddJob