"use client"
import { useEffect, useState } from 'react';
import { IoMdClose } from "react-icons/io";

const PlanCard = ({ id, name, resolution, monthly_price, video_quality, supported_devices, simultaneous_streams, download_devices, isPopular, selected }) => {


    return (
        <div className={`flex flex-col cursor-pointer  border rounded-lg shadow-md p-2 m-4 ${isPopular ? 'border-red-500' : 'border-gray-300'} ${id==selected ? 'shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] border border-red-400' : ''}`} >
            <div className="flex text-white p-5 justify-between h-24 bg-[#2B54B9] rounded-lg items-center">
                <div>
                    <h2 className="text-2xl font-normal">{name}</h2>
                    <p className="text-lg ">{resolution}</p>
                </div>
                {isPopular && <span className="bg-red-500 text-white text-sm px-2 py-1 rounded">Most Popular</span>}
            </div>
            <div className="mt-4">
                <div className='border border-transparent m-5 pb-5 border-b-gray-500/55'>
                    <p className="font-semibold text-sm text-black/60">Monthly price:</p>
                    <p> Rs {monthly_price}</p>

                </div>
                <div className='border border-transparent m-5 pb-5 border-b-gray-500/55'>
                    <p className="font-semibold text-sm text-black/60">Video and sound quality:</p>
                    <p> {video_quality}</p>

                </div>
                <div className='border border-transparent m-5 pb-5 border-b-gray-500/55'>
                    <p className="font-semibold text-sm text-black/60">Resolution:</p>
                    <p> {resolution}</p>

                </div>
                <div className='border border-transparent m-5 pb-5 border-b-gray-500/55'>
                    <p className="font-semibold text-sm text-black/60">Supported devices:</p>
                    <p> {supported_devices}</p>

                </div>
                <div className='border border-transparent m-5 pb-5 border-b-gray-500/55'>
                    <p className="font-semibold text-sm text-black/60">Devices your household can watch at the same time:</p>
                    <p> {simultaneous_streams}</p>

                </div>
                <div className='border border-transparent m-5 pb-5 border-b-gray-500/55'>
                    <p className="font-semibold text-sm text-black/60">Download devices:</p>
                    <p> {download_devices}</p>

                </div>




            </div>
        </div>
    );
};

const PlanSelection = ({handlePlan}) => {
    const [selected, setSelected] = useState(0);
    const [alert, setAlert] = useState(false);
    const [plans,setPlans]=useState([]);
    

    useEffect(() => {
        fetchPlans();
    }, []);

    useEffect(() => {
        console.log('Plans state updated:', plans.data);
    }, [plans]); // Log whenever `plans` state updates

    const fetchPlans = async () => {
        try {
            const response = await fetch(`/api/plans`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
              }
            const data = await response.json();
              setPlans(data.data);

            console.log(data);
            console.log(plans);

        } catch (error) {
            console.log(error.message);
        }
    };
    const handleGetStarted = () => {
        if (!selected) {
            setAlert(true);
        }
        else
        {
            handlePlan(selected);
        }
    }

    const plans1 = [
        {
            id: 1,
            title: 'Mobile',
            resolution: '480p',
            price: 250,
            quality: 'Fair',
            supportedDevices: ['Mobile phone', 'Tablet'],
            simultaneousDevices: 1,
            downloadDevices: 1
        },
        {
            id: 2,
            title: 'Basic',
            resolution: '720p',
            price: 450,
            quality: 'Good',
            supportedDevices: ['TV', 'Computer', 'Mobile phone', 'Tablet'],
            simultaneousDevices: 1,
            downloadDevices: 1
        },
        {
            id: 3,
            title: 'Standard',
            resolution: '1080p',
            price: 800,
            quality: 'Great',
            supportedDevices: ['TV', 'Computer', 'Mobile phone', 'Tablet'],
            simultaneousDevices: 2,
            downloadDevices: 2
        },
        {
            id: 4,
            title: 'Premium',
            resolution: '4K + HDR',
            price: 1100,
            quality: 'Best',
            supportedDevices: ['TV', 'Computer', 'Mobile phone', 'Tablet'],
            simultaneousDevices: 4,
            downloadDevices: 6,
            isPopular: true
        }
    ];

    return (
        <div className="flex flex-col justify-center items-center animate-slide-in-right  m-8">
            <div className={`mt-5 p-4 mb-4 flex flex-row justify-center items-center text-base text-white font-semibold rounded-lg bg-red-500    animate-fade-in-down ${alert ? 'block' : 'hidden'}`} role="alert">
                <span className="font-medium">Alert!</span> Please Select the Pacakage
                <span className="ml-10 cursor-pointer">
                    <IoMdClose onClick={(e) => setAlert(false)} color="black" size={25} />
                </span>
            </div>

            <div className="flex flex-row justify-center ">
                {plans.length && plans.map((plan, index) => (
                    <div onClick={() => { setSelected(plan.id) }}> <PlanCard key={index} {...plan} selected={selected} /></div>
                ))}
            </div>
            <button
                onClick={handleGetStarted}
                className="text-white text-xl h-16 text-center bg-red-500 w-1/3 rounded-lg font-semibold hover:bg-red-500/85 "
            >
                Get Started
            </button>
        </div>
    );
};

export default PlanSelection;
