     import { logout } from '../utils/auth';

     const Navbar = () => {
       const handleLogout = async () => {
         await logout();
         window.location.href = '/'; // Redirect ke login
       };

       return (
         <nav className="bg-blue-600 text-white p-4">
           <h1 className="text-lg">LMS App</h1>
           <button onClick={handleLogout} className="float-right">Logout</button>
         </nav>
       );
     };
     
export default Navbar;