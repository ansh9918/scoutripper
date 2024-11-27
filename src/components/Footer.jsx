const Footer = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-[#F3F4F6]">
      <button className="my-6 self-center rounded-md bg-[#85D4D6] p-3 px-6 font-medium text-white outline-none">
        <a href="https://scoutripper.com/" target="_blank">
          Book Now
        </a>
      </button>
      <div className="flex h-20 w-full items-center justify-between bg-[#85D4D6] p-8 px-20">
        <p className="font-medium text-white">
          Copyright © 2024 by Scoutripper | Made with ❤️{" "}
        </p>
        <p className="font-medium text-white">Scoutripper</p>
      </div>
    </div>
  );
};

export default Footer;
