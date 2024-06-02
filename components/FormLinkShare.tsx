'use client';

import { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast } from './ui/use-toast';

const FormLinkShare = ({ shareUrl }: { shareUrl: string }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null; // avoiding window not defined error
  const shareLink = `${window.location.origin}/submit/${shareUrl}`;
  return (
    <div className='flex flex-grow gap-4 items-center'>
      <Input value={shareLink} readOnly />
      <Button
        className='w-[250px]'
        onClick={() => {
          navigator.clipboard.writeText(shareUrl);
          toast({
            title: 'Copied!',
            description: 'Link copied to clipboard',
          });
        }}
      >
        Copy link
      </Button>
    </div>
  );
};

export default FormLinkShare;

