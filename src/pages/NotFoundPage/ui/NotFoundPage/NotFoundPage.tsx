import { FC } from 'react';

import { Text } from '@/shared/ui/Text';
import { Page } from '@/shared/lib/components/Page';

const NotFoundPage: FC = () => {
  return (
    <Page>
      <Text size='xl' element='h1' weight='bolder'>
        404 Error
      </Text>
    </Page>
  );
};

export default NotFoundPage;
