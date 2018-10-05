import Link from "next/link";

const d = new Date();

const Footer = () => (
    <footer>
        <p>Copyright &copy; {d.getFullYear()} -- All Rights Reserved</p>
    </footer>
);

export default Footer;
