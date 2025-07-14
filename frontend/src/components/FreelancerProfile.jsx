import { div } from 'framer-motion/client';
import { useEffect, useState } from 'react'
import { set } from 'react-hook-form';
import { useParams } from 'react-router-dom'

const FreelancerProfile = () => {
    const { id } = useParams();
    const [freelancer, setFreelancer] = useState(null);
    const [user, setUser] = useState(null);
    useEffect(() => {
  fetch(`http://localhost:3000/freelancer/${id}`)
    .then(res => res.json())
    .then(data => {
      setFreelancer(data.freelancer);
      setUser(data.user);
    })
    .catch(err => console.error(err));
}, [id]);


    console.log(freelancer, user);
    if (!freelancer || !user) {
        return <div>Loading...</div>
    }
    return (
        <div>
            <div>Profile</div>
            <div>Hi {`${user.first_name} ${user.last_name}`}</div>
        </div>

    )
}

export default FreelancerProfile