import Image from 'next/image';
import mypic from './thunderstorm.gif';

export default function WeatherAppBackground() {
  return <Image src={mypic} alt="Thurderstorm Background" fill object-fit />;
}
