"use client";
import { useEffect, useState } from "react";
import { IoLockOpen, IoLockClosed, IoPencil } from "react-icons/io5";
import PinCode from "../components/pinCode";
import { useRouter } from 'next/navigation';
import { IoMdClose } from "react-icons/io";

const Screens = () => {
    const router = useRouter();
    const [screens, setScreens] = useState([]);
    const [pinCode, setPinCode] = useState(false);
    const [inputPinCode, setInputPinCode] = useState(null);
    const [screenPin, setScreenPin] = useState(null);
    const [editScreen, setEditScreen] = useState(null); // State to track the screen being edited
    const profileImages = [
        "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png",
        "https://wallpapers.com/images/hd/netflix-profile-pictures-5yup5hd2i60x7ew3.jpg",
        "https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg",
        "https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-dyrp6bw6adbulg5b.jpg"
    ];

    useEffect(() => {
        fetchScreen();
    }, []);

    useEffect(() => {
        console.log(screens);
    }, [screens]);

    const handleInputPin = (code) => {
        console.log(code);
        setInputPinCode(code);
        console.log(screenPin);
        const p = screenPin.screen_password;
        if (code === p) {
            console.log("hi");
            redirect(screenPin);
        }
    };
    const handleClosePin=()=>{
        setPinCode(false);
    }
    const redirect = (s) => {
        const data = JSON.parse(localStorage.getItem('data'));
        const newData = { screenId: s.id };
        const userData = { ...data, ...newData };
        console.log(userData);
        localStorage.setItem('data', JSON.stringify(userData));
        const token=userData.token;
        const screenId=userData.screenId;
        router.push(`/browse?token=${token}&screenId=${screenId}`
        );
    };

    const fetchScreen = async () => {
        const userData = JSON.parse(localStorage.getItem('data'));
        console.log(userData.token);
        try {
            const response = await fetch(`/api/screens?userId=${userData.userId}`, {
                headers: {
                    'Authorization': `Bearer ${userData.token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                console.log("error occurred");
                throw new Error(error.message);
            }
            const data = await response.json();
            setScreens(data.data);
            console.log(data.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    const handlePassword = (p) => {
        setPinCode(true);
        setScreenPin(p);
    };

    const screenClick = (s) => {
        if (!s.screen_password) {
            setScreenPin(s);
            redirect(s);
        } else {
            handlePassword(s);
        }
    };

    const handleEditScreen = (screen) => {
        setEditScreen(screen);
    };

    const handleSaveEdit = () => {
       console.log(editScreen);
       handleSubmit();
    };

    const handleSubmit = async () => {
        const userData = JSON.parse(localStorage.getItem('data'));
        
        
        try {
            const response = await fetch('/api/updateScreen', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${userData.token}`
                },
                body: JSON.stringify({ id:editScreen.id, screen_name:editScreen.screen_name,screen_password: editScreen.screen_password}),
            });

            const data = await response.json();
            console.log(data);
            console.log(data.data[0].id);
            const updatedData=data.data[0];
            updateScreen(updatedData.id,updatedData.screen_name,updatedData.screen_password);

            if (response.ok) {
                alert('Screen updated successfully');
                setEditScreen(null);
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error updating screen:', error);
        }
    };

    const updateScreen = (id, newScreenName, newScreenPin) => {
        const updatedScreens = screens.map(screen => 
            screen.id === id ? { ...screen, screen_name: newScreenName, screen_pin: newScreenPin } : screen
        );
        setScreens(updatedScreens);
    };

    return (
        <>
            <div className="bg-black overflow-hidden w-screen h-screen">
                <h1 className="text-5xl text-white text-center absolute top-20 right-20 left-20">Who's Watching?</h1>
                <div className="flex w-full h-screen flex-row justify-evenly items-center text-white">
                    {screens.length && screens.map((s, index) => (
                        <div key={index} className="text-white cursor-pointer flex flex-col justify-center items-center">
                            <img
                                className="w-32 hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.9)]"
                                src={profileImages[index]}
                                alt="img"
                                onClick={() => { screenClick(s) }}
                            />
                            {editScreen && editScreen.id === s.id ? (
                                <>
                                    <input
                                        type="text"
                                        placeholder="Profile Name"
                                        className="text-center text-xl bg-gray-800 text-white rounded p-1 mt-2"
                                        value={editScreen.screen_name}
                                        onChange={(e) => setEditScreen({ ...editScreen, screen_name: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Profile Pin"
                                        maxLength="4"
                                        className="text-center text-xl bg-gray-800 text-white rounded p-1 mt-2"
                                        value={editScreen.screen_password}
                                        onChange={(e) => setEditScreen({ ...editScreen, screen_password: e.target.value })}
                                    />
                                    <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded" onClick={handleSaveEdit}>
                                        Save
                                    </button>
                                </>
                            ) : (
                                <>
                                    <p className="text-center text-xl">{s.screen_name ? s.screen_name : 'Screen' + s.screen_number}</p>
                                    <span className="opacity-45">
                                        {s.screen_password ? (
                                            <IoLockClosed size={20} color="white" onClick={() => handlePassword(s)} />
                                        ) : (
                                            <IoLockOpen size={20} color="white" />
                                        )}
                                        <IoPencil size={20} color="white" onClick={() => handleEditScreen(s)} className="ml-2" />
                                    </span>
                                </>
                            )}
                        </div>
                    ))}
                </div>
                {pinCode && <div className="w-screen  overflow-hidden h-screen"><PinCode handleClosePin={handleClosePin} handleInputPin={handleInputPin} />

                </div>}
            </div>
        </>
    );
};

export default Screens;
