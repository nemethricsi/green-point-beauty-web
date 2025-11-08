import { Container } from '@/app/components/Container';
import { Logo } from '@/app/components/Logo';

export const Header = () => {
  return (
    <header className="border-fuego-200 fixed w-full border-b bg-white/50 px-4 backdrop-blur-sm lg:static">
      <Container className="py-4">
        <Logo />
      </Container>
    </header>
  );
};
