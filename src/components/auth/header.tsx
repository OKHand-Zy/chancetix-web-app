import { Noto_Sans_TC } from 'next/font/google';

// Golbal Font: Noto Sans Traditional Chinese
const NotoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  display: 'swap',
});

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <div className={NotoSansTC.className}>
        <h1 className={'NotoSansTC text-3xl font-semibold '}>🔐 Auth</h1>
        <p className="text-gray-500 text-sm">{label}</p>
      </div>
    </div>
  );
};
