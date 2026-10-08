import { Suspense } from 'react';
import VerifyEmail from '@/components/VerifyEmail';

const VerifyEmailPage = () => (
  <Suspense fallback={null}>
    <VerifyEmail />
  </Suspense>
);

export default VerifyEmailPage;