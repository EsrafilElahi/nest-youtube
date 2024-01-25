import { ExecutionContext, createParamDecorator } from '@nestjs/common';
// import { AuthEntity } from 'src/entities/auth.entity';

export const ExtractUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  //   return req.user;
  console.log('reqqqqqqq :', req);

  return req.user;
});
