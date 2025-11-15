




import { FaGooglePlay, FaAppStoreIos } from 'react-icons/fa';
import { IoQrCode } from 'react-icons/io5';
import LinkBox from '../linkbox/linkbox.jsx';

function Footer() {
   const downloadData = [
      {
        href: "",
        icon: FaAppStoreIos,
        label: "App Store"
      },
      {
        href: "",
        icon: FaGooglePlay,
        label: "Google Play"
      },
      {
        href: "",
        icon: IoQrCode,
        label: "QR Code"
      }
  ]



  return (
    <>
      <footer>
      <div className="footer-links flex justify-between items-center px-4 py-2">
        <a href="#signup" id="signup-link" className='underline'>
          Sign Up for Email List
        </a>

        <div className="flex gap-4">
            {downloadData.map((link, index) => (
                <LinkBox key={index} {...link} />
            ))}
        </div>
            
        <div className="footer-right">
          <a href="#feedback" id="feedback-link">Feedback</a>
          <a href="#privacy" id="privacy-link">Privacy</a>
        </div>

      </div>
    </footer>
    </>
  )
}

export default Footer