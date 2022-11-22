import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar,NavItem,Nav,Collapse,NavbarToggler,NavLink} from 'reactstrap';
import React, { useState } from 'react';


function NavbarFooterDiv(){
    const[click,noRefCheck]=useState(0);
    //console.log(click);
    return(
            <div>
                <Navbar expand="md" className='bg-dark text-white' fixed="bottom">
                    <NavbarToggler onClick={() => noRefCheck( click+1)} />
                    <Collapse navbar style={{marginLeft:"50px"}}>
                    <Nav className="me-auto" navbar>
                        <NavItem >
                        <NavLink className='text-white'>
                            關於Stylish
                        </NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink  className='text-white'>
                            服務條款
                        </NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink  className='text-white'>
                            隱私政策
                        </NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink  className='text-white'>
                            聯絡我們
                        </NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink  className='text-white'>
                            FAQ
                        </NavLink>
                        </NavItem>
                        
                    </Nav>
                    <Nav navbar>
                        <NavItem style={{marginRight:"10px"}}>
                        <img src="line.png" alt="shop cart button"  />
                        </NavItem>
                        <NavItem style={{marginRight:"10px"}}>
                            <img src="twitter.png" alt="member button"  />
                        </NavItem>
                        <NavItem style={{marginRight:"10px"}}>
                        <img src="facebook.png" alt="member button"  />
                        </NavItem>
                    </Nav>
                    </Collapse>
              </Navbar>
            </div>
    )
  }


  export default NavbarFooterDiv;