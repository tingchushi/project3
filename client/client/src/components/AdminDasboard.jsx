import { useState } from 'react';
import { useNavigate } from "react-router-dom"
import {SidebarMenu} from 'react-bootstrap-sidebar-menu';

function AdminDashboard() {

    return (
        <>

<SidebarMenu>
<SidebarMenu.Header>
<SidebarMenu.Brand>
      keofk
    </SidebarMenu.Brand>
    <SidebarMenu.Toggle />
</SidebarMenu.Header>
<SidebarMenu.Body>
<SidebarMenu.Nav>
<SidebarMenu.Nav.Link>
       <SidebarMenu.Nav.Icon>
           icon 
         </SidebarMenu.Nav.Icon>
         <SidebarMenu.Nav.Title>
          item 
        </SidebarMenu.Nav.Title>
        <SidebarMenu.Sub>
      <SidebarMenu.Sub.Toggle>
        <SidebarMenu.Nav.Icon />
        <SidebarMenu.Nav.Title>
          item xx
        </SidebarMenu.Nav.Title>
      </SidebarMenu.Sub.Toggle>
      <SidebarMenu.Sub.Collapse>
        <SidebarMenu.Nav>
          <SidebarMenu.Nav.Link>
            <SidebarMenu.Nav.Icon>
             icon x
            </SidebarMenu.Nav.Icon>
            <SidebarMenu.Nav.Title>
              item x
            </SidebarMenu.Nav.Title>
          </SidebarMenu.Nav.Link>
        </SidebarMenu.Nav>
      </SidebarMenu.Sub.Collapse>
    </SidebarMenu.Sub>
</SidebarMenu.Nav.Link>
</SidebarMenu.Nav>
</SidebarMenu.Body>
</SidebarMenu>
        </>
        )
    }
  
  export default AdminDashboard;
  

  
 
  
 

  

  // <SidebarMenu.Body/>