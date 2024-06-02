import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/nextjs';
import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => (
  <>
    <SignedIn>{children}</SignedIn>
    <SignedOut>
      <RedirectToSignIn />
    </SignedOut>
  </>
);

export default Layout;
