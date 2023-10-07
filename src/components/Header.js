import React, {useContext, useEffect, useState} from 'react';
import {SidebarContext} from "../contexts/SidebarContext";
import {B} from 'react-icons/bs';
import {BsBag} from 'react-icons/bs';
import Logo from '../img/logo.svg';
import {Link} from "react-router-dom";
import {CartContext} from "../contexts/CartContext";

const Header = () => {
  const {isOpen,setIsOpen} = useContext(SidebarContext)
  const {itemAmount,totalItems} = useContext(CartContext);
  const [isActive,setIsActive] = useState(false);
  useEffect(()=>{
      window.addEventListener('scroll',()=> {
          window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
      })
  })
  return (
      <header className={`${isActive?'bg-white py-4 shadow-md':'bg-none py-6'} fixed w-full z-10 transition-all duration-300 `}>
            <div className={'container mx-auto flex items-center justify-between h-full'}>
              <Link to={'/'}>
                <div>
                  <img src={Logo} alt={'logo'} className='w-[40px]'/>
                </div>
              </Link>
              <div className={"cursor-pointer flex relative"} onClick={() => setIsOpen(!isOpen)}>
                    <BsBag className={"text-2xl"}/>
                  <div className={'bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center'}>
                    {totalItems}
                  </div>
              </div>
            </div>
      </header>
)

};

export default Header;
