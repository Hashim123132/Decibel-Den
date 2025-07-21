import Link from "next/link"
import { AiFillLinkedin, AiOutlineGithub } from "react-icons/ai"
//icons on footer
const Footer = () => {
  return (
    <div className="footer-container">
      <p>2025 All Rights Reserved</p>
      <div className="flex">

          <Link  href='https://www.linkedin.com/in/hashimumar/'>
              
              <p className="icons">
                <AiFillLinkedin  />
              </p>
          </Link>

          <Link href='https://github.com/Hashim123132'> 
          <p className="icons">

            <AiOutlineGithub/>
          </p>
          </Link>
      </div>

    

    </div>
  )
}
export default Footer