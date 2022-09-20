import React from 'react'
import { useRouter } from 'next/router'
import { useSelector } from "react-redux";
import styles from './style.module.css'


const Profile = (props) => {
  const router = useRouter();
  const userData = useSelector((state)=> state.user);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.subContainer}>
        <div className={styles.header}>
          <h1>Profile</h1>
          <img src={userData.avatar} className={styles.avatar}/>
        </div>
        <div>
          <h3>Name: {userData.name}</h3>
          <h3>Email: {userData.email}</h3>
        </div>
      </div>
    </div>
  )
}

export default Profile