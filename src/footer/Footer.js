import "./Footer.scss"
const Footer=()=>{
    return(
        <footer className="footer">
             <ul className="footer__nav">
                <li className="footer__nav_item"><a href="#" className="footer__nav_link">Find your meal</a></li>
                <li className="footer__nav_item"><a href="#" className="footer__nav_link">Request proposal</a></li>
                <li className="footer__nav_item"><a href="#" className="footer__nav_link">Download our menu</a></li>
                <li className="footer__nav_item"><a href="#" className="footer__nav_link">Contact us</a></li>
                <li className="footer__nav_item"><a href="#" className="footer__nav_link">Submit your reviews</a></li>
                <li className="footer__nav_item"><a href="#" className="footer__nav_link">Come work with us!</a></li>
            </ul>
            <p className="copyright">
                &copy; Copyright 2022 by ADIB BENSMINA .React and Firebase
            </p>
        </footer>
    )

}
export default Footer;