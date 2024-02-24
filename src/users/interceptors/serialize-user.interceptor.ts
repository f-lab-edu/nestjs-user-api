import { UseInterceptors } from '@nestjs/common';

import { SerializeInterceptor } from '../../interceptors/serialize.intercetor';
import { UserDto } from '../dtos/user.dto';

export function SerializeUser() {
  return UseInterceptors(new SerializeInterceptor(UserDto));
}
