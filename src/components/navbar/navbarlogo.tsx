import Image from 'next/image';
import mypic from './cdnlogo.com_next-js.svg';

export default function NavbarLogo() {
  return <Image src={mypic} alt="Logo for nav bar" fill object-fit />;
}
