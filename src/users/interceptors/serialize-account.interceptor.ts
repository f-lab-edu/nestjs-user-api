import { UseInterceptors } from '@nestjs/common';

import { SerializeInterceptor } from '../../common/interceptors/serialize.intercetor';
import { AccountDto } from '../dtos/account.dto';

export function SerializeAccount() {
  return UseInterceptors(new SerializeInterceptor(AccountDto));
}
