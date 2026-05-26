import logo from '../assets/logo.svg';


export default function Header() {
  return (
    <div className="sticky top-0 left-0 bg-[#040B1A]">
      <img src={logo} alt="YourPlaces Logo" />
    </div>
  );
}
