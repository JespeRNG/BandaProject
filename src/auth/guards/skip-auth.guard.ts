import { SetMetadata } from '@nestjs/common';

import { IS_SKIP_AUTH_KEY } from '@src/constants/constants';

export const SkipAuth = () => SetMetadata(IS_SKIP_AUTH_KEY, true);
