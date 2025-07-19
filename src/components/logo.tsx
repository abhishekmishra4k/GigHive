import Image from 'next/image';

export function Logo() {
  return (
    <Image
      src="/logo.png"
      alt="GigHive Logo"
      width={50}
      height={50}
    />
  );
}