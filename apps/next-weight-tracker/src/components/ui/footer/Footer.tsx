import Link from "next/link";

export default function Footer () {
    return (
        <footer>
            <Link
                href="https://www.google.com/search?q=%D1%80%D0%B8%D0%BA%D0%B0%D1%80%D0%B4%D0%BE+%D0%BC%D0%B8%D0%BB%D0%BE%D1%81&newwindow=1&sca_esv=9cef7b5eea840559&hl=ru&udm=2&biw=1920&bih=992&sxsrf=AHTn8zpsyv6hvVIgYtKOpLBTcVOTCEUxNg%3A1747742054530&ei=Zm0saKP5H-2Nxc8PhriQ6Qw&oq=hbrfh&gs_lp=EgNpbWciBWhicmZoKgIIADIJEAAYgAQYARgKMgkQABiABBgBGAoyCRAAGIAEGAEYCjIJEAAYgAQYARgKMgkQABiABBgBGAoyCBAAGAUYChgeMggQABgFGAoYHkjkFlCiCFioDHABeACQAQCYAYQCoAGuCaoBAzItNbgBA8gBAPgBAZgCBqACzwmoAgrCAgoQIxgnGMkCGOoCwgILEAAYgAQYsQMYgwHCAggQABiABBixA8ICDBAAGIAEGAEYsQMYCsICDhAAGIAEGLEDGIMBGIoFwgIFEAAYgATCAgoQABiABBixAxgKmAMIkgcFMS4wLjWgB8ccsgcDMi01uAfHCQ&sclient=img"
                target="_blank"
                style={{textDecoration: "none", display: "none"}}
            >
                Click Me
            </Link>
            <span> © 2025 BABOS — All rights reserved. <br/>P.S. If you find the owner, let <Link
                href="mailto:babkinnick95@gmail.com"
                target="_blank"
                style={{textDecoration: "none"}}
            >
        me 
      </Link> know!
            </span>
        </footer>
    );
}