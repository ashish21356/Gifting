const Footer =()=>{
 return(
    <div>
        {/* Footer */}
      <footer className="mt-6 p-4 bg-gray-100 text-center text-gray-600 text-sm rounded-b-xl">
        <p>&copy; {new Date().getFullYear()} Restaurant App. All rights reserved.</p>
        <div className="mt-2">
          <a href="#" className="mx-2 hover:text-gray-900">About Us</a>
          <a href="#" className="mx-2 hover:text-gray-900">Contact</a>
          <a href="#" className="mx-2 hover:text-gray-900">Privacy Policy</a>
        </div>
      </footer>
    </div>
 )   
}

export default Footer;