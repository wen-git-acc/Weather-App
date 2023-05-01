import Image from 'next/image';
import mypic from './dummylogo.jpg';

export default function NavbarLogo() {
  return <Image src={mypic} alt="Logo for nav bar" width={100} />;
}
