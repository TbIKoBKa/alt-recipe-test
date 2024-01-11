import { FC, Suspense, memo } from 'react';

import { AppRouter } from './providers/AppRouter';
import { Navbar } from '@/widgets/Navbar/ui/Navbar/Navbar';

const App: FC = memo(() => {
  return (
    <div className='app'>
      <Suspense fallback=''>
        <Navbar />
        <AppRouter />
      </Suspense>
    </div>
  );
});

export default App;
