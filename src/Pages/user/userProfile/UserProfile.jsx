import axios from "axios";
import { useEffect, useState } from "react";
import style from '../userProfile/profile.module.css'

export default function UserProfile() {
    const [profile, setProfile] = useState({});
    
    async function getUserProfile() {
        const token = localStorage.getItem("user token");
        try {
            const { data } = await axios.get(`https://ecommerce-node4.onrender.com/user/profile`, {
                headers: { Authorization: `Tariq__${token}` }
            });
            setProfile(data.user);
        } catch (error) {
            console.error("Failed to fetch profile:", error);
        }
    }

    useEffect(() => {
        getUserProfile();
    }, []);

    return (
        <div className="container">
            <div>
                <div >
                    <img className={`${style.border}`} src={profile.image} alt="User Profile" />
                    <h2>User Name : {profile.userName}</h2>
                </div>
                <div>
                    <h2>Email : {profile.email}</h2>
                </div>
            </div>
        </div>
    );
}


