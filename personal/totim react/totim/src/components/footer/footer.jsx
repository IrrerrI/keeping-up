function Footer() {

  return (
    <>
        <footer>
      <div className="footer-links flex justify-between items-center px-4 py-2 bg-slate-200">
        <a href="#signup" id="signup-link">Sign Up for Email List</a>
        <div className="flex">
            <a
              href=" https://play.google.com/store/apps/details?id=org.totim.app&pcampaignid=web_share"
              target="_blank"
              className="download-link"
              id="play-store-link"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.61 3 21.09 3 20.5Z"
                  fill="#34A853"
                />
                <path
                  d="M16.81 15.12L6.05 21.34C5.79 21.48 5.49 21.5 5.21 21.43C5.3 21.5 5.4 21.5 5.5 21.5C5.73 21.5 5.95 21.43 6.14 21.31L17.35 15.12C17.81 14.89 18.09 14.46 18.09 14C18.09 13.54 17.81 13.11 17.35 12.88L16.81 15.12Z"
                  fill="#FBBC05"
                />
                <path
                  d="M16.81 8.88L17.35 11.12C17.81 11.35 18.09 11.78 18.09 12.24C18.09 12.7 17.81 13.13 17.35 13.36L6.14 19.55C5.95 19.67 5.73 19.74 5.5 19.74C5.4 19.74 5.3 19.74 5.21 19.67C5.49 19.74 5.79 19.72 6.05 19.58L16.81 8.88Z"
                  fill="#EA4335"
                />
                <path
                  d="M13.69 12L3.84 2.15C4.25 1.97 4.75 2.07 5.14 2.34L17.35 8.88C17.81 9.11 18.09 9.54 18.09 10C18.09 10.46 17.81 10.89 17.35 11.12L13.69 12Z"
                  fill="#4285F4"
                />
              </svg>
              <span className="download-label">Google Play</span>
            </a>

            <a
              href=" https://apps.apple.com/us/app/totim/id1523359383"
              target="_blank"
              className="download-link"
              id="app-store-link"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09999 22C7.78999 22.05 6.79999 20.68 5.95999 19.47C4.24999 17 2.93999 12.45 4.69999 9.39C5.56999 7.87 7.12999 6.91 8.81999 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"
                  fill="#000000"
                />
              </svg>
              <span className="download-label">App Store</span>
            </a>

            <a
              href="#qr-modal"
              target="_blank"
              className="download-link"
              id="qr-code-link"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 11V3H11V11H3ZM5 9H9V5H5V9ZM3 21V13H11V21H3ZM5 19H9V15H5V19ZM13 11V3H21V11H13ZM15 9H19V5H15V9ZM19 13H21V15H19V13ZM15 21V19H17V21H15ZM19 21V19H21V21H19ZM19 17V15H21V17H19ZM15 17V15H17V17H15ZM13 21V17H15V19H13V21ZM13 15V13H15V15H13Z"
                  fill="#000000"
                />
              </svg>
              <span className="download-label">QR Code</span>
            </a>
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