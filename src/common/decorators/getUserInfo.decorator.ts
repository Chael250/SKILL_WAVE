import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetUserInfo = createParamDecorator((data:any,context:ExecutionContext) => {
    const req = context.switchToHttp().getRequest()
    return req.user[data]
})