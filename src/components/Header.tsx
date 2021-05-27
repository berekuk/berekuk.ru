import Image from 'next/image';
import Link from 'next/link';

const Navigation: React.FC = () => (
  <ul className="flex space-x-2.5">
    {[
      { title: 'Вячеслав Матюхин', link: '/' },
      { title: 'Блог', link: '/blog' },
      { title: 'Коучинг', link: '/coaching' },
      { title: 'Обо мне', link: '/about' },
    ].map(e => (
      <li key={e.link}>
        <Link href={e.link} passHref>
          <a className="block px-1 py-0.5 text-xs sm:text-xl text-gray-500 font-bold hover:bg-black hover:text-white no-underline">
            {e.title}
          </a>
        </Link>
      </li>
    ))}
  </ul>
);

const Avatar: React.FC = () => (
  <Link href="/" passHref>
    <a className="block m-4" style={{ lineHeight: 0 }}>
      <Image
        src="/images/avatar-2013.png"
        alt="аватарка"
        width="40"
        height="40"
        layout="fixed"
        className="rounded-full"
      />
    </a>
  </Link>
);

export const Header: React.FC = () => (
  <header className="flex flex-col max-w-3xl mx-auto">
    <div className="flex items-center justify-center">
      <Avatar />
      <Navigation />
    </div>
    <hr className="h-1 border-gray-200" />
  </header>
);
