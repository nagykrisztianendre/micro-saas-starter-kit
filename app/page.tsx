import { getWelcomeMessage } from '../src';

export default function HomePage() {
  return (
    <main>
      <h1>Micro-SaaS Starter Kit</h1>
      <p>{getWelcomeMessage()}</p>
    </main>
  );
}
