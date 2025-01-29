import { SetMetadata } from '@nestjs/common';

import { TokenType } from '../enums/token-type.enum';

export const TOKEN_TYPE_KEY = 'tokenType';
export const TokenTypeGuard = (type: TokenType) =>
  SetMetadata(TOKEN_TYPE_KEY, type);
