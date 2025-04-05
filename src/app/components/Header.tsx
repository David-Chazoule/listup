import React from 'react'
import Image from 'next/image'
import logo from "../../styles/img/listupLogo.png"
import styles from "../../styles/header.module.scss"

function Header() {
  return (
    <div className={styles.header_container}>
     <Image src={logo} className={styles.logo} alt="logo" />


    </div>
  )
}

export default Header