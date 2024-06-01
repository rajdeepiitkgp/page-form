'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect } from 'react';

const ErrorPage = ({ error }: { error: Error }) => {
  useEffect(() => console.error(error), [error]);
  return (
    <div className='flex w-full h-full flex-col items-center justify-center gap-4'>
      <h2 className='text-destructive text-4xl'>
        Something went wrong! root layout
      </h2>
      <p>name: {error.name}</p>

      <p>message: {error.message}</p>
      <p>stack: {error.stack}</p>
      <p>cause: {JSON.stringify(error.cause)}</p>
      <p>Full Error: {JSON.stringify(error)}</p>
      <Button asChild>
        <Link href={'/'}>Go back to home</Link>
      </Button>
    </div>
  );
};

export default ErrorPage;

