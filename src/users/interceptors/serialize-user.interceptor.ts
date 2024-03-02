import { UseInterceptors } from '@nestjs/common';

import { SerializeInterceptor } from '../../common/interceptors/serialize.intercetor';
import { UserDto } from '../dtos/user.dto';

export function SerializeUser() {
  return UseInterceptors(new SerializeInterceptor(UserDto));
}
